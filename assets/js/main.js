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

  /* --- copy the install block ------------------------------------------- */
  /* Runs before the parallax block below, which returns early on touch and on
     prefers-reduced-motion — copying has nothing to do with either. */

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    var source = document.querySelector(btn.getAttribute('data-copy'));
    if (!source) return;

    var idle = btn.textContent;
    var timer;

    function flash(label) {
      btn.textContent = label;
      btn.classList.add('is-copied');
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        btn.textContent = idle;
        btn.classList.remove('is-copied');
      }, 1600);
    }

    /* execCommand is the fallback for file:// and any other non-secure
       context, where navigator.clipboard is simply absent. */
    function legacyCopy(text) {
      var pad = document.createElement('textarea');
      pad.value = text;
      pad.setAttribute('readonly', '');
      pad.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(pad);
      pad.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(pad);
      return ok;
    }

    btn.addEventListener('click', function () {
      var text = source.textContent.replace(/\s+$/, '');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { flash('COPIED'); },
          function () { flash(legacyCopy(text) ? 'COPIED' : 'PRESS \u2318C'); }
        );
        return;
      }

      flash(legacyCopy(text) ? 'COPIED' : 'PRESS \u2318C');
    });
  });

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
