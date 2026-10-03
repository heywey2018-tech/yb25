# Yogesh & Bhavna — Silver Jubilee

A single-page 25th wedding anniversary invitation for 14 November in Dehradun, built with Vite. Includes all 15 selected photographs, local fonts and artwork, a continuous memory carousel, rose petals, gentle photo-frame motion, an evening itinerary, Google Maps and an RSVP form.

The complete website source is in `anniversary-site/`.

```sh
cd anniversary-site
npm ci
npm run dev
```

Run `npm run build` to create the static website in `anniversary-site/dist/`. For hosting services, set the project base directory to `anniversary-site`, the build command to `npm run build`, and the publish directory to `dist`.

Run `npm run package` from `anniversary-site/` to create the website and source ZIPs in the repository root. The website ZIP has `index.html` at its root and can be uploaded to a static hosting service.

Photographs, venue details and the RSVP destination are configured in `anniversary-site/public/site-config.json`. See [the website README](anniversary-site/README.md) for details. `photo-renames.csv` records the original filenames and their photo numbers.
