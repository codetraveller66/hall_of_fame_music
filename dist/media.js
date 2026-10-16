/* Project-owned media helpers. Remote metadata never enters HTML as markup. */
const HallMedia = (() => {
  function locale(value) { return ['de', 'en', 'zh'].includes(value) ? value : 'de'; }
  function route(hash, artists) {
    const parts = String(hash).replace(/^#\/?/, '').split('/').filter(Boolean);
    const artist = artists.find(item => item.id === parts[0]);
    const index = /^\d+$/.test(parts[2] || '') ? Number(parts[2]) : NaN;
    return { artist, songIndex: artist && parts[1] === 'song' && Number.isInteger(index) && index >= 0 && index < artist.songs.length ? index : null };
  }
  function safeUrl(value, hosts) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password && hosts.includes(url.hostname) ? url.href : null;
    } catch { return null; }
  }
  function plain(value) {
    return String(value || '').replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|amp|quot|lt|gt);/g, x => ({'&nbsp;':' ', '&amp;':'&', '&quot;':'"', '&lt;':'<', '&gt;':'>'}[x])).replace(/\s+/g, ' ').trim().slice(0, 600);
  }
  function approvedPhoto(info) {
    const meta = info?.extmetadata || {};
    const license = plain(meta.LicenseShortName?.value);
    const author = plain(meta.Artist?.value);
    const restrictions = plain(meta.Restrictions?.value);
    const nameAccepted = /^(CC BY(?:-SA)? (?:1\.0|2\.0|2\.5|3\.0|4\.0)|CC0(?: 1\.0)?|Public domain)$/i.test(license);
    const image = safeUrl(info?.thumburl || info?.url, ['upload.wikimedia.org']);
    const source = safeUrl(info?.descriptionurl, ['commons.wikimedia.org']);
    let licenseUrl = safeUrl(meta.LicenseUrl?.value, ['creativecommons.org']);
    if (/^Public domain$/i.test(license)) licenseUrl ||= 'https://creativecommons.org/publicdomain/mark/1.0/';
    const by = license.match(/^CC (BY(?:-SA)?) ([\d.]+)$/i);
    const licensePath = licenseUrl && new URL(licenseUrl).pathname;
    if (by && !licensePath?.startsWith(`/licenses/${by[1].toLowerCase()}/${by[2]}/`)) return null;
    if (/^CC0/i.test(license) && licensePath !== '/publicdomain/zero/1.0/') return null;
    if (/^Public domain$/i.test(license) && licensePath !== '/publicdomain/mark/1.0/') return null;
    if (!nameAccepted || !author || restrictions || !image || !source || !licenseUrl) return null;
    return { image, source, author, license, licenseUrl, attribution: plain(meta.Attribution?.value) };
  }
  async function fetchJson(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000), credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!response.ok) throw new Error('Media unavailable');
    return response.json();
  }
  const photos = new Map();
  function artistPhoto(title) {
    if (!photos.has(title)) photos.set(title, (async () => {
      try {
        const page = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=name&titles=${encodeURIComponent(title)}`);
        const filename = Object.values(page.query?.pages || {})[0]?.pageimage;
        if (!filename) return null;
        const commons = await fetchJson(`https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1000&titles=${encodeURIComponent('File:' + filename)}`);
        return approvedPhoto(Object.values(commons.query?.pages || {})[0]?.imageinfo?.[0]);
      } catch { return null; }
    })());
    return photos.get(title);
  }
  function musicLink(artist, song) { return `https://music.apple.com/search?term=${encodeURIComponent(artist.name + ' ' + song.title)}`; }
  // Original oscillator-based pulse: no samples or melodies from the catalog.
  class Ambience {
    constructor() { this.context = null; this.timer = null; this.active = false; this.step = 0; }
    async start() {
      const Context = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!Context) throw new Error('Web Audio unavailable');
      this.context ||= new Context();
      await this.context.resume();
      if (this.active) return;
      this.active = true; this.tick(); this.timer = setInterval(() => this.tick(), 430);
    }
    tick() {
      if (!this.active || this.context.state !== 'running') return;
      const now = this.context.currentTime;
      const tones = [110, 164.81, 220, 196, 130.81, 196, 261.63, 164.81];
      const osc = this.context.createOscillator(), envelope = this.context.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(tones[this.step++ % tones.length], now);
      envelope.gain.setValueAtTime(0, now); envelope.gain.linearRampToValueAtTime(.045, now + .035);
      envelope.gain.exponentialRampToValueAtTime(.0001, now + .7);
      osc.connect(envelope); envelope.connect(this.context.destination);
      osc.start(now); osc.stop(now + .72);
      osc.onended = () => { osc.disconnect(); envelope.disconnect(); };
    }
    async stop() { this.active = false; clearInterval(this.timer); this.timer = null; if (this.context) await this.context.suspend(); }
  }
  return { locale, route, safeUrl, approvedPhoto, artistPhoto, musicLink, Ambience };
})();
if (typeof module !== 'undefined') module.exports = HallMedia;
