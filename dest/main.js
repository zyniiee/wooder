//mobile toggle
var mobNav = document.querySelector(".nav");
var navToggle = document.getElementById("toggle");

navToggle.addEventListener("click", function () {
    mobNav.classList.toggle("active");
});

function hideNav() {
    if (mobNav.classList.contains("active")) {
        mobNav.classList.remove("active");
    }
}
window.addEventListener("resize", function () {
    let windowWidth = window.innerWidth;
    if (windowWidth > 767) {
        hideNav();
    }
});

$(".menu li").hover(function () {
    $(this).css("opacity", "1").siblings().css("opacity", "0.3");
});
$(".menu li").mouseout(function () {
    $(".menu li").css("opacity", "1");
});

$(".link").on("click", function () {
    $(".link").removeClass("active");
    $(this).addClass("active");
});

//active scroll to section

let menu = document.querySelectorAll(".main__ul a");
let sections = [];
menu.forEach(function (e, i) {
    let nameSection = e.getAttribute("href").replace("#", "");
    let section = document.querySelector(".homepage > ." + nameSection);
    sections.push(section);
});

window.addEventListener("scroll", function () {
    let posScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
        if (
            posScroll >
            section.offsetTop - document.querySelector("header").offsetHeight
        ) {
            menu.forEach(function (item) {
                item.classList.remove("active");
            });
            menu[index].classList.add("active");
        }
    });
});
//language

let langOption = document.querySelector(".lang__select");
let langCurrent = document.querySelector(".lang__current");
langCurrent.addEventListener("click", function (e) {
    e.stopPropagation();
    langOption.classList.toggle("selected");
});
document.addEventListener("click", function () {
    langOption.classList.remove("selected");
});

langOption.querySelectorAll("a").forEach((e, i) => {
    e.addEventListener("click", function (e) {
        e.preventDefault();
        let text = this.innerText;
        document.querySelector(".lang__current span").innerText = text;
    });
});

//slider
// let sliderImg = document.querySelectorAll(".slider__item");
// let sliderCurrent = 0;
// let preBtn = document.querySelector(".--prev");
// let nextBtn = document.querySelector(".--next");
// let dots = document.querySelectorAll(".dots li");
// let sliderNum = document.querySelector(".number");
// nextBtn.addEventListener("click", function () {
//     if (sliderCurrent < sliderImg.length - 1) {
//         sliderImg[sliderCurrent].classList.remove("active");
//         sliderImg[sliderCurrent + 1].classList.add("active");
//         dots[sliderCurrent].classList.remove("active");
//         sliderCurrent++;
//         dots[sliderCurrent].classList.add("active");
//     }
//     sliderNum.innerText = (sliderCurrent + 1).toString().padStart(2, "0");
// });
// preBtn.addEventListener("click", function () {
//     if (sliderCurrent > 0) {
//         sliderImg[sliderCurrent].classList.remove("active");
//         sliderImg[sliderCurrent - 1].classList.add("active");
//         dots[sliderCurrent].classList.remove("active");
//         sliderCurrent--;
//         dots[sliderCurrent].classList.add("active");
//     }
//     sliderNum.innerText = (sliderCurrent + 1).toString().padStart(2, "0");
// });

// header css
let header = document.querySelector("header");
window.addEventListener("scroll", function () {
    headerScroll = window.pageYOffset;
    if (headerScroll > document.querySelector(".slider").offsetHeight - 50) {
        header.setAttribute(
            "style",
            "background-color: #141416; opacity: 0.4s;"
        );
    } else {
        header.style.backgroundColor = "transparent";
    }
});

//video
let vidContain = document.querySelectorAll(".image");
let modal = document.querySelector(".modal");
let vidClose = document.querySelector(".modal .close");
let vidContent = document.querySelector(".modal .content");

vidContain.forEach((e, i) => {
    e.addEventListener("click", function () {
        let id = e.getAttribute("data-id");
        modal.classList.add("active");
        vidContent.innerHTML =
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
            id +
            '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    });
});
vidClose.addEventListener("click", function () {
    modal.classList.remove("active");
    vidContent.innerHTML = "";
});

// back to top button
let toTopBtn = document.querySelector(".to-top-btn");
window.addEventListener("scroll", function () {
    let scrollY = window.pageYOffset;
    if (scrollY > document.querySelector(".info").offsetHeight) {
        toTopBtn.classList.add("active");
    } else {
        toTopBtn.classList.remove("active");
    }
});
toTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute("data-size").split("x");
            item = {
                src: linkEl.getAttribute("href"),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute("src");
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return el.tagName && el.tagName.toUpperCase() === "FIGURE";
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split("&");
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split("=");
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (
        index,
        galleryElement,
        disableAnimation,
        fromURL
    ) {
        var pswpElement = document.querySelectorAll(".pswp")[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute("data-pswp-uid"),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
                    pageYScroll =
                        window.pageYOffset ||
                        document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width,
                };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(
            pswpElement,
            PhotoSwipeUI_Default,
            items,
            options
        );
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute("data-pswp-uid", i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(
            hashData.pid,
            galleryElements[hashData.gid - 1],
            true,
            true
        );
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM(".gallery__grid");
});

let $carousel = $(".slider__item-wrap");
$carousel.flickity({
    cellAlign: "left",
    wrapAround: true,
    prevNextButtons: false,
    selectedAttraction: 0.2,
    friction: 1.2,
    lazyLoad: 1,
    on: {
        ready: function () {
            let dotted = $(".flickity-page-dots");
            paging = $(".slider__bottom-paging .dots");
            dotted.appendTo(paging);
        },
        change: function (index) {
            let number = $(".slider__bottom-paging .number");
            let indexPage = index + 1;
            number.text(indexPage.toString().padStart(2, 0));
        },
    },
});
//previous
$(".slider__bottom-control .--prev").on("click", function () {
    $carousel.flickity("previous");
});
$(".slider__bottom-control .--next").on("click", function () {
    $carousel.flickity("next");
});

//flickity
$(".carousel").flickity({
    // options
    lazyLoad: 4,
    contain: true,
    freeScroll: true,
    // disable previous & next buttons and dots
    prevNextButtons: false,
    pageDots: false,
});
// (function () {
//     "use strict";

//     console.log("ok 1");

// document.getElementById("toggle").addEventListener("click", function () {
//     document.querySelector(".nav").classList.toggle("active");
// });

//     let langOption = document.querySelector(".lang__select");

//     // document
//     //     .querySelector(".lang__current")
//     //     .addEventListener("click", function (e) {
//     //         //e.stopPropagation();
//     //         if (langOption.classList.contains("selected")) {
//     //             langOption.style.display = "none";
//     //         } else {
//     //             langOption.style.display = "block";
//     //         }
//     //         langOption.classList.toggle("selected");
//     //     });

//     // document.body.addEventListener("click", function () {
//     //     langOption.style.display = "none";
//     //     langOption.classList.remove("selected");
//     // });

//     langOption.querySelectorAll("a").forEach((e, i) => {
//         e.addEventListener("click", function (e) {
//             e.preventDefault();

//             let text = this.innerText;
//             document.querySelector(".lang__current span").innerText = text;
//         });
//     });

//     let video = document.querySelectorAll(".image");
//     let modal = document.querySelector(".modal");
//     let modalContent = document.querySelector(".modal .content");
//     let close = document.querySelector(".modal .close");
//     video.forEach((el, i) => {
//         el.addEventListener("click", function () {
//             let id = el.getAttribute("data-id");
//             modal.classList.add("active");
//             modalContent.innerHTML =
//                 '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
//                 id +
//                 '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
//         });
//     });

//     close.addEventListener("click", function () {
//         modal.classList.remove("active");
//         modalContent.innerHTML = "";
//     });

//     let btnBackToTop = document.querySelector(".to-top-btn");
//     btnBackToTop.addEventListener("click", function (e) {
//         e.preventDefault();
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     });
//     let scrollY = 0;
//     window.addEventListener("scroll", function () {
//         if (document.body.getBoundingClientRect().top > scrollY) {
//             console.log("scroll down");
//             btnBackToTop.classList.remove("active");
//         } else {
//             btnBackToTop.classList.add("active");
//             console.log("scroll up");
//         }
//         scrollY = document.body.getBoundingClientRect().top;
//     });
//     let headerColor = document.querySelector("header");
//     window.addEventListener("scroll", function () {
//         var scrollHeader = window.pageYOffset;
//         if (scrollHeader > document.querySelector(".slider").offsetHeight) {
//             headerColor.setAttribute(
//                 "style",
//                 "background-color: #141416; opacity: 0.4s;"
//             );
//         } else {
//             headerColor.style.backgroundColor = "transparent";
//         }
//     });
//     // var btnBackToTop = document.querySelector(".to-top-btn");
//     // function detectButton() {
//     //     var scrollY = window.pageYOffset;
//     //     console.log(scrollY);
//     //     if (scrollY > 900) {
//     //         btnBackToTop.classList.add("active");
//     //     } else {
//     //         btnBackToTop.classList.remove("active");
//     //     }
//     // }
//     // window.addEventListener("scroll", detectButton);

//     // function backToTop() {
//     //     if (window.pageYOffset > 0){
//     //         window.scrollBy(0, -80);
//     //         setTimeout(backToTop, 0);
//     //     }
//     // }

//     // btnBackToTop.addEventListener("click", backToTop);

//     //slider
//     let preBtn = document.querySelector(" .slider .--prev");
//     let nextBtn = document.querySelector(".slider .--next");
//     let sliders = document.querySelectorAll(".slider__item");
//     let sliderCurrent = 0;
//     let sliderNumber = document.querySelector(".slider .number");
//     let sliderDots = document.querySelectorAll(".slider .dots li");

//     function preSlider() {
//         if (sliderCurrent > 0) {
//             sliders[sliderCurrent].classList.remove("active");
//             sliders[sliderCurrent - 1].classList.add("active");
//             sliderDots[sliderCurrent].classList.remove("active");
//             sliderCurrent--;
//             sliderDots[sliderCurrent].classList.add("active");
//         }
//         sliderNumber.innerText = (sliderCurrent + 1)
//             .toString()
//             .padStart(2, "0");
//     }
//     preBtn.addEventListener("click", preSlider);

//     function nextSlider() {
//         if (sliderCurrent < sliders.length - 1) {
//             sliders[sliderCurrent].classList.remove("active");
//             sliders[sliderCurrent + 1].classList.add("active");
//             sliderDots[sliderCurrent].classList.remove("active");
//             sliderCurrent++;
//             sliderDots[sliderCurrent].classList.add("active");
//         }
//         sliderNumber.innerText = (sliderCurrent + 1)
//             .toString()
//             .padStart(2, "0");
//     }
//     nextBtn.addEventListener("click", nextSlider);

//     function dotclick() {
//         slidersDots[sliderCurrent].classList.remove("active");
//     }
//     sliderDots.forEach((e, i) => {
//         e.addEventListener("click", dotclick);
//     });
//     // // slider
//     // let nextBtn = document.querySelector(".slider .--next");
//     // let preBtn = document.querySelector(".slider .--prev");
//     // let sliderItems = document.querySelectorAll(".slider__item");
//     // let sliderCurrent = 0;
//     // let sliderNumber = document.querySelector(".slider .number");
//     // let sliderDots = document.querySelectorAll(".slider .dots li");
//     // preBtn.addEventListener("click", function () {
//     //     if (sliderCurrent > 0) {
//     //         sliderItems[sliderCurrent].classList.remove("active");
//     //         sliderItems[sliderCurrent - 1].classList.add("active");
//     //         sliderDots[sliderCurrent].classList.remove("active");

//     //         sliderCurrent--;
//     //         sliderDots[sliderCurrent].classList.add("active");
//     //     }
//     //     sliderNumber.innerText = (sliderCurrent + 1)
//     //         .toString()
//     //         .padStart(2, "0");
//     // });
//     // nextBtn.addEventListener("click", function () {
//     //     if (sliderCurrent < sliderItems.length - 1) {
//     //         sliderItems[sliderCurrent].classList.remove("active");
//     //         sliderItems[sliderCurrent + 1].classList.add("active");
//     //         sliderDots[sliderCurrent].classList.remove("active");

//     //         sliderCurrent++;
//     //         sliderDots[sliderCurrent].classList.add("active");
//     //     }
//     //     sliderNumber.innerText = (sliderCurrent + 1)
//     //         .toString()
//     //         .padStart(2, "0");
//     // });

//     //scroll to section
//     $("nav ul li a").on("click", function (e) {
//         let hashA = $(this).attr("href");
//         // console.log(hashA);
//         if (hashA !== " ") {
//             e.preventDefault();
//             $("html, body").animate(
//                 {
//                     scrollTop: $(hashA).offset().top,
//                 },
//                 400
//             );
//             $(this)
//                 .addClass("active")
//                 .parents()
//                 .siblings()
//                 .find("a")
//                 .removeClass("active");
//         }
//         // if ($(this).hash !== " ") {
//         //     e.preventDefault();
//         //     const hash = $(this).hash;
//         //     console.log(hash);
//         //     $("html, body").animate(
//         //         {
//         //             scrollTop: $(hash).offset().top,
//         //         },
//         //         400
//         //     );
//         // }

//         //SCROLL TO SECTION ACTIVE MENU
//         let isMenu = document.querySelectorAll(".main__ul li a");
//         let sections = [];
//         isMenu.forEach(function (e, index) {
//             let nameSection = e.getAttribute("href").replace("#", "");
//             let section = document.querySelector(".homepage > ." + nameSection);
//             sections.push(section);
//         });
//         window.addEventListener("scroll", function () {
//             let posScroll = window.pageYOffset;
//             sections.forEach(function (section, index) {
//                 if (
//                     posScroll >
//                     section.offsetTop -
//                         document.querySelector("header").offsetHeight
//                 ) {
//                     isMenu.forEach(function (item) {
//                         item.classList.remove("active");
//                     });
//                     isMenu[index].classList.add("active");
//                 }
//             });
//         });
//     });

//     function hideMenuMobile() {
//         let menuMob = $(".nav");
//         console.log("menuMob");
//         if (menuMob.hasClass("active")) {
//             menuMob.removeClass("active");
//         }
//     }
//     $(window).resize(function () {
//         var windowWidth = $(window).width();
//         console.log(windowWidth);
//         if (windowWidth > 767) {
//             console.log("ok11");
//             hideMenuMobile();
//         }
//     });

//     // Ẩn
// })();

// // slider 1
// //slider 2 active
// //slider 3

// // function reset(){
// //     for(let i = 0; i < sliderItems.length; i++) {
// //         sliderItems[i].style.display = 'none'
// //     }
// // }
// // function startSlide(){
// //     reset()
// //     sliderItems[0].style.display = "block";
// // }
// // function slideLeft(){
// //     reset()
// //     sliderItems[sliderCurrent - 1].style.display = "block";
// //     sliderCurrent--;
// // }
// // preBtn.addEventListener('click', function(){
// //     if(sliderCurrent === 0){
// //         sliderCurrent = sliderItems.length;
// //     }
// //     slideLeft();
// // })

// // function slideRight() {
// //     reset();
// //     sliderItems[sliderCurrent + 1].style.display = "block";
// //     sliderCurrent++;
// // }
// // nextBtn.addEventListener("click", function () {
// //     if (sliderCurrent === sliderItems.length - 1) {
// //         sliderCurrent = -1;
// //     }
// //     slideRight();
// // });
// // startSlide()
