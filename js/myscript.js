AOS.init();

//swiper
var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 50,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

//scrollTo
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

//about type name
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

//bar move
var i = 0;
let last_known_scroll_position = 0;
let ticking = false;
var bar = 0;

function move() {
  if (i == 0 && bar == 0) {
    i = 1;
    var elem1 = document.getElementById("myBar1");
    var elem2 = document.getElementById("myBar2");
    var elem3 = document.getElementById("myBar3");
    var elem4 = document.getElementById("myBar4");
    var width = 1;
    var id = setInterval(frame, 30);

    var s = new Date(2018, 6, 22);
    var start = s.getTime();
    var y = new Date(2022, 2, 22);
    var grad = y.getTime() - start;
    var now = Date.now() - start;
    var finish = (now / grad) * 100;
    var progress = Math.ceil(finish);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        var isPL = window.location.pathname.includes("pl");
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
        if (width < 40) {
          elem4.style.width = width + "%";
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

//skills button
function prepareflip(number) {
  for (i = 1; i < 5; i++) {
    if (i == number) continue;
    $("#panel" + i).slideUp("slow");
  }
  document.getElementById("a1").style.backgroundColor = "white";
  document.getElementById("a2").style.backgroundColor = "white";
  document.getElementById("a3").style.backgroundColor = "white";
  document.getElementById("a4").style.backgroundColor = "white";
  document.getElementById("a1").style.color = "#111";
  document.getElementById("a2").style.color = "#111";
  document.getElementById("a3").style.color = "#111";
  document.getElementById("a4").style.color = "#111";
}

$(document).ready(function () {
  $("#flip1").click(function () {
    prepareflip(1);
    $("#panel1").slideToggle("slow");
    document.getElementById("a1").style.backgroundColor = "#929292";
    document.getElementById("a1").style.color = "#fff";
  });
  $("#flip2").click(function () {
    prepareflip(2);
    $("#panel2").slideToggle("slow");
    document.getElementById("a2").style.backgroundColor = "#9d5e62";
    document.getElementById("a2").style.color = "#fff";
  });
  $("#flip3").click(function () {
    prepareflip(3);
    $("#panel3").slideToggle("slow");
    document.getElementById("a3").style.backgroundColor = "#6b050e";
    document.getElementById("a3").style.color = "#fff";
  });
  $("#flip4").click(function () {
    prepareflip(4);
    $("#panel4").slideToggle("slow");
    document.getElementById("a4").style.backgroundColor = "#c36969";
    document.getElementById("a4").style.color = "#fff";
  });
});

//onload
window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);

  if ($(window).width() > 576) {
    $(".me").addClass("rounded-circle");
  }
};

//skills
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container-custom");

left.addEventListener("mouseenter", () => {
  container.classList.add("hover-left");
});

left.addEventListener("mouseleave", () => {
  container.classList.remove("hover-left");
});

right.addEventListener("mouseenter", () => {
  container.classList.add("hover-right");
});

right.addEventListener("mouseleave", () => {
  container.classList.remove("hover-right");
});

//send button
const button = document.querySelector(".submit-button"),
  stateMsg = document.querySelector(".pre-state-msg");

const updateButtonMsg = function () {
  button.classList.add("state-1", "animated");

  setTimeout(finalButtonMsg, 2000);
};

const finalButtonMsg = function () {
  button.classList.add("state-2");

  setTimeout(setInitialButtonState, 2000);
};

const setInitialButtonState = function () {
  button.classList.remove("state-1", "state-2", "animated");
};

button.addEventListener("click", updateButtonMsg);

//mail send
function validateForm() {
  var name = document.getElementById("name").value;
  if (name == "") {
    document.querySelector(".current-state-msg").innerHTML =
      "Name cannot be empty";
    document.querySelector(".status").innerHTML = "Name cannot be empty";
    return false;
  }
  var email = document.getElementById("email").value;
  if (email == "") {
    document.querySelector(".current-state-msg").innerHTML =
      "Email cannot be empty";
    document.querySelector(".status").innerHTML = "Email cannot be empty";
    return false;
  } else {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      document.querySelector(".current-state-msg").innerHTML =
        "Email format invalid";
      document.querySelector(".status").innerHTML = "Email format invalid";
      return false;
    }
  }
  var subject = document.getElementById("subject").value;
  if (subject == "") {
    document.querySelector(".current-state-msg").innerHTML =
      "Subject cannot be empty";
    document.querySelector(".status").innerHTML = "Subject cannot be empty";
    return false;
  }
  var message = document.getElementById("message").value;
  if (message == "") {
    document.querySelector(".current-state-msg").innerHTML =
      "Message cannot be empty";
    document.querySelector(".status").innerHTML = "Message cannot be empty";
    return false;
  }
  document.querySelector(".current-state-msg").innerHTML = "Sending...";
  document.querySelector(".status").innerHTML = "Sending...";
}

document.getElementById("status").innerHTML = "Sending...";
formData = {
  name: $("input[name=name]").val(),
  email: $("input[name=email]").val(),
  subject: $("input[name=subject]").val(),
  message: $("textarea[name=message]").val(),
};

$.ajax({
  url: "mail.php",
  type: "POST",
  data: formData,
  success: function (data, textStatus, jqXHR) {
    $("#status").text(data.message);
    if (data.code)
      //If mail was sent successfully, reset the form.
      $("#contact-form")
        .closest("form")
        .find("input[type=text], textarea")
        .val("");
  },
  error: function (jqXHR, textStatus, errorThrown) {
    $("#status").text(jqXHR);
  },
});
