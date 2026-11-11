// Progressive enhancement only — all content works without this file.
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  // current year in footer
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // scroll-reveal
  var revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // typing rotator for the hero prompt
  var typed = document.getElementById("typed");
  if (typed && !reduce) {
    var phrases = ["AI red teaming", "API penetration testing", "prompt-injection defense", "cloud security", "DevSecOps"];
    var pi = 0, ci = 0, deleting = false;
    function tick() {
      var word = phrases[pi];
      typed.textContent = word.slice(0, ci);
      if (!deleting) {
        if (ci < word.length) { ci++; setTimeout(tick, 70); }
        else { deleting = true; setTimeout(tick, 1600); }
      } else {
        if (ci > 0) { ci--; setTimeout(tick, 35); }
        else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 350); }
      }
    }
    typed.textContent = "";
    setTimeout(tick, 600);
  }
})();
