function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

const burger = document.getElementById("burger")
const burgerWrap = document.querySelector(".burger__wrap")
const c = document.getElementById("links")

burger.addEventListener("click", () => {
    burgerWrap.classList.toggle("_active")
    links.classList.toggle("_active")
    document.body.classList.toggle("_lock")
})

const buttons = document.querySelectorAll("button")
for (let index = 0; index < buttons.length; index++) {
    buttons[index].addEventListener("click", () => {
        buttons[index].classList.toggle("_tap")

        setTimeout(() => {
            buttons[index].classList.toggle("_tap")
        }, [100])
    })
}

const selectButtons = document.querySelectorAll(".get-room-select-list-block-element__button")

for (let index = 0; index < selectButtons.length; index++) {
    selectButtons[index].addEventListener("click", () => {
        document.getElementById(selectButtons[index].dataset.menuid).classList.toggle("_active")
        selectButtons[index].classList.toggle("_active")
    })
}

const swiper = new Swiper('.swiper', {
    loop: true,

    simulateTouch: true,
    grabCursor: true,
    centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
});

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

const rooms = document.querySelector(".rooms")
const getRoom = document.querySelector(".get-room")
const footer = document.querySelector(".footer")

document.getElementById(rooms.dataset.link).addEventListener("click", () => {
    window.scrollTo({
        top: offset(rooms).top - 100,
        behavior: "smooth"
    })

    burgerWrap.classList.remove("_active")
    links.classList.remove("_active")
    document.body.classList.remove("_lock")
})
document.getElementById(getRoom.dataset.link).addEventListener("click", () => {
    window.scrollTo({
        top: offset(getRoom).top - 100,
        behavior: "smooth"
    })

    burgerWrap.classList.remove("_active")
    links.classList.remove("_active")
    document.body.classList.remove("_lock")
})
document.getElementById(footer.dataset.link).addEventListener("click", () => {
    window.scrollTo({
        top: offset(footer).top - 200,
        behavior: "smooth"
    })

    burgerWrap.classList.remove("_active")
    links.classList.remove("_active")
    document.body.classList.remove("_lock")
})

window.addEventListener("scroll", () => {
    if (scrollY > offset(rooms).top - 200 && scrollY < offset(rooms).top - 200 + rooms.clientHeight) {
        document.getElementById(rooms.dataset.link).classList.add("_active")
    }
    else {
        document.getElementById(rooms.dataset.link).classList.remove("_active")
    }

    if (scrollY > offset(getRoom).top - 200 && scrollY < offset(getRoom).top - 200 + getRoom.clientHeight) {
        document.getElementById(getRoom.dataset.link).classList.add("_active")
    }
    else {
        document.getElementById(getRoom.dataset.link).classList.remove("_active")
    }

    if (scrollY > offset(footer).top - 400 && scrollY < offset(footer).top - 200 + footer.clientHeight) {
        document.getElementById(footer.dataset.link).classList.add("_active")
    }
    else {
        document.getElementById(footer.dataset.link).classList.remove("_active")
    }
})



// const navLinks = document.querySelectorAll(".navigation__link[data-goto]")
// if (navLinks.length > 0) {
//     navLinks.forEach(link => {
//         link.addEventListener("click", (event) => {

//             const navLink = event.target
//             if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
//                 const gotoBlock = document.querySelector(navLink.dataset.goto)
//                 const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight

//                 if (burger.classList.contains("_active")) {
//                     document.body.classList.remove("_lock")
//                     navbar.classList.remove("_active")
//                     burger.classList.remove("_active")
//                 }

//                 window.scrollTo({
//                     top: gotoBlockValue,
//                     behavior: "smooth"
//                 })
//                 event.preventDefault()
//             }
//         })
//     })
// }

// const links = document.querySelectorAll(".navigation__link")

// links.forEach(item => {
//     item.addEventListener("click", (event) => {
//         links.forEach(link => {
//             link.classList.remove("_active")
//         })
//         event.target.classList.add("_active")
//     })
// })

function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // ???????????? ????????????????
    this.??bjects = [];
    this.daClassname = "_dynamic_adapt_";
    // ???????????? DOM-??????????????????
    this.nodes = document.querySelectorAll("[data-da]");

    // ???????????????????? ??bjects ????????????????
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const ??bject = {};
        ??bject.element = node;
        ??bject.parent = node.parentNode;
        ??bject.destination = document.querySelector(dataArray[0].trim());
        ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        ??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
        ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
        this.??bjects.push(??bject);
    }

    this.arraySort(this.??bjects);

    // ???????????? ???????????????????? ??????????-????????????????
    this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // ?????????????????????? ?????????????????? ???? ??????????-????????????
    // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // ???????????? ???????????????? ?? ???????????????????? ????????????????????????
        const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, ??bjectsFilter);
        });
        this.mediaHandler(matchMedia, ??bjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < ??bjects.length; i++) {
            const ??bject = ??bjects[i];
            ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
            this.moveTo(??bject.place, ??bject.element, ??bject.destination);
        }
    } else {
        for (let i = 0; i < ??bjects.length; i++) {
            const ??bject = ??bjects[i];
            if (??bject.element.classList.contains(this.daClassname)) {
                this.moveBack(??bject.parent, ??bject.element, ??bject.index);
            }
        }
    }
};

// ?????????????? ??????????????????????
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();