# Yogesh & Bhavna · 25 Years of Togetherness

A single-page anniversary invitation, built with Vite and vanilla JavaScript. The built website is portable static HTML, CSS, JavaScript, fonts and images. No account, framework server, database or API key is needed to host it.

## Upload the website

Use **Yogesh-Bhavna-Anniversary-Website.zip**. Its root contains `index.html`, along with `assets/`, `art/`, `fonts/`, `photos/` and `site-config.json`. Upload this ZIP to your static hosting service, or extract it and upload all its contents. Do not upload the source ZIP as the website.

The build uses relative asset URLs and works at a domain root or in a subfolder. Anchor navigation stays on the same page. Preview it through a web server; double-clicking `index.html` with a `file://` URL will not load the configuration correctly.

## Add your own photographs — no rebuild needed

1. Extract the website ZIP.
2. Add photographs to `photos/`. JPG, PNG, WebP and AVIF work. Optimized images around 1600–2000 px wide are recommended.
3. Edit `site-config.json` using a text editor. For each photo, set `src`, a meaningful `alt`, and optionally `position` to change the crop. Set `fit` to `contain` to preserve the complete photograph or `cover` to fill the frame:

```json
"hero": {
  "src": "photos/hero.jpg",
  "alt": "Yogesh and Bhavna together",
  "position": "50% 40%"
}
```

4. Re-ZIP the website contents with `index.html` at the ZIP root, then upload.

All 15 selected photographs are included in `photos/`. Their slots are: 1 hero, 2 story, 7 slideshow, 4 itinerary and 1 evening detail. Blank or unavailable photo sources keep their designed placeholders. The supplied mountain artwork is an atmospheric illustration inspired by Dehradun; it is not a factual venue photograph.

The hero uses photo 2; the story uses photos 4 and 7. The slideshow order is 8, 9, 10, 12, 3, 5, 1. The evening events use 6, 13, 15, 14, followed by photo 11 in the closing evening moment.

## Confirm the full venue address

In `site-config.json`, fill in `venue.address`. This changes the displayed address, map and Get Directions links. With the address blank, the invitation shows Hotel Comfort Inn in Dehradun and the map searches for that venue.

```json
"venue": {
  "name": "Hotel Comfort Inn",
  "address": "THE CONFIRMED STREET ADDRESS",
  "city": "Dehradun, Uttarakhand",
  "mapQuery": "Hotel Comfort Inn Dehradun Uttarakhand"
}
```

The celebration is shown as **14 November**, **6:30 PM**. No year or day of the week has been assumed.

## Connect RSVP replies

A static ZIP cannot store and share guest responses by itself. The supplied Google Apps Script URL is already configured in `site-config.json`. The form sends a `POST` using `FormData` and `mode: 'no-cors'`, with `name`, `guests`, `joining` (`yes` / `no`), `message` and `celebration`. Your Apps Script `doPost(e)` can read these as `e.parameter.name`, `e.parameter.joining`, and so on. Declines send `guests` as `0`.

The button shows “Sending…” and prevents duplicate submissions while sending. Completed requests reset the form; network errors preserve the guest's answers for retry. A `no-cors` response is opaque: the browser cannot check whether the script saved a row or returned an HTTP error. The guest message therefore says the reply was sent, without claiming confirmed storage. Verify the deployed script's access settings and sheet-writing behavior with a real RSVP before sharing the invitation.

To change the destination:

- **Another form endpoint:** Set `rsvp.endpoint` to your HTTPS form service endpoint. For endpoints other than Google Apps Script, the page sends a JSON POST with `name`, `guests`, `attendance`, `message` and `celebration`. The service must accept cross-origin requests from your hosting domain and return a successful HTTP response only when it accepts the RSVP. Errors preserve the form so the guest can retry.
- **An email address:** Set `rsvp.email` to the hosts’ email address and leave `endpoint` blank. The button becomes “Prepare email RSVP” and opens a prefilled email draft. The guest must send the email in their own email app; the site does not claim the RSVP has been sent.

```json
"rsvp": { "endpoint": "", "email": "HOSTS_EMAIL_ADDRESS" }
```

If both destinations are cleared, the form says RSVP replies are not open and directs guests to the hosts. Names, guest count, attendance and message lengths are validated; an unobtrusive honeypot is included. Your form provider should supply its own abuse protection.

Only use a public form URL here. Do not put API secrets, passwords or private keys into this public configuration file. Google Maps and any configured RSVP endpoint need an internet connection. Fonts and decorative artwork are included locally.

## Work with the Vite source

Extract **Yogesh-Bhavna-Anniversary-Source.zip**. Use Node.js 22.12+ or a supported newer version.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` creates the static site in `dist/`. `npm run package` rebuilds it and creates both ZIPs in the parent folder on macOS/Linux (requires the system `zip` command). If you edit the source copy of `public/site-config.json` or add photos to `public/photos/`, rebuild before distributing.

Main files: `src/main.js` (content and interactions), `src/style.css` (visual design), `public/site-config.json` (photos, venue and RSVP), `vite.config.js` (portable build).

## Typography and accessibility

Cormorant Garamond and Manrope are bundled with their SIL Open Font License files in `fonts/`. The memory carousel flows continuously and has a keyboard-accessible pause control. Reduced-motion mode provides a scrollable gallery. Forms have labelled fields and focus states, and the page includes mobile navigation and a skip link.

The hero and venue feature subtle continuous rose petals. Photo frames gently wiggle, the evening timeline unfolds on scroll, and the celebration and venue headings fade in. Decorative loops pause offscreen or when the browser tab is hidden, and reduced-motion preferences are respected. Motion is implemented in `src/motion.js` and `src/motion.css`.
