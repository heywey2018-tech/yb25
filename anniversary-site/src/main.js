import './style.css';
import { initInvitationMotion } from './motion.js';

const icon = (name, className = '') => {
  const paths = {
    star: '<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7Z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    sad: '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="9" r=".75" fill="currentColor" stroke="none"/><circle cx="15.5" cy="9" r=".75" fill="currentColor" stroke="none"/><path d="M8 16c2-3 6-3 8 0"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    play: '<path d="m8 4 12 8-12 8Z"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    down: '<path d="M12 3v18m-6-6 6 6 6-6"/>',
    left: '<path d="m14 6-6 6 6 6"/>',
    right: '<path d="m10 6 6 6-6 6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m5 5 14 14M5 19 19 5"/>',
    flower: '<path d="M12 12C2 7 6 1 10 4c2-6 8-2 6 2 6-2 9 5 4 7 5 5 0 10-4 7-1 6-8 5-8 0-6 3-9-4-4-7-4-3-1-8 3-6"/><circle cx="12" cy="12" r="2.5"/>',
    cake: '<path d="M4 13h16v8H4Zm0 3c2 3 4-3 6 0s4-3 6 0 4 0 4 0M7 13V9h10v4M12 9V5m0-4c2 2 2 3 0 4-2-1-2-2 0-4Z"/>',
    music: '<path d="M9 18V5l11-2v13M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="17" cy="16" rx="3" ry="3"/>',
    moon: '<path d="M21 13a9 9 0 0 1-10-10A9 9 0 1 0 21 13Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  };
  return `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.star}</svg>`;
};

const ornament = () => `<div class="ornament" aria-hidden="true"><span></span>${icon('star')}<span></span></div>`;
const photo = (key, label, className = '') => `<div class="photo-slot ${className}" data-photo="${key}"><div class="photo-fallback">${icon('image')}<span class="photo-title">${label}</span><span class="photo-note">Your photograph here</span></div></div>`;
const petalPositions = [7, 83, 26, 64, 43, 94, 16, 54, 75, 34, 62, 11];
const rosePetals = (phase = 0) => `<div class="rose-petals" aria-hidden="true">${petalPositions.map((left, i) => `<span class="rose-petal" style="--petal-left:${left}%;--petal-delay:${(-i * 1.1 - phase).toFixed(1)}s;--petal-mobile-delay:${(-i * 1.7 - phase).toFixed(1)}s;--petal-duration:${12 + (i % 4) * .7}s;--petal-drift:${i % 2 ? -4 : 5}vw;--petal-size:${8 + (i % 3) * 2}px;--petal-angle:${i * 29}deg"><span class="rose-petal-blade"></span></span>`).join('')}</div>`;

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <a class="brand" href="#home" aria-label="Yogesh and Bhavna, back to top"><span>Y<span class="brand-amp">&</span>B</span><span class="brand-years">TWENTY-FIVE YEARS</span></a>
    <nav class="desktop-nav" aria-label="Main navigation"><a href="#journey">Our Journey</a><a href="#celebration">Celebration</a><a href="#venue">Venue</a><a class="nav-rsvp" href="#rsvp">RSVP</a></nav>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button>
    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden><a href="#journey">Our Journey</a><a href="#celebration">Celebration</a><a href="#venue">Venue</a><a href="#rsvp">RSVP</a></nav>
  </header>
  <main id="main">
    <section id="home" class="hero" aria-labelledby="hero-title">
      <div class="hero-landscape" aria-hidden="true"></div>
      <div class="hero-linework" aria-hidden="true"></div>
      <div class="hero-celestial" aria-hidden="true"><div class="hero-moon"><span class="moonlight-glow"></span>${icon('moon')}</div>${[1, 2, 3, 4].map(i => `<span class="sky-star sky-star-${i}">${icon('star')}</span>`).join('')}</div>
      ${rosePetals()}
      <div class="hero-inner container">
        <div class="hero-copy">
          <p class="hero-introduction">Celebrate the Silver Jubilee of</p>
          <h1 id="hero-title">Yogesh <span class="name-line"><em>&</em> Bhavna</span></h1>
          <h2 class="hero-subtitle">25 Years of Love,<br>Laughter & Togetherness</h2>
          <p class="hero-quote">“25 years, one beautiful journey,<br>and a love that keeps growing.”</p>
          <div class="hero-date"><span>14</span><div><span>November</span><small>6:30 PM · DEHRADUN</small></div></div>
          <a href="#rsvp" class="button button-blush">Celebrate with us</a>
        </div>
        <div class="hero-portrait">
          <div class="portrait-frame">${photo('hero', 'Our favourite kind of forever', 'hero-photo')}<svg class="portrait-outline" viewBox="0 0 490 556" preserveAspectRatio="none" fill="none" aria-hidden="true"><path pathLength="1" d="M3 553H487V246C487 112 378 3 245 3S3 112 3 246Z" /></svg></div>
          <img class="hero-botanical" src="./art/botanical.png" alt="" aria-hidden="true" />
        </div>
      </div>
      <a class="hero-scroll" href="#journey"><span>Join us for an evening of love & celebration</span>${icon('down')}</a>
    </section>
    <div id="remaining-sections"></div>
  </main>`;

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  menuToggle.innerHTML = icon('menu');
}
menuToggle.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  menuToggle.innerHTML = icon(opening ? 'close' : 'menu');
});
mobileNav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', (event) => {
  // The toggle replaces its icon while this click is bubbling. The composed
  // path remains valid even after that original SVG target is detached.
  if (!event.composedPath().includes(document.querySelector('.site-header'))) closeMenu();
});

const memories = [
  'The beginning of us', 'The people we love', 'A little adventure, together',
  'Reasons to celebrate', 'The everyday kind of magic', 'Memories to hold close', 'Then, now & always',
];
const events = [
  { time: '6:30 PM', title: 'Reliving the Varmala', category: 'Jaimala', description: 'A beautiful moment to revisit and celebrate the beginning of their journey together.', icon: 'flower', photo: 'jaimala', label: 'Where it all began', className: 'event-jaimala' },
  { time: '7:00 PM', title: 'The Silver Jubilee Toast & Cake', category: 'Cake Cutting', description: 'A toast to 25 wonderful years of love and togetherness.', icon: 'cake', photo: 'cake', label: 'A little sweetness, a lot of love', className: 'event-cake' },
  { time: '7:30 PM', title: 'Silver Soirée & Dance', category: 'Dance Performances', description: 'An evening of music, dance, laughter, and celebration.', icon: 'music', photo: 'dance', label: 'Joy, in every step', className: 'event-dance' },
  { time: '9:00 PM', title: 'Dinner Under the Stars', category: 'Dinner', description: 'A warm and intimate dinner to bring the evening together.', icon: 'moon', photo: 'dinner', label: 'An evening to savour', className: 'event-dinner' },
];

document.querySelector('#remaining-sections').outerHTML = `
  <section id="journey" class="journey" aria-labelledby="journey-title">
    <div class="journey-intro container">
      <div class="story-copy">
        <h2 id="journey-title">Our Journey</h2>
        <div class="short-rule" aria-hidden="true"></div>
        <p class="story-text">Twenty-five years of choosing each other, growing together, and creating a life filled with love, laughter, and countless little moments. Here’s to Yogesh & Bhavna — and to all the beautiful years still to come.</p>
        <p class="story-signature">Then, now <em>&</em> always.</p>
      </div>
      <div class="story-photos">
        <figure class="story-photo-then">${photo('story-then', 'The beginning of something beautiful')}<figcaption>Then & Now</figcaption></figure>
        <figure class="story-photo-now">${photo('story-now', 'Still choosing you')}</figure>
        <img class="story-botanical" src="./art/botanical.png" alt="" loading="lazy" aria-hidden="true" />
      </div>
    </div>
    <div class="memory-section">
      <div class="memory-heading container"><h3>A lifetime of<br><em>little moments.</em></h3><div class="memory-heading-tools"><div class="memory-subtitle">${ornament()}<p>25 years, countless memories</p></div><button class="carousel-motion-toggle" type="button" aria-label="Pause slideshow" aria-pressed="false" title="Pause slideshow">${icon('pause')}</button></div></div>
      <div class="memory-carousel" role="region" aria-roledescription="carousel" aria-label="Photographs from our journey">
        <div class="memory-track" tabindex="0" aria-label="Memory photographs. The slideshow moves automatically; pause to take a closer look.">
          <div class="memory-belt">
            ${[false, true].map(duplicate => `<div class="memory-sequence"${duplicate ? ' aria-hidden="true"' : ''}>${memories.map((caption, index) => `<figure class="memory-slide" role="group" aria-roledescription="slide" aria-label="${index + 1} of 7: ${caption}">${photo(`memory-${index + 1}`, caption)}</figure>`).join('')}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="celebration" class="celebration" aria-labelledby="celebration-title">
    <div class="celebration-intro container">
      ${ornament()}<h2 id="celebration-title">An Evening<br>to <em>Remember</em></h2>
      <p>A beautiful evening filled with memories, music, laughter,<br class="desktop-break"> and a little bit of magic.</p>
      <div class="celebration-date"><span>14 NOVEMBER</span>${icon('star')}<span>FROM 6:30 PM</span></div>
    </div>
    <div class="event-timeline container">
      ${events.map((event, i) => `<article class="event ${event.className} ${i % 2 ? 'event-reverse' : ''}" aria-labelledby="event-title-${i}"><div class="timeline-node" aria-hidden="true">${icon(event.icon)}</div><div class="event-copy"><time>${event.time}</time><h3 id="event-title-${i}">${event.title}</h3><p class="event-category">Event: ${event.category}</p><p class="event-description">${event.description}</p><div class="event-flourish" aria-hidden="true"><span></span>${icon(event.icon)}</div></div><div class="event-visual">${photo(event.photo, event.label, 'event-photo')}${i === 3 ? `<div class="dinner-star" aria-hidden="true">${icon('star')}</div>` : ''}<span class="event-photo-caption">${event.label}</span></div></article>`).join('')}
    </div>
    <div class="evening-moments container"><div class="moment-quote">${icon('star')}<p>Some evenings<br>stay with you<br><em>forever.</em></p></div><figure class="evening-detail">${photo('evening-detail', 'The glow of a beautiful evening')}<figcaption>Love in the little details</figcaption></figure><img src="./art/botanical.png" alt="" loading="lazy" aria-hidden="true" /></div>
    <div class="celebration-bottom" aria-hidden="true">${ornament()}</div>
  </section>
  <section id="venue" class="venue" aria-labelledby="venue-title">
    <div class="venue-atmosphere" aria-hidden="true"></div>
    ${rosePetals(2.5)}
    <div class="venue-heading container"><h2 id="venue-title">Meet us<br><em>in the mountains.</em></h2><p>In the heart of Dehradun, an evening of warmth,<br class="desktop-break"> togetherness, and beautiful new memories awaits.</p></div>
    <div class="venue-invitation container">
      <div class="venue-card"><div class="venue-information">${icon('pin')}<h3>Venue</h3><p class="venue-city" data-venue-city>Dehradun, Uttarakhand</p><dl><div class="address-row"><dt>ADDRESS</dt><dd><span class="venue-address-name" data-venue-name>Hotel Comfort Inn</span><span class="venue-address-details" data-venue-address></span></dd></div><div><dt>DATE</dt><dd>14 November</dd></div><div><dt>CELEBRATION BEGINS</dt><dd>6:30 PM</dd></div></dl><p class="venue-welcome">Come for the celebration.<br>Stay for the memories.</p><a class="button button-wine directions-link" href="https://www.google.com/maps/search/?api=1&query=Hotel%20Comfort%20Inn%20Dehradun%20Uttarakhand" target="_blank" rel="noopener noreferrer">${icon('pin')}Get Directions<span class="sr-only"> (opens in a new tab)</span></a></div><div class="map-wrap"><iframe title="Map: Hotel Comfort Inn in Dehradun" src="https://maps.google.com/maps?q=Hotel%20Comfort%20Inn%20Dehradun%20Uttarakhand&z=14&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a class="map-external directions-link" href="https://www.google.com/maps/search/?api=1&query=Hotel%20Comfort%20Inn%20Dehradun%20Uttarakhand" target="_blank" rel="noopener noreferrer">Explore on Google Maps<span class="sr-only"> (opens in a new tab)</span></a></div></div>
    </div>
  </section>
  <section id="rsvp" class="rsvp" aria-labelledby="rsvp-title">
    <div class="rsvp-linework" aria-hidden="true"></div><img class="rsvp-botanical" src="./art/botanical.png" alt="" loading="lazy" aria-hidden="true" />
    <div class="rsvp-content container">
      <div class="rsvp-copy">${icon('heart')}<h2 id="rsvp-title">Celebrate<br><em>With Us</em></h2><p>Join us as we celebrate 25 wonderful years of Yogesh and Bhavna's journey together and mark this beautiful milestone of their Silver Jubilee.</p><div class="rsvp-date"><span>14 November</span><span>6:30 PM · Dehradun</span></div></div>
      <form id="rsvp-form" class="rsvp-form">
        <div class="form-row"><div class="form-field"><label for="guest-name">Your name <span aria-hidden="true">*</span></label><input id="guest-name" name="name" type="text" autocomplete="name" required maxlength="120" placeholder="Your full name" /></div><div class="form-field guest-count"><label for="guest-count">Number of guests <span aria-hidden="true">*</span></label><select id="guest-count" name="guests" required>${Array.from({length:10}, (_,i) => `<option value="${i+1}">${i+1}${i === 0 ? ' guest' : ' guests'}</option>`).join('')}<option value="11+">11 or more</option></select></div></div>
        <fieldset class="attendance-field"><legend>Will you be joining us? <span aria-hidden="true">*</span></legend><div class="attendance-options"><label><input type="radio" name="joining" value="yes" required /><span>${icon('heart')}Joyfully, yes</span></label><label><input type="radio" name="joining" value="no" required /><span>${icon('sad')}With regret, no</span></label></div></fieldset>
        <div class="form-field"><label for="guest-message">A little note for us <span class="optional">(optional)</span></label><textarea id="guest-message" name="message" rows="4" maxlength="2000" placeholder="A message, or any dietary requirements…"></textarea></div>
        <div class="form-honeypot" aria-hidden="true"><label for="website">Leave this blank</label><input id="website" name="website" tabindex="-1" autocomplete="off" /></div>
        <button id="rsvp-btn" class="button button-blush rsvp-submit" type="submit">Send RSVP</button><p class="form-note" id="rsvp-note">With love, we look forward to celebrating together.</p><p id="rsvp-status" class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
    <footer class="closing container">${ornament()}<p class="closing-names">Yogesh <em>&</em> Bhavna</p><p class="closing-date">25 Years <span aria-hidden="true">·</span> 14 November</p><p class="closing-line">Here’s to love, laughter, and all the years yet to come.</p><a href="#home" class="back-top" aria-label="Back to the top">Back to the beginning</a></footer>
  </section>`;

// The public configuration is intentionally outside the Vite bundle, so photos,
// venue details and the RSVP destination can be changed without rebuilding.
let siteConfig = { venue: {}, rsvp: {}, photos: {} };
const rsvpForm = document.querySelector('#rsvp-form');
const formStatus = document.querySelector('#rsvp-status');
const submitButton = document.querySelector('#rsvp-btn');
const rsvpNote = document.querySelector('#rsvp-note');
function usableURL(value, { images = false } = {}) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value, document.baseURI);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    if (!images && url.protocol !== 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') return null;
    return url.href;
  } catch { return null; }
}

async function loadConfiguration() {
  try {
    const response = await fetch(new URL('./site-config.json', document.baseURI), { cache: 'no-store' });
    if (!response.ok) throw new Error('Configuration unavailable');
    const config = await response.json();
    if (!config || typeof config !== 'object') throw new Error('Invalid configuration');
    siteConfig = { venue: config.venue || {}, rsvp: config.rsvp || {}, photos: config.photos || {} };
    document.querySelectorAll('[data-photo]').forEach((slot) => {
      const entry = siteConfig.photos[slot.dataset.photo];
      const src = usableURL(typeof entry === 'string' ? entry : entry?.src, { images: true });
      if (!src) return;
      const image = new Image();
      image.alt = typeof entry?.alt === 'string' ? entry.alt : 'A photograph of our journey';
      image.loading = slot.dataset.photo === 'hero' ? 'eager' : 'lazy';
      image.decoding = 'async';
      if (slot.dataset.photo === 'hero') image.fetchPriority = 'high';
      if (typeof entry?.position === 'string' && /^[\d.%\s]+$/.test(entry.position)) image.style.objectPosition = entry.position;
      if (['cover', 'contain'].includes(entry?.fit)) image.style.objectFit = entry.fit;
      image.addEventListener('load', () => { slot.classList.add('is-loaded'); slot.querySelector('.photo-fallback').hidden = true; });
      image.addEventListener('error', () => { image.remove(); slot.classList.remove('is-loaded'); });
      image.src = src;
      slot.append(image);
    });
    const venue = siteConfig.venue;
    for (const [key, selector] of [['name','[data-venue-name]'], ['city','[data-venue-city]'], ['address','[data-venue-address]']]) {
      if (typeof venue[key] === 'string' && venue[key].trim()) document.querySelector(selector).textContent = venue[key].trim();
    }
    const query = typeof venue.address === 'string' && venue.address.trim() ? `${venue.name || 'Hotel Comfort Inn'}, ${venue.address}, ${venue.city || 'Dehradun, Uttarakhand'}` : venue.mapQuery || 'Hotel Comfort Inn Dehradun Uttarakhand';
    const encoded = encodeURIComponent(query);
    document.querySelectorAll('.directions-link').forEach((link) => { link.href = `https://www.google.com/maps/search/?api=1&query=${encoded}`; });
    document.querySelector('.map-wrap iframe').src = `https://maps.google.com/maps?q=${encoded}&z=14&output=embed`;
  } catch {
    // Keep all supplied invitation details and designed placeholders usable.
  }
  const hasEndpoint = Boolean(usableURL(siteConfig.rsvp.endpoint));
  const hasEmail = typeof siteConfig.rsvp.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.rsvp.email);
  if (hasEmail && !hasEndpoint) {
    submitButton.textContent = 'Prepare email RSVP';
    rsvpNote.textContent = 'Your reply will open in your email app, ready for you to send.';
  } else if (!hasEndpoint) {
    rsvpNote.textContent = 'RSVP replies will open soon. Please contact the hosts to confirm your attendance.';
  }
}
const configurationReady = loadConfiguration();

// Two identical sequences create a seamless, continuously flowing slideshow.
// Keep one accessible sequence and pause when guests want a closer look.
const carousel = document.querySelector('.memory-carousel');
const motionToggle = document.querySelector('.carousel-motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let slideshowPaused = false;
function updateSlideshowControl() {
  const paused = slideshowPaused || reducedMotion.matches;
  carousel.classList.toggle('is-paused', paused);
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.setAttribute('aria-label', paused ? 'Resume slideshow' : 'Pause slideshow');
  motionToggle.title = paused ? 'Resume slideshow' : 'Pause slideshow';
  motionToggle.innerHTML = icon(paused ? 'play' : 'pause');
  motionToggle.hidden = reducedMotion.matches;
}
motionToggle.addEventListener('click', () => {
  slideshowPaused = !slideshowPaused;
  updateSlideshowControl();
});
reducedMotion.addEventListener('change', updateSlideshowControl);
updateSlideshowControl();
const carouselObserver = new IntersectionObserver(([entry]) => {
  carousel.classList.toggle('is-offscreen', !entry.isIntersecting);
}, { rootMargin: '100px' });
carouselObserver.observe(carousel);
document.addEventListener('visibilitychange', () => {
  carousel.classList.toggle('is-document-hidden', document.hidden);
});

const attendance = rsvpForm.elements.joining;
const guestCount = rsvpForm.elements.guests;
let rsvpSubmitting = false;
for (const option of attendance) option.addEventListener('change', () => {
  guestCount.disabled = attendance.value === 'no';
  guestCount.required = attendance.value !== 'no';
});
rsvpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await configurationReady;
  if (rsvpSubmitting) return;
  if (!rsvpForm.reportValidity()) return;
  if (rsvpForm.elements.website.value) return;
  const name = rsvpForm.elements.name.value.trim();
  if (!name) { rsvpForm.elements.name.setCustomValidity('Please enter your name.'); rsvpForm.elements.name.reportValidity(); return; }
  rsvpForm.elements.name.setCustomValidity('');
  const payload = {
    name,
    guests: attendance.value === 'no' ? '0' : guestCount.value,
    attendance: attendance.value,
    message: rsvpForm.elements.message.value.trim(),
    celebration: 'Yogesh & Bhavna — 25th anniversary, 14 November',
  };
  const endpoint = usableURL(siteConfig.rsvp.endpoint);
  const email = typeof siteConfig.rsvp.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.rsvp.email) ? siteConfig.rsvp.email : null;
  formStatus.className = 'form-status';
  formStatus.textContent = '';
  if (endpoint) {
    rsvpSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    rsvpForm.setAttribute('aria-busy', 'true');
    try {
      const endpointURL = new URL(endpoint);
      const isGoogleScript = endpointURL.hostname === 'script.google.com' && /^\/macros\/s\/[^/]+\/exec$/.test(endpointURL.pathname);
      if (isGoogleScript) {
        const data = new FormData(rsvpForm);
        data.set('name', payload.name);
        data.set('guests', payload.guests);
        data.set('joining', payload.attendance);
        data.set('message', payload.message);
        data.set('note', payload.message);
        data.set('celebration', payload.celebration);
        data.delete('website');
        // Apps Script receives standard form fields. Its no-cors response is
        // opaque, so completion confirms dispatch, not that a row was saved.
        await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data, signal: AbortSignal.timeout(30000) });
        formStatus.textContent = payload.attendance === 'yes' ? 'Thank you! Your RSVP has been sent. 💌 We look forward to celebrating with you.' : 'Thank you! Your reply has been sent. You’ll be with us in spirit.';
      } else {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('Reply not accepted');
        formStatus.textContent = payload.attendance === 'yes' ? 'Thank you! Your RSVP has been received. We look forward to celebrating with you.' : 'Thank you for letting us know. You’ll be with us in spirit.';
      }
      formStatus.classList.add('success');
      rsvpForm.reset();
      guestCount.disabled = false;
      guestCount.required = true;
      if (payload.attendance === 'yes' && !reducedMotion.matches && typeof window.confetti === 'function') {
        try { window.confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } }); } catch { /* Optional celebration must not affect the submitted reply. */ }
      }
    } catch {
      formStatus.textContent = 'Your reply could not be sent. Please try again, or contact the hosts directly.';
      formStatus.classList.add('error');
    } finally {
      rsvpSubmitting = false;
      rsvpForm.setAttribute('aria-busy', 'false');
      submitButton.disabled = false;
      submitButton.textContent = 'Send RSVP';
    }
  } else if (email) {
    const subject = 'RSVP: Yogesh & Bhavna’s 25th anniversary';
    const body = `Name: ${payload.name}\nJoining: ${payload.attendance === 'yes' ? 'Yes' : 'No'}\nGuests: ${payload.guests}\n\nMessage / dietary requirements:\n${payload.message || 'None'}\n\n14 November · Hotel Comfort Inn, Dehradun`;
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = 'Your email draft is ready. Send it from your email app to confirm your RSVP.';
  } else {
    formStatus.textContent = 'RSVP replies are not open yet. Please contact the hosts to confirm your attendance.';
    formStatus.classList.add('error');
  }
});
rsvpForm.elements.name.addEventListener('input', () => rsvpForm.elements.name.setCustomValidity(''));

// Keep navigation grounded in the section guests are currently reading.
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -65% 0px' });
document.querySelectorAll('main>section[id]').forEach((section) => navObserver.observe(section));

initInvitationMotion();
