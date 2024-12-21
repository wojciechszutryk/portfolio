function slideUp(element, duration = 700) {
  element.style.transitionProperty = "height, margin, padding";
  element.style.transitionDuration = duration + "ms";
  element.style.boxSizing = "border-box";
  element.style.height = element.offsetHeight + "px";
  element.offsetHeight;
  element.style.overflow = "hidden";
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;

  window.setTimeout(() => {
    element.style.display = "none";
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
    element.style.removeProperty("padding-top");
    element.style.removeProperty("padding-bottom");
    element.style.removeProperty("margin-top");
    element.style.removeProperty("margin-bottom");
  }, duration);
}

function slideDown(element, duration = 700) {
  element.style.removeProperty("display");
  let display = window.getComputedStyle(element).display;

  if (display === "none") display = "block";

  element.style.display = display;
  let height = element.offsetHeight;
  element.style.overflow = "hidden";
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.offsetHeight;
  element.style.boxSizing = "border-box";
  element.style.transitionProperty = "height, margin, padding";
  element.style.transitionDuration = duration + "ms";
  element.style.height = height + "px";
  element.style.removeProperty("padding-top");
  element.style.removeProperty("padding-bottom");
  element.style.removeProperty("margin-top");
  element.style.removeProperty("margin-bottom");

  window.setTimeout(() => {
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
  }, duration);
}

function slideToggle(element, duration = 700) {
  if (window.getComputedStyle(element).display === "none") {
    return slideDown(element, duration);
  } else {
    return slideUp(element, duration);
  }
}

function prepareFlip(number) {
  for (let i = 1; i < 5; i++) {
    if (i === number) continue;
    const panel = document.getElementById("panel" + i);
    slideUp(panel);

    const link = document.getElementById("a" + i);
    link.style.backgroundColor = "white";
    link.style.color = "#111";
  }
}

function togglePanel(panelNumber, backgroundColor, textColor) {
  const panel = document.getElementById("panel" + panelNumber);
  const link = document.getElementById("a" + panelNumber);

  prepareFlip(panelNumber);

  slideToggle(panel);

  link.style.backgroundColor = backgroundColor;
  link.style.color = textColor;
}

window.addEventListener("load", function () {
  document.getElementById("flip1").addEventListener("click", function () {
    togglePanel(1, "#9d5e62", "#fff");
  });
  document.getElementById("flip2").addEventListener("click", function () {
    togglePanel(2, "#929292", "#fff");
  });
  document.getElementById("flip3").addEventListener("click", function () {
    togglePanel(3, "#6b050e", "#fff");
  });
  document.getElementById("flip4").addEventListener("click", function () {
    togglePanel(4, "#c36969", "#fff");
  });
});
