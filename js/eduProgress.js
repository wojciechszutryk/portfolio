let i = 0;
let last_known_scroll_position = 0;
let ticking = false;
let bar = 0;

function move() {
  if (i == 0 && bar == 0) {
    i = 1;
    const elem1 = document.getElementById("myBar1");
    const elem2 = document.getElementById("myBar2");
    const elem3 = document.getElementById("myBar3");
    let width = 1;
    const id = setInterval(frame, 30);

    const s = new Date(2018, 6, 22);
    const start = s.getTime();
    const y = new Date(2022, 2, 22);
    const grad = y.getTime() - start;
    const now = Date.now() - start;
    const finish = (now / grad) * 100;
    const progress = Math.ceil(finish);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        const isPL = window.location.pathname.includes("pl");
        elem1.innerHTML = isPL ? "UKOŃCZONO W 2017" : "GRADUATED IN 2017";
        elem2.innerHTML = isPL ? "UKOŃCZONO W 02.2022" : "GRADUATED IN 02.2022";
        elem3.innerHTML = isPL ? "UKOŃCZONO W 09.2022" : "GRADUATED IN 09.2022";
        return 1;
      } else {
        width++;
        elem1.style.width = width + "%";
        if (width < progress) {
          elem2.style.width = width + "%";
          elem3.style.width = width + "%";
        }
        elem1.innerHTML = width + "%";
        if (width < progress) {
          elem2.innerHTML = width + "%";
          elem3.innerHTML = width + "%";
        }
      }
    }
    bar = 1;
  }
}

window.addEventListener("scroll", function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      if (window.scrollY > 1100 && window.scrollY < 2100) {
        move();
      }
      if (window.scrollY > 2100 || window.scrollY < 500) {
        bar = 0;
      }
      ticking = false;
    });

    ticking = true;
  }
});
