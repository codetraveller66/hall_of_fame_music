const app = document.querySelector('#app');
const languageSelect = document.querySelector('#language');
const soundToggle = document.querySelector('#soundToggle');
const audio = document.querySelector('#audio');
const audioDock = document.querySelector('#audioDock');
const dockPlay = document.querySelector('#dockPlay');
const dockNext = document.querySelector('#dockNext');
const nowTitle = document.querySelector('#nowTitle');
const nowArtist = document.querySelector('#nowArtist');
const nowArt = document.querySelector('#nowArt');
const toast = document.querySelector('#toast');
const pageWipe = document.querySelector('#pageWipe');
const wipeLabel = document.querySelector('#wipeLabel');

const state = {
  lang: localStorage.getItem('hall50-language') || 'de',
  artwork: new Map(),
  artistImages: new Map(),
  previewCache: new Map(),
  current: null,
  globalSound: false,
  requestToken: 0
};

languageSelect.value = state.lang;

function t(key) { return UI[state.lang][key] || UI.de[key] || key; }
function esc(value = '') { return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
function keyFor(artist, song) { return `${artist.id}::${song.title}`; }

function parseRoute() {
  const bits = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const artist = ARTISTS.find(a => a.id === bits[0]);
  const songIndex = artist && bits[1] === 'song' ? Number(bits[2]) : null;
  return { artist, songIndex: Number.isInteger(songIndex) && songIndex >= 0 && songIndex < 5 ? songIndex : null };
}

function updateStaticText() {
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  soundToggle.querySelector('[data-i18n]').textContent = state.globalSound ? t('soundOn') : t('soundOff');
}

function render() {
  updateStaticText();
  const route = parseRoute();
  if (!route.artist) renderHome();
  else renderArtist(route.artist, route.songIndex);
  app.classList.remove('scene-ready');
  requestAnimationFrame(() => requestAnimationFrame(() => app.classList.add('scene-ready')));
  requestAnimationFrame(() => app.focus({ preventScroll: true }));
}

function navigateTo(hash, label = 'HALL//50') {
  if (location.hash === hash || pageWipe.classList.contains('active')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { location.hash = hash; return; }
  wipeLabel.textContent = label;
  pageWipe.classList.remove('release');
  pageWipe.classList.add('active');
  window.setTimeout(() => { location.hash = hash; pageWipe.classList.add('release'); }, 310);
  window.setTimeout(() => pageWipe.classList.remove('active', 'release'), 920);
}

function renderHome() {
  app.className = 'home';
  app.innerHTML = `
    <section class="hero">
      <div class="hero-main">
        <p class="eyebrow">${t('eyebrow')}</p>
        <h1><span>${t('titleA')}</span><span>${t('titleB')}</span><span>${t('titleC')}</span></h1>
        <p class="hero-intro">${t('intro')}</p>
      </div>
      <aside class="hero-side">
        <div class="stat-grid">
          <div class="stat"><strong>10</strong><span>${t('artists')}</span></div>
          <div class="stat"><strong>50</strong><span>${t('songs')}</span></div>
          <div class="stat"><strong>03</strong><span>${t('languages')}</span></div>
        </div>
        <div class="manifesto"><i></i><span>${t('scroll')}</span><b>↓</b></div>
      </aside>
    </section>
    <section class="artist-section" id="artists">
      <header class="section-head">
        <div><p class="section-kicker">HALL OF FAME</p><h2>${t('artists')}</h2></div>
        <span class="edition">01—10</span>
      </header>
      <div class="artist-grid">
        ${ARTISTS.map((artist, i) => artistCard(artist, i)).join('')}
      </div>
    </section>`;
  app.querySelectorAll('.artist-card').forEach((btn, i) => {
    btn.style.setProperty('--i', i);
    btn.addEventListener('click', () => navigateTo(`#/${btn.dataset.artist}`, btn.querySelector('h3').textContent));
    btn.addEventListener('pointermove', tiltCard);
    btn.addEventListener('pointerleave', resetCard);
  });
  ARTISTS.forEach(loadArtistImage);
}

function artistCard(artist, i) {
  const cached = state.artistImages.get(artist.id);
  return `<button class="artist-card" data-artist="${artist.id}" style="--accent:${artist.accent}" aria-label="${t('enter')}: ${artist.name}">
    <img id="portrait-${artist.id}" src="${cached || fallbackArt(artist)}" alt="${esc(artist.name)}" loading="lazy">
    <span class="artist-index">${String(i + 1).padStart(2,'0')}</span>
    <span class="artist-card-copy"><small>${artist.genre}</small><h3>${esc(artist.name)}</h3><span>${artist.years}</span></span>
  </button>`;
}

function renderArtist(artist, songIndex) {
  app.className = 'dossier-view';
  app.style.setProperty('--accent', artist.accent);
  const portrait = state.artistImages.get(artist.id) || fallbackArt(artist);
  app.innerHTML = `
    <section class="artist-mast">
      <img id="mast-${artist.id}" src="${portrait}" alt="${esc(artist.name)}">
      <button class="back-button" id="backHome"><span>←</span> ${t('back')}</button>
      <div class="mast-copy">
        <p class="dossier-label">${t('dossier')} · ${String(ARTISTS.indexOf(artist)+1).padStart(2,'0')}</p>
        <h1>${esc(artist.name)}</h1>
        <div class="mast-bottom"><span class="artist-meta">${artist.genre}</span><span class="artist-meta">${artist.years}</span><p>${artist.blurb[state.lang]}${artist.members ? `<br><small><b>${t('members')}:</b> ${artist.members}</small>` : ''}</p></div>
      </div>
    </section>
    <section class="tracks-layout">
      <div class="track-list-wrap">
        <h2 class="tracks-title"><b>05</b>${t('essential')}</h2>
        <div class="track-list">
          ${artist.songs.map((song, i) => trackRow(artist, song, i, songIndex)).join('')}
        </div>
      </div>
      <div class="story-panel" id="storyPanel">${songIndex === null ? `<p class="story-empty">${t('choose')} ↙</p>` : storyMarkup(artist, songIndex)}</div>
    </section>`;

  document.querySelector('#backHome').addEventListener('click', () => navigateTo('#/', 'HALL//50'));
  app.querySelectorAll('.track-row').forEach((btn, i) => {
    btn.style.setProperty('--i', i);
    btn.addEventListener('click', () => navigateTo(`#/${artist.id}/song/${btn.dataset.song}`, artist.songs[Number(btn.dataset.song)].title));
  });
  const mast = app.querySelector('.artist-mast');
  mast.addEventListener('pointermove', parallaxPanel);
  mast.addEventListener('pointerleave', resetPanel);
  loadArtistImage(artist);
  artist.songs.forEach((song, i) => loadSongMedia(artist, song, i));
  if (songIndex !== null) bindPreview(artist, songIndex);
}

function trackRow(artist, song, i, active) {
  const art = state.artwork.get(keyFor(artist,song)) || fallbackArt(artist);
  return `<button class="track-row ${active === i ? 'active' : ''}" data-song="${i}" aria-label="${esc(song.title)}">
    <span class="track-no">${String(i+1).padStart(2,'0')}</span><img class="track-thumb" id="art-${artist.id}-${i}" src="${art}" alt="" loading="lazy">
    <span class="track-info"><strong>${esc(song.title)}</strong><small>${song.year} · ${song.style}</small></span><span class="track-arrow">›</span>
  </button>`;
}

function storyMarkup(artist, i) {
  const song = artist.songs[i];
  const media = state.previewCache.get(keyFor(artist,song));
  const art = state.artwork.get(keyFor(artist,song)) || fallbackArt(artist);
  return `<div class="story-graphics" aria-hidden="true">
      <div class="story-sunburst"></div>
      <div class="vinyl-disc"></div>
      <div class="cover-shell"><span class="cover-index">${String(i+1).padStart(2,'0')}</span><img class="story-cover" id="storyArt" src="${art}" alt=""><i></i></div>
      <strong class="ghost-title">${esc(song.title)}</strong>
    </div>
    <article class="story-content">
      <p class="story-label">${t('story')} · ${String(i+1).padStart(2,'0')}</p>
      <h2>${esc(song.title)}</h2>
      <div class="story-tags"><span>${song.year}</span><span>${song.style}</span></div>
      <p class="story-text">${song.story[state.lang]}</p>
      <button class="preview-btn" id="previewButton" type="button" ${media === null ? 'disabled' : ''}><span class="play-triangle"></span><span>${media === null ? t('unavailable') : t('preview')}</span></button>
      <small class="credits">${t('source')}</small>
    </article>`;
}

function bindPreview(artist, i) {
  const button = document.querySelector('#previewButton');
  if (!button) return;
  button.addEventListener('click', async () => {
    const song = artist.songs[i];
    if (state.current?.artist === artist && state.current?.song === song && !audio.paused) { audio.pause(); updateAudioUI(); return; }
    button.disabled = true;
    button.querySelector('span:last-child').textContent = t('searching');
    const media = await getSongMedia(artist, song);
    if (!media?.previewUrl) {
      button.querySelector('span:last-child').textContent = t('unavailable');
      showToast(t('audioError'));
      return;
    }
    button.disabled = false;
    playMedia(artist, song, media);
  });
}

async function loadArtistImage(artist) {
  if (state.artistImages.has(artist.id)) return;
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=1400&titles=${encodeURIComponent(artist.wiki)}`;
    const response = await fetch(url);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    if (!page.thumbnail?.source) return;
    state.artistImages.set(artist.id, page.thumbnail.source);
    document.querySelector(`#portrait-${artist.id}`)?.setAttribute('src', page.thumbnail.source);
    document.querySelector(`#mast-${artist.id}`)?.setAttribute('src', page.thumbnail.source);
  } catch (_) { /* local fallback remains */ }
}

async function loadSongMedia(artist, song, i) {
  const media = await getSongMedia(artist, song);
  if (!media?.artworkUrl100) return;
  const art = media.artworkUrl100.replace('100x100bb', '1200x1200bb');
  state.artwork.set(keyFor(artist,song), art);
  document.querySelector(`#art-${artist.id}-${i}`)?.setAttribute('src', art);
  const route = parseRoute();
  if (route.artist === artist && route.songIndex === i) document.querySelector('#storyArt')?.setAttribute('src', art);
}

async function getSongMedia(artist, song) {
  const key = keyFor(artist,song);
  if (state.previewCache.has(key)) return state.previewCache.get(key);
  try {
    const term = encodeURIComponent(`${artist.name} ${song.title}`);
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=8`);
    const data = await response.json();
    const normalized = value => value.toLowerCase().replace(/[^a-z0-9]/g,'');
    const match = data.results.find(r => normalized(r.artistName).includes(normalized(artist.name).slice(0,8)) && normalized(r.trackName).includes(normalized(song.title).slice(0,8))) || data.results[0] || null;
    state.previewCache.set(key, match);
    return match;
  } catch (_) { state.previewCache.set(key, null); return null; }
}

function fallbackArt(artist) {
  const safe = artist.name.replace(/[^a-zA-Z0-9 ]/g,'');
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><defs><pattern id="p" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.5" fill="white" opacity=".18"/></pattern></defs><rect width="800" height="1000" fill="#101010"/><path d="M-80 840L680-80H940L120 1080Z" fill="${artist.accent}"/><rect width="800" height="1000" fill="url(#p)"/><text x="48" y="900" fill="white" font-family="Arial Black" font-size="86" font-weight="900">${safe.toUpperCase()}</text></svg>`)}`;
}

async function toggleGlobalSound() {
  state.globalSound = !state.globalSound;
  soundToggle.setAttribute('aria-pressed', String(state.globalSound));
  updateStaticText();
  if (!state.globalSound) { audio.pause(); updateAudioUI(); return; }
  if (state.current?.media?.previewUrl) { audio.play().catch(() => {}); updateAudioUI(); return; }
  await playNextAvailable();
}

async function playNextAvailable() {
  const flat = ARTISTS.flatMap(artist => artist.songs.map(song => ({artist,song})));
  let start = state.current ? flat.findIndex(x => x.artist === state.current.artist && x.song === state.current.song) + 1 : Math.floor(Math.random()*flat.length);
  for (let n=0; n<flat.length; n++) {
    const pick = flat[(start+n)%flat.length];
    const media = await getSongMedia(pick.artist,pick.song);
    if (media?.previewUrl) { playMedia(pick.artist,pick.song,media); return; }
  }
  state.globalSound = false; soundToggle.setAttribute('aria-pressed','false'); updateStaticText(); showToast(t('audioError'));
}

function playMedia(artist, song, media) {
  state.current = { artist, song, media };
  state.globalSound = true;
  audio.src = media.previewUrl;
  audio.play().catch(() => showToast(t('audioError')));
  audioDock.hidden = false;
  nowTitle.textContent = song.title;
  nowArtist.textContent = artist.name;
  nowArt.style.backgroundImage = `url('${(media.artworkUrl100 || '').replace('100x100bb','300x300bb')}')`;
  soundToggle.setAttribute('aria-pressed','true');
  updateStaticText(); updateAudioUI();
}

function updateAudioUI() {
  const paused = audio.paused;
  audioDock.classList.toggle('paused', paused);
  dockPlay.textContent = paused ? '▶' : 'Ⅱ';
  dockPlay.setAttribute('aria-label', paused ? t('preview') : t('pause'));
  const route = parseRoute();
  const button = document.querySelector('#previewButton');
  if (button && state.current?.artist === route.artist && state.current?.song === route.artist?.songs[route.songIndex]) {
    button.querySelector('span:last-child').textContent = paused ? t('preview') : t('pause');
  }
  document.querySelector('#storyPanel')?.classList.toggle('is-playing', !paused && state.current?.artist === route.artist && state.current?.song === route.artist?.songs[route.songIndex]);
}

function showToast(message) {
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function tiltCard(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  event.currentTarget.style.setProperty('--rx', `${-y * 7}deg`);
  event.currentTarget.style.setProperty('--ry', `${x * 9}deg`);
  event.currentTarget.style.setProperty('--px', `${50 + x * 8}%`);
  event.currentTarget.style.setProperty('--py', `${50 + y * 8}%`);
}
function resetCard(event) { event.currentTarget.style.removeProperty('--rx'); event.currentTarget.style.removeProperty('--ry'); }
function parallaxPanel(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--shift-x', `${((event.clientX-rect.left)/rect.width-.5)*18}px`);
  event.currentTarget.style.setProperty('--shift-y', `${((event.clientY-rect.top)/rect.height-.5)*10}px`);
}
function resetPanel(event) { event.currentTarget.style.setProperty('--shift-x','0px'); event.currentTarget.style.setProperty('--shift-y','0px'); }

document.addEventListener('pointerdown', event => {
  if (!event.target.closest('button,a,select')) return;
  const burst = document.createElement('span');
  burst.className = 'click-burst';
  burst.style.left = `${event.clientX}px`; burst.style.top = `${event.clientY}px`;
  document.body.appendChild(burst);
  burst.addEventListener('animationend', () => burst.remove());
});

languageSelect.addEventListener('change', () => { state.lang = languageSelect.value; localStorage.setItem('hall50-language',state.lang); render(); });
soundToggle.addEventListener('click', toggleGlobalSound);
dockPlay.addEventListener('click', () => { if (!audio.src) return playNextAvailable(); audio.paused ? audio.play() : audio.pause(); });
dockNext.addEventListener('click', playNextAvailable);
audio.addEventListener('play', updateAudioUI); audio.addEventListener('pause', updateAudioUI); audio.addEventListener('ended', () => state.globalSound ? playNextAvailable() : updateAudioUI());
window.addEventListener('hashchange', render);
window.addEventListener('keydown', event => { if (event.key === 'Escape' && parseRoute().artist) { const route = parseRoute(); navigateTo(route.songIndex !== null ? `#/${route.artist.id}` : '#/', t('back')); } });

if (!location.hash) history.replaceState(null,'','#/');
render();
