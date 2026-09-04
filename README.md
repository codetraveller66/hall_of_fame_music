# HALL//50

An interactive, trilingual music hall of fame featuring 10 artists and 50 songs.

## Run locally

This is a zero-build static site. Serve the `public` directory with any static server:

```powershell
python -m http.server 4173 --directory public
```

Then open `http://localhost:4173`.

## Deploy / share

Deploy the `public` directory to any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel, etc.). Hash routes make artist and song views directly shareable without server-side routing rules.

Artist portraits are loaded from Wikimedia and song artwork / licensed preview clips are resolved through Apple's public Search API. Availability varies by region and rights holder; the generated local artwork is used as a resilient fallback.

## Credits

- Original background artwork generated for this project with OpenAI image generation.
- Artist imagery: Wikimedia Commons / Wikipedia.
- Song artwork and preview snippets: Apple Music / iTunes Search API.
