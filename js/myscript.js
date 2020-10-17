AOS.init();

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 50,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

//scrollTo
window.onscroll = function() {myFunction()};

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

//about type name
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};


//bar move
var i = 0;
let last_known_scroll_position = 0;
let ticking = false;
var bar = 0;


function move() {
    if ((i == 0) && (bar==0)) {
        i = 1;
        var elem1 = document.getElementById("myBar1");
        var elem2 = document.getElementById("myBar2");
        var elem3 = document.getElementById("myBar3");
        var elem4 = document.getElementById("myBar4");
        var width = 1;
        var id = setInterval(frame, 30);

        var s = new Date(2018, 6, 22);
        var start = s.getTime();
        var y = new Date(2022,2,22);
        var grad = y.getTime() - start;
        var now = Date.now() - start;
        var finish = (now/grad)*100;
        var progress = Math.ceil(finish);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                elem1.innerHTML = "GRADUATED IN 2017";
                elem2.innerHTML = "IN PROGRESS 2018-2022";
                elem3.innerHTML = "IN PROGRESS 2018-2022";
                return 1;
            } else {
                width++;
                elem1.style.width = width + "%";
                if(width < progress){
                    elem2.style.width = width + "%";
                    elem3.style.width = width + "%";
                }
                if(width < 40){
                    elem4.style.width = width + "%";
                }
                elem1.innerHTML = width + "%";
                if(width < progress) {
                    elem2.innerHTML = width + "%";
                    elem3.innerHTML = width + "%";
                }
            }
        }
        bar = 1;
    }
}

window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            if((window.scrollY > 1100) && (window.scrollY < 2100)){
                move()
            }
            if ((window.scrollY > 2100)||(window.scrollY < 500)){
                bar=0;
            }
            ticking = false;
        });

        ticking = true;
    }
});


//onload
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    if($( window ).width() > 576){
        $(".me").addClass("rounded-circle");
    }
};


//skills
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container-custom');

left.addEventListener('mouseenter', () => {
    container.classList.add('hover-left');
});

left.addEventListener('mouseleave', () => {
    container.classList.remove('hover-left');
});

right.addEventListener('mouseenter', () => {
    container.classList.add('hover-right');
});

right.addEventListener('mouseleave', () => {
    container.classList.remove('hover-right');
});