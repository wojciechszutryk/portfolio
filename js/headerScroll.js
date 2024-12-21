window.addEventListener("load", function () {
  document.querySelector(".link1").addEventListener("click", function () {
    scrollToTarget("body");
  });
  document.querySelector(".link2").addEventListener("click", function () {
    scrollToTarget("#about");
  });
  document.querySelector(".link3").addEventListener("click", function () {
    scrollToTarget("#education");
  });
  document.querySelector(".link4").addEventListener("click", function () {
    scrollToTarget(".experience");
  });
  document.querySelector(".link5").addEventListener("click", function () {
    scrollToTarget(".skills");
  });
  document.querySelector(".link6").addEventListener("click", function () {
    scrollToTarget("#contact");
  });
});

// Scroll to target with smooth behavior
function scrollToTarget(selector, duration = 400) {
  const target = document.querySelector(selector);
  if (target) {
    const startPosition = window.pageYOffset;
    const targetPosition =
      target.getBoundingClientRect().top + startPosition - 50;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}
