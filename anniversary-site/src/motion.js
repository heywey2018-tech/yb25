import './motion.css';

// One opening sequence, then motion tied to the memories and evening journey.
// Everything is visible and usable before this progressive enhancement runs.
export function initInvitationMotion() {
  const hero = document.querySelector('.hero');
  const petalScenes = [hero, document.querySelector('.venue')];
  petalScenes.forEach(scene => scene.classList.add('petal-scene'));
  const timeline = document.querySelector('.event-timeline');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const activeAnimations = new Set();
  let openingStarted = false;
  let timelineVisible = false;
  let progress = 0;
  let scheduledFrame = 0;

  // Keep the drawn arch on the actual frame when its proportions change.
  const portrait = hero.querySelector('.portrait-frame');
  const outline = portrait.querySelector('.portrait-outline');
  function fitPortraitOutline() {
    const width = portrait.offsetWidth;
    const height = portrait.offsetHeight;
    const radius = Math.min(parseFloat(getComputedStyle(portrait).borderTopLeftRadius), (width - 2) / 2);
    outline.setAttribute('viewBox', `0 0 ${width} ${height}`);
    outline.querySelector('path').setAttribute('d', `M6 ${height - 1}H${width - 6}Q${width - 1} ${height - 1} ${width - 1} ${height - 6}V${radius + 1}A${radius} ${radius} 0 0 0 ${width - radius - 1} 1H${radius + 1}A${radius} ${radius} 0 0 0 1 ${radius + 1}V${height - 6}Q1 ${height - 1} 6 ${height - 1}Z`);
  }
  fitPortraitOutline();
  new ResizeObserver(fitPortraitOutline).observe(portrait);

  function animate(element, keyframes, options) {
    if (reducedMotion.matches || !element.animate) return;
    const animation = element.animate(keyframes, options);
    activeAnimations.add(animation);
    const forget = () => activeAnimations.delete(animation);
    animation.finished.then(forget, forget);
    return animation;
  }

  function finishOpening() {
    hero.classList.remove('is-opening');
  }

  hero.addEventListener('animationend', event => {
    if (event.animationName === 'arch-draw') finishOpening();
  });
  const sceneObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-in-view', entry.isIntersecting);
      if (entry.target !== hero) continue;
      if (entry.isIntersecting && !openingStarted && !document.hidden) {
        openingStarted = true;
        if (!reducedMotion.matches) hero.classList.add('is-opening');
      } else if (!entry.isIntersecting && openingStarted) finishOpening();
    }
  }, { threshold: 0 });
  petalScenes.forEach(scene => sceneObserver.observe(scene));

  // Arrival plays once; a tiny independent rotation keeps the original tilt.
  const polaroids = [...document.querySelectorAll('.story-photos figure, .event-visual, .evening-detail')];
  polaroids.forEach((frame, i) => {
    frame.classList.add('polaroid');
    frame.style.setProperty('--wiggle-duration', `${5.2 + (i % 3) * .6}s`);
    frame.style.setProperty('--wiggle-delay', `${i * -.7}s`);
  });
  const frameObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const frame = entry.target;
      frame.classList.toggle('is-in-view', entry.isIntersecting);
      if (!entry.isIntersecting || frame.dataset.settled) continue;
      frame.dataset.settled = 'true';
      const finalTransform = getComputedStyle(frame).transform;
      const clockwise = frame.matches('.story-photo-now') || frame.closest('.event-reverse');
      const turn = clockwise ? 3 : -3;
      const base = finalTransform === 'none' ? '' : finalTransform;
      animate(frame, [
        { opacity: .45, transform: `translateY(18px) ${base} rotate(${turn}deg)` },
        { opacity: 1, transform: finalTransform },
      ], {
        duration: 800,
        delay: frame.matches('.story-photo-now') ? 120 : 0,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
    }
  }, { threshold: .18 });
  polaroids.forEach(frame => frameObserver.observe(frame));

  const headingObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      headingObserver.unobserve(entry.target);
      entry.target.dataset.faded = 'true';
      animate(entry.target, [{ opacity: .08 }, { opacity: 1 }], {
        duration: 1100, easing: 'ease-out',
      });
    }
  }, { threshold: .4, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('#celebration-title, #venue-title')
    .forEach(heading => headingObserver.observe(heading));

  const trace = document.createElement('span');
  trace.className = 'timeline-progress';
  trace.setAttribute('aria-hidden', 'true');
  timeline.prepend(trace);

  function updateTimeline() {
    scheduledFrame = 0;
    if (reducedMotion.matches || document.hidden || !timelineVisible) return;
    const bounds = timeline.getBoundingClientRect();
    const style = getComputedStyle(trace);
    const top = parseFloat(style.top);
    const bottom = parseFloat(style.bottom);
    const readingPoint = innerHeight * .72;
    const length = Math.max(1, bounds.height - top - bottom);
    progress = Math.max(progress, Math.min(1, Math.max(0, (readingPoint - bounds.top - top) / length)));
    timeline.style.setProperty('--timeline-progress', progress.toFixed(4));
    for (const event of timeline.querySelectorAll('.event')) {
      const node = event.querySelector('.timeline-node');
      const nodeBounds = node.getBoundingClientRect();
      if (nodeBounds.top + nodeBounds.height / 2 > readingPoint || event.classList.contains('is-reached')) continue;
      event.classList.add('is-reached');
      animate(node.querySelector('.icon'), [
        { transform: 'scale(.88)', opacity: .6 },
        { transform: 'scale(1.12)', opacity: 1, offset: .45 },
        { transform: 'scale(1)', opacity: 1 },
      ], { duration: 550, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    }
  }

  function scheduleTimeline() {
    if (!scheduledFrame && timelineVisible && !document.hidden && !reducedMotion.matches) {
      scheduledFrame = requestAnimationFrame(updateTimeline);
    }
  }

  const timelineObserver = new IntersectionObserver(([entry]) => {
    timelineVisible = entry.isIntersecting;
    scheduleTimeline();
  }, { rootMargin: '100px' });
  timelineObserver.observe(timeline);
  addEventListener('scroll', scheduleTimeline, { passive: true });
  addEventListener('resize', scheduleTimeline, { passive: true });

  function updateMotionPreference() {
    timeline.classList.toggle('is-tracing', !reducedMotion.matches);
    if (reducedMotion.matches) {
      finishOpening();
      for (const animation of activeAnimations) animation.cancel();
      cancelAnimationFrame(scheduledFrame);
      scheduledFrame = 0;
    } else scheduleTimeline();
  }
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', updateMotionPreference);
  else reducedMotion.addListener(updateMotionPreference);
  timeline.classList.toggle('is-tracing', !reducedMotion.matches);

  const loopingSurfaces = [...petalScenes, ...polaroids];
  function updateDocumentVisibility() {
    loopingSurfaces.forEach(surface => surface.classList.toggle('is-document-hidden', document.hidden));
  }
  document.addEventListener('visibilitychange', () => {
    updateDocumentVisibility();
    for (const animation of activeAnimations) {
      if (document.hidden) animation.pause();
      else if (!reducedMotion.matches) animation.play();
    }
    if (!document.hidden) scheduleTimeline();
  });
  updateDocumentVisibility();

  let choiceAnimation;
  document.querySelectorAll('.attendance-options input').forEach(input => {
    input.addEventListener('change', () => {
      choiceAnimation?.cancel();
      const symbol = input.nextElementSibling.querySelector('.icon');
      choiceAnimation = input.value === 'yes'
        ? animate(symbol, [
          { transform: 'scale(1)' },
          { transform: 'scale(1.2)', offset: .35 },
          { transform: 'scale(1)' },
        ], { duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
        : animate(symbol, [{ opacity: .6 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
    });
  });
}
