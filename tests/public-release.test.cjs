const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const media = require('../dist/media.js');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const data = vm.runInNewContext(read('dist/data.js') + '; ({ UI, ARTISTS })');
const photo = (changes = {}) => ({
  thumburl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Example.jpg/1000px-Example.jpg',
  descriptionurl: 'https://commons.wikimedia.org/wiki/File:Example.jpg',
  extmetadata: {
    Artist: { value: '<a href="https://example.org">Example photographer</a>' },
    LicenseShortName: { value: 'CC BY-SA 4.0' },
    LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0/' },
    ...changes
  }
});

test('catalog has ten unique artists, fifty tracks and three complete locales', () => {
  assert.equal(data.ARTISTS.length, 10);
  assert.equal(new Set(data.ARTISTS.map(a => a.id)).size, 10);
  for (const artist of data.ARTISTS) {
    assert.equal(artist.songs.length, 5);
    for (const lang of ['de','en','zh']) {
      assert.ok(artist.blurb[lang]);
      for (const song of artist.songs) assert.ok(song.story[lang]);
      for (const key of ['source','rights','independent','photoCredits','photoChanges','ambienceHint','editorial']) assert.ok(data.UI[lang][key]);
    }
  }
});
test('invalid stored locales fall back to German', () => {
  for (const value of [null, undefined, '', 'fr', '<script>']) assert.equal(media.locale(value), 'de');
  assert.equal(media.locale('zh'), 'zh');
});
test('deep links preserve valid tracks and reject invalid indices', () => {
  assert.equal(media.route('#/bts/song/4', data.ARTISTS).songIndex, 4);
  for (const hash of ['#/bts/song/-1', '#/bts/song/5', '#/bts/song/0.5', '#/bts/song/', '#/bts/song/no']) assert.equal(media.route(hash, data.ARTISTS).songIndex, null);
  assert.equal(media.route('#/missing', data.ARTISTS).artist, undefined);
});
test('photo gate preserves credit and supported license', () => {
  const accepted = media.approvedPhoto(photo());
  assert.equal(accepted.author, 'Example photographer');
  assert.equal(accepted.license, 'CC BY-SA 4.0');
  assert.equal(accepted.source, 'https://commons.wikimedia.org/wiki/File:Example.jpg');
});
test('photo gate rejects absent, incompatible and restricted metadata', () => {
  assert.equal(media.approvedPhoto(null), null);
  for (const change of [
    { Artist: { value: '' } },
    { LicenseShortName: { value: 'Fair use' } },
    { LicenseShortName: { value: 'CC BY-NC 4.0' } },
    { LicenseShortName: { value: 'CC BY-ND 4.0' } },
    { Restrictions: { value: 'personality rights' } },
    { LicenseUrl: { value: 'https://creativecommons.org/licenses/by/4.0/' } },
    { LicenseUrl: { value: 'javascript:alert(1)' } }
  ]) assert.equal(media.approvedPhoto(photo(change)), null);
  assert.equal(media.approvedPhoto({ ...photo(), descriptionurl:'https://en.wikipedia.org/wiki/File:Example.jpg' }), null);
  assert.equal(media.approvedPhoto({ ...photo(), thumburl:'https://evil.test/image.jpg' }), null);
});
test('CC0 and public domain require matching license metadata', () => {
  assert.ok(media.approvedPhoto(photo({LicenseShortName:{value:'CC0'}, LicenseUrl:{value:'https://creativecommons.org/publicdomain/zero/1.0/'}})));
  assert.ok(media.approvedPhoto(photo({LicenseShortName:{value:'Public domain'}, LicenseUrl:{value:''}})));
});
test('links accept exact HTTPS hosts only and encode music queries', () => {
  for (const url of ['http://commons.wikimedia.org/', 'https://commons.wikimedia.org.evil.test/', 'javascript:alert(1)', 'https://user:password@commons.wikimedia.org/']) assert.equal(media.safeUrl(url, ['commons.wikimedia.org']), null);
  const link = new URL(media.musicLink({name:'A & B'}, {title:'Song / #1'}));
  assert.equal(link.hostname, 'music.apple.com');
  assert.equal(link.searchParams.get('term'), 'A & B Song / #1');
});
test('release contains no commercial playback implementation or bundled recordings', () => {
  const app = read('dist/app.js'), html = read('dist/index.html');
  assert.doesNotMatch(app + html, /previewUrl|artworkUrl100|itunes\.apple\.com\/search|<audio|navigator\.share|shareButton/);
  const files = fs.readdirSync(path.join(root, 'dist'), { recursive:true });
  assert.equal(files.filter(file => /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file)).length, 0);
  assert.ok(html.indexOf('media.js') < html.indexOf('app.js'));
  assert.match(read('LICENSE'), /MIT License/);
  assert.match(read('NOTICE.md'), /not licensed|does not grant rights/i);
});
