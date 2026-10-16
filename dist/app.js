const app = document.querySelector('#app');
const languageSelect = document.querySelector('#language');
const soundToggle = document.querySelector('#soundToggle');
const toast = document.querySelector('#toast');
const pageWipe = document.querySelector('#pageWipe');
const wipeLabel = document.querySelector('#wipeLabel');

let savedLanguage;
try { savedLanguage = localStorage.getItem('hall50-language'); } catch { /* Storage may be blocked. */ }
const state = { lang: HallMedia.locale(savedLanguage), artistImages: new Map(), photoCredits: new Map(), globalSound: false };
const ambience = new HallMedia.Ambience();
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let lastArtistId;

languageSelect.value = state.lang;

function t(key) { return UI[state.lang][key] || UI.de[key] || key; }
function esc(value = '') { return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
function parseRoute() {
  return HallMedia.route(location.hash, ARTISTS);
}

function updateStaticText() {
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  soundToggle.querySelector('[data-i18n]').textContent = state.globalSound ? t('soundOn') : t('soundOff');
  soundToggle.title = t('ambienceHint');
  soundToggle.setAttribute('aria-label', `${state.globalSound ? t('soundOn') : t('soundOff')}. ${t('ambienceHint')}`);
  languageSelect.setAttribute('aria-label', t('language'));
}

function render() {
  updateStaticText();
  const route = parseRoute();
  const artistChanged = lastArtistId !== route.artist?.id;
  lastArtistId = route.artist?.id;
  if (!route.artist) renderHome();
  else renderArtist(route.artist, route.songIndex);
  app.classList.remove('scene-ready');
  requestAnimationFrame(() => requestAnimationFrame(() => app.classList.add('scene-ready')));
  requestAnimationFrame(() => app.focus({ preventScroll: true }));
  if (artistChanged) window.scrollTo({ top: 0, behavior: 'instant' });
  renderCredits();
}

function navigateTo(hash, label = 'HALL//50') {
  if (location.hash === hash || pageWipe.classList.contains('active')) return;
  if (motionPreference.matches) { location.hash = hash; return; }
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
    <img id="portrait-${artist.id}" src="${cached || fallbackArt(artist)}" alt="${esc(artist.name)}" loading="lazy" referrerpolicy="no-referrer">
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
      <img id="mast-${artist.id}" src="${portrait}" alt="${esc(artist.name)}" referrerpolicy="no-referrer">
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
  if (songIndex !== null && matchMedia('(max-width: 760px)').matches) requestAnimationFrame(() => document.querySelector('#storyPanel')?.scrollIntoView({ block: 'start', behavior: motionPreference.matches ? 'instant' : 'smooth' }));
}

function trackRow(artist, song, i, active) {
  const art = trackPoster(artist, song, i);
  return `<button class="track-row ${active === i ? 'active' : ''}" data-song="${i}" aria-pressed="${active === i}" aria-label="${esc(song.title)}">
    <span class="track-no">${String(i+1).padStart(2,'0')}</span><img class="track-thumb" id="art-${artist.id}-${i}" src="${art}" alt="" loading="lazy">
    <span class="track-info"><strong>${esc(song.title)}</strong><small>${song.year} · ${song.style}</small></span><span class="track-arrow">›</span>
  </button>`;
}

function storyMarkup(artist, i) {
  const song = artist.songs[i];
  const art = trackPoster(artist, song, i);
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
      <a class="preview-btn" href="${esc(HallMedia.musicLink(artist, song))}" target="_blank" rel="noopener noreferrer"><span class="play-triangle"></span><span>${t('preview')}</span></a>
      <small class="credits">${t('source')}<br>${t('editorial')}</small>
    </article>`;
}

async function loadArtistImage(artist) {
  if (state.artistImages.has(artist.id)) return;
  const photo = await HallMedia.artistPhoto(artist.wiki);
  if (!photo) return;
  state.photoCredits.set(artist.id, { ...photo, name: artist.name });
  renderCredits(); // Attribution is present before any photo is displayed.
  state.artistImages.set(artist.id, photo.image);
  for (const prefix of ['portrait', 'mast']) document.querySelector(`#${prefix}-${artist.id}`)?.setAttribute('src', photo.image);
}

function renderCredits() {
  const list = document.querySelector('#photoCreditList');
  list.replaceChildren();
  for (const credit of state.photoCredits.values()) {
    const item = document.createElement('li');
    item.append(document.createTextNode(`${credit.name} — ${credit.author}${credit.attribution ? ' · ' + credit.attribution : ''} · `));
    for (const [label, href] of [['Wikimedia Commons', credit.source], [credit.license, credit.licenseUrl]]) {
      const link = document.createElement('a'); link.textContent = label; link.href = href;
      link.target = '_blank'; link.rel = 'noopener noreferrer'; item.append(link, document.createTextNode(' · '));
    }
    list.append(item);
  }
  document.querySelector('#photoCredits').hidden = state.photoCredits.size === 0;
}

function trackPoster(artist, song, i) {
  const words = song.title.split(' '), lines = []; let line = '';
  for (const word of words) { if ((line + word).length > 17 && line) { lines.push(line.trim()); line = ''; } line += word + ' '; }
  if (line) lines.push(line.trim());
  const text = lines.map((value, j) => `<tspan x="54" y="${300 + j * 63}">${esc(value)}</tspan>`).join('');
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" fill="#111"/><path d="M0 0H800V180L0 450Z" fill="${artist.accent}"/><path d="M0 610L800 380V800H0Z" fill="#f4f0e6"/><circle cx="650" cy="110" r="175" fill="none" stroke="#111" stroke-width="35"/><text x="48" y="100" font-family="Arial,sans-serif" font-weight="900" font-size="52" fill="#111">HALL//50 · ${String(i+1).padStart(2,'0')}</text><text font-family="Arial,sans-serif" font-weight="900" font-size="55" fill="white">${text}</text><text x="50" y="700" font-family="Arial,sans-serif" font-weight="900" font-size="30" fill="#111">${esc(artist.name)}</text><text x="50" y="753" font-family="Arial,sans-serif" font-size="23" fill="#333">${song.year} / ${esc(song.style)}</text></svg>`)}`;
}

function fallbackArt(artist) {
  const safe = artist.name.replace(/[^a-zA-Z0-9 ]/g,'');
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><defs><pattern id="p" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.5" fill="white" opacity=".18"/></pattern></defs><rect width="800" height="1000" fill="#101010"/><path d="M-80 840L680-80H940L120 1080Z" fill="${artist.accent}"/><rect width="800" height="1000" fill="url(#p)"/><text x="48" y="900" fill="white" font-family="Arial Black" font-size="86" font-weight="900">${safe.toUpperCase()}</text></svg>`)}`;
}

async function toggleGlobalSound() {
  if (soundToggle.disabled) return;
  soundToggle.disabled = true;
  try {
    if (state.globalSound) await ambience.stop(); else await ambience.start();
    state.globalSound = ambience.active;
    if (state.globalSound) showToast(t('ambienceHint'));
  } catch { state.globalSound = false; await ambience.stop().catch(() => {}); showToast(t('audioError')); }
  finally { soundToggle.disabled = false; soundToggle.setAttribute('aria-pressed', String(state.globalSound)); updateStaticText(); }
}

function showToast(message) {
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function tiltCard(event) {
  if (motionPreference.matches || event.pointerType === 'touch') return;
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
  if (motionPreference.matches || event.pointerType === 'touch') return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--shift-x', `${((event.clientX-rect.left)/rect.width-.5)*18}px`);
  event.currentTarget.style.setProperty('--shift-y', `${((event.clientY-rect.top)/rect.height-.5)*10}px`);
}
function resetPanel(event) { event.currentTarget.style.setProperty('--shift-x','0px'); event.currentTarget.style.setProperty('--shift-y','0px'); }

document.addEventListener('pointerdown', event => {
  if (motionPreference.matches) return;
  if (!event.target.closest('button,a,select')) return;
  const burst = document.createElement('span');
  burst.className = 'click-burst';
  burst.style.left = `${event.clientX}px`; burst.style.top = `${event.clientY}px`;
  document.body.appendChild(burst);
  burst.addEventListener('animationend', () => burst.remove());
});

languageSelect.addEventListener('change', () => {
  state.lang = HallMedia.locale(languageSelect.value);
  try { localStorage.setItem('hall50-language', state.lang); } catch { /* Session-only preference. */ }
  render();
});
soundToggle.addEventListener('click', toggleGlobalSound);
document.addEventListener('visibilitychange', async () => {
  if (document.hidden) { await ambience.stop().catch(() => {}); state.globalSound = false; soundToggle.setAttribute('aria-pressed', 'false'); updateStaticText(); }
});
document.querySelector('.brand').addEventListener('click', event => { event.preventDefault(); navigateTo('#/'); });
app.addEventListener('error', event => {
  if (event.target.tagName !== 'IMG' || event.target.src.startsWith('data:')) return;
  const artist = ARTISTS.find(item => event.target.id.endsWith(item.id));
  if (artist) { state.artistImages.delete(artist.id); event.target.src = fallbackArt(artist); }
}, true);
window.addEventListener('hashchange', render);
window.addEventListener('keydown', event => { if (event.key === 'Escape' && parseRoute().artist) { const route = parseRoute(); navigateTo(route.songIndex !== null ? `#/${route.artist.id}` : '#/', t('back')); } });

if (!location.hash) history.replaceState(null,'','#/');
render();
