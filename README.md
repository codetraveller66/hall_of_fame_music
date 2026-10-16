# HALL//50 — interactive music archive

[Live demo](https://hall-50-music.zmd-baron26.chatgpt.site) · [中文说明](#中文说明) · [Asset notices](NOTICE.md)

A frontend portfolio project exploring how a music catalog can feel like a
kinetic game menu: ten artist dossiers, fifty selected tracks, and short
editorial notes in German, English and Chinese. German is the first-visit default.

## Experience

- Artist → track → editorial note navigation, with bookmarkable hash routes.
- Diagonal scene wipes, staggered menu entrances and pointer-driven card tilt.
- Responsive layouts, keyboard activation, Escape navigation and reduced-motion support.
- Local language preference, including a fallback when browser storage is blocked.
- Optional original Web Audio ambience, started only by a user gesture.
- License-gated Commons artist photos with visible attribution and local poster fallbacks.
- Original track posters and links to find the recordings on Apple Music.

## Engineering choices

Built with HTML, CSS, vanilla JavaScript, SVG and the Web Audio API. No framework,
build system, backend, secrets or package dependencies are required. State lives
in memory; navigation lives in the URL; translation and catalog content live in
`dist/data.js`. `dist/media.js` owns the photo-license gate and the soundscape.

The animation system coordinates a short transition with a route update, and
honors `prefers-reduced-motion`. The media path validates metadata before
displaying a photograph, treats remote text as text, and falls back without
blocking the catalog. This public edition avoids using commercial preview clips
as a background playlist.

## Run locally

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173. Deploy `dist/` to a static host. Hash routes do not
need server routing rules. `.openai/hosting.json` identifies the existing demo;
it is not a credential. Forks should configure their own hosting destination.

## Verification

Node.js 20+ is needed only for the checks:

```sh
node --test tests/public-release.test.cjs
node --check dist/app.js
node --check dist/media.js
node --check dist/data.js
```

The tests exercise locale fallback, route validation, image-license acceptance
and rejection, URL validation, external music links and public asset boundaries.
They do not substitute for visual, assistive-technology or cross-browser testing.

## Project map

```text
dist/
  index.html       Page shell and controls
  styles.css       Responsive design and motion
  data.js          Trilingual catalog and UI text
  media.js         Safe photo metadata, links and original ambience
  app.js           Rendering, navigation and interaction
  assets/          Project-generated texture
tests/             Dependency-free release checks
LICENSE            MIT for project-authored code
NOTICE.md          Third-party media, generated imagery and privacy notes
```

## Scope and limitations

This is an independent portfolio prototype, not an official artist site or a
streaming service. The catalog has 50 curated entries; BTS is one dossier listing
all seven members, not seven additional solo catalogs. Notes are editorial
interpretations, not a researched songwriting database. Photo loading depends
on Wikimedia availability and acceptable metadata; navigation and notes work
without it. Track posters are original designs, not official album covers.

The project was implemented with AI assistance (Codex); the abstract raster
texture was generated with OpenAI image generation. This disclosure does not
claim that every line was manually authored. The source is available for review
and discussion of the design and engineering decisions.

Code is MIT-licensed. Third-party photos and artist/music rights are excluded;
see [NOTICE.md](NOTICE.md) before reusing assets.

## 中文说明

这是一个用于求职展示的三语前端项目，重点是分层信息架构、游戏式菜单动效、
响应式布局、媒体失败降级与素材来源管理。首次访问默认德语，可切换中文和英语。

公开版保留 10 组音乐人、50 首精选曲目和歌曲解读。站内声音为 Web Audio 合成的
原创氛围音，不包含商业歌曲采样；歌曲按钮跳转 Apple Music 搜索。人物照片只有在
确认支持的 Commons 许可证并具备署名资料后才加载。歌曲卡片为原创排版。

运行方式与检查命令见上文。代码采用 MIT 许可证，第三方照片、歌手形象及音乐权利
不在授权范围内。本项目使用 Codex 辅助开发，背景纹理由 AI 生成；详见 NOTICE.md。
