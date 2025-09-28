// Soft cross-page fades (respect reduced-motion)
(function () {
  const RMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration = RMQ.matches ? 0 : 1500; // ms

  // Fade-in on load
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-ready');  // enables transitions
    requestAnimationFrame(() => document.body.classList.add('fade-in'));
  });

  // Intercept internal nav clicks for fade-out then navigate
  function isInternalLink(a) {
    try {
      const url = new URL(a.href, location.href);
      return url.origin === location.origin && !url.hash && !a.hasAttribute('target');
    } catch { return false; }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    // modifiers (new tab), hash links, external: let through
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!isInternalLink(a)) return;

    e.preventDefault();
    if (!RMQ.matches) {
      document.body.classList.remove('fade-in');
      document.body.classList.add('fade-out');
      setTimeout(() => (window.location.href = a.href), duration);
    } else {
      window.location.href = a.href;
    }
  });
})();
