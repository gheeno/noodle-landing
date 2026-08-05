/* Noodle landing — CRT power-on + pointer parallax. No dependencies. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- CRT power-on wipe, once, on first paint --------------------------- */
  if (!reduced) {
    document.body.classList.add('booting');
    window.setTimeout(function () {
      document.body.classList.remove('booting');
    }, 1200);
  }

  /* --- pointer parallax on the foreground -------------------------------- */
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (reduced || !layers.length || !window.matchMedia('(pointer: fine)').matches) return;

  var targetX = 0, targetY = 0, currentX = 0, currentY = 0, ticking = false;

  function onMove(e) {
    targetX = (e.clientX / window.innerWidth) - 0.5;
    targetY = (e.clientY / window.innerHeight) - 0.5;
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(frame);
    }
  }

  function frame() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    layers.forEach(function (el) {
      var depth = parseFloat(el.getAttribute('data-parallax')) || 0;
      el.style.setProperty(
        'translate',
        (-currentX * depth).toFixed(2) + 'px ' + (-currentY * depth).toFixed(2) + 'px'
      );
    });

    if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
      window.requestAnimationFrame(frame);
    } else {
      ticking = false;
    }
  }

  window.addEventListener('mousemove', onMove, { passive: true });
})();
