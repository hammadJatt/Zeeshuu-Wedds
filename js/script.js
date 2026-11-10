"use strict";

/* =========================================================

   CONFIGURATION

========================================================= */

const WEDDING_DATE = new Date(

    "December 19, 2026 20:00:00"

);

/*

    CHANGE THIS NUMBER IF YOU WANT A DIFFERENT DATE.

    Example:

    const WEDDING_DATE = new Date(

        "December 25, 2026 20:00:00"

    );

*/

/* =========================================================

   DOM

========================================================= */

const loader =

    document.getElementById("loader");

const music =

    document.getElementById("weddingMusic");

const musicToggle =

    document.getElementById("musicToggle");

const openInvitation =

    document.getElementById("openInvitation");

const menuToggle =

    document.getElementById("menuToggle");

const navLinks =

    document.getElementById("navLinks");


/* =========================================================

   PAGE LOADER

========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1000);

});

document.body.classList.add("no-scroll");

/* =========================================================

   OPEN INVITATION

========================================================= */

openInvitation.addEventListener(

    "click",

    () => {

        document

            .getElementById("invitation")

            .scrollIntoView({

                behavior: "smooth"

            });

        /*

            Browsers often block automatic

            audio playback.

            This click gives us a chance

            to start the music.

        */

        music.play()

            .then(() => {

                musicToggle.classList.add(

                    "playing"

                );

            })

            .catch(() => {

                console.log(

                    "Music playback requires user interaction."

                );

            });

    }

);

/* =========================================================

   MOBILE MENU

========================================================= */

menuToggle.addEventListener(

    "click",

    () => {

        navLinks.classList.toggle(

            "active"

        );

    }

);

/*

    Close mobile navigation after

    clicking a link.

*/

document

    .querySelectorAll(".nav-links a")

    .forEach(link => {

        link.addEventListener(

            "click",

            () => {

                navLinks.classList.remove(

                    "active"

                );

            }

        );

    });

/* =========================================================

   MUSIC

========================================================= */

musicToggle.addEventListener(

    "click",

    () => {

        if (music.paused) {

            music.play()

                .then(() => {

                    musicToggle.classList.add(

                        "playing"

                    );

                })

                .catch(error => {

                    console.log(error);

                });

        } else {

            music.pause();

            musicToggle.classList.remove(

                "playing"

            );

        }

    }

);

/* =========================================================

   COUNTDOWN

========================================================= */

function updateCountdown() {

    const now = new Date();

    const difference =

        WEDDING_DATE.getTime() -

        now.getTime();

    if (difference <= 0) {

        document.getElementById("days")

            .textContent = "00";

        document.getElementById("hours")

            .textContent = "00";

        document.getElementById("minutes")

            .textContent = "00";

        document.getElementById("seconds")

            .textContent = "00";

        return;

    }

    const days =

        Math.floor(

            difference /

            (1000 * 60 * 60 * 24)

        );

    const hours =

        Math.floor(

            (difference /

                (1000 * 60 * 60)) %

                24

        );

    const minutes =

        Math.floor(

            (difference /

                (1000 * 60)) %

                60

        );

    const seconds =

        Math.floor(

            (difference /

                1000) %

                60

        );

    document.getElementById("days")

        .textContent =

        String(days).padStart(2, "0");

    document.getElementById("hours")

        .textContent =

        String(hours).padStart(2, "0");

    document.getElementById("minutes")

        .textContent =

        String(minutes).padStart(2, "0");

    document.getElementById("seconds")

        .textContent =

        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(

    updateCountdown,

    1000

);

/* =========================================================

   SCROLL REVEAL

========================================================= */

const revealElements =

    document.querySelectorAll(

        ".reveal"

    );

const revealObserver =

    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (

                    entry.isIntersecting

                ) {

                    entry.target.classList.add(

                        "visible"

                    );

                    revealObserver.unobserve(

                        entry.target

                    );

                }

            });

        },

        {

            threshold: 0.12

        }

    );

revealElements.forEach(

    element => {

        revealObserver.observe(

            element

        );

    }

);

/* =========================================================

   SCRATCH CARD

========================================================= */

const scratchCanvas =

    document.getElementById(

        "scratchCanvas"

    );

const scratchCard =

    document.getElementById(

        "scratchCard"

    );

const scratchContext =

    scratchCanvas.getContext(

        "2d",

        {

            willReadFrequently: true

        }

    );

let isScratching = false;

let scratchPercentage = 0;

/*

    Resize canvas according to

    actual displayed size.

*/

function resizeScratchCanvas() {

    const rect =

        scratchCard.getBoundingClientRect();

    const devicePixelRatio =

        window.devicePixelRatio || 1;

    scratchCanvas.width =

        rect.width *

        devicePixelRatio;

    scratchCanvas.height =

        rect.height *

        devicePixelRatio;

    scratchCanvas.style.width =

        rect.width + "px";

    scratchCanvas.style.height =

        rect.height + "px";

    scratchContext.setTransform(

        devicePixelRatio,

        0,

        0,

        devicePixelRatio,

        0,

        0

    );

    /*

        Scratch overlay

    */

    const gradient =

        scratchContext.createLinearGradient(

            0,

            0,

            rect.width,

            rect.height

        );

    gradient.addColorStop(

        0,

        "#d5d5d5"

    );

    gradient.addColorStop(

        0.5,

        "#eeeeee"

    );

    gradient.addColorStop(

        1,

        "#bdbdbd"

    );

    scratchContext.fillStyle =

        gradient;

    scratchContext.fillRect(

        0,

        0,

        rect.width,

        rect.height

    );

    /*

        Overlay text

    */

    scratchContext.fillStyle =

        "rgba(80,80,80,0.65)";

    scratchContext.textAlign =

        "center";

    scratchContext.textBaseline =

        "middle";

    scratchContext.font =

        "600 11px Montserrat, sans-serif";

    scratchContext.fillText(

        "SCRATCH TO REVEAL",

        rect.width / 2,

        rect.height / 2

    );

}

resizeScratchCanvas();

window.addEventListener(

    "resize",

    resizeScratchCanvas

);

/*

    Get mouse/touch position

*/

function getScratchPosition(event) {

    const rect =

        scratchCanvas.getBoundingClientRect();

    let clientX;

    let clientY;

    if (

        event.touches &&

        event.touches.length > 0

    ) {

        clientX =

            event.touches[0].clientX;

        clientY =

            event.touches[0].clientY;

    } else {

        clientX =

            event.clientX;

        clientY =

            event.clientY;

    }

    return {

        x: clientX - rect.left,

        y: clientY - rect.top

    };

}

/*

    Scratch

*/

function scratch(event) {

    if (!isScratching) {

        return;

    }

    event.preventDefault();

    const position =

        getScratchPosition(event);

    scratchContext.globalCompositeOperation =

        "destination-out";

    scratchContext.beginPath();

    scratchContext.arc(

        position.x,

        position.y,

        28,

        0,

        Math.PI * 2

    );

    scratchContext.fill();

    calculateScratchPercentage();

}

/*

    Start scratching

*/

function startScratch(event) {

    isScratching = true;

    scratch(event);

}

/*

    Stop scratching

*/

function stopScratch() {

    isScratching = false;

}

/*

    Mouse events

*/

scratchCanvas.addEventListener(

    "mousedown",

    startScratch

);

scratchCanvas.addEventListener(

    "mousemove",

    scratch

);

window.addEventListener(

    "mouseup",

    stopScratch

);

/*

    Touch events

*/

scratchCanvas.addEventListener(

    "touchstart",

    startScratch,

    {

        passive: false

    }

);

scratchCanvas.addEventListener(

    "touchmove",

    scratch,

    {

        passive: false

    }

);

scratchCanvas.addEventListener(

    "touchend",

    stopScratch

);

/*

    Calculate how much

    of the card has been scratched.

*/

function calculateScratchPercentage() {

    /*

        Don't calculate on every

        tiny movement.

    */

    if (

        scratchPercentage > 70

    ) {

        return;

    }

    const pixels =

        scratchContext.getImageData(

            0,

            0,

            scratchCanvas.width,

            scratchCanvas.height

        ).data;

    let transparentPixels = 0;

    /*

        Check every 16th pixel

        for better performance.

    */

    for (

        let i = 3;

        i < pixels.length;

        i += 16

    ) {

        if (pixels[i] === 0) {

            transparentPixels++;

        }

    }

    const totalPixels =

        pixels.length / 16;

    scratchPercentage =

        (

            transparentPixels /

            totalPixels

        ) * 100;

    /*

        Automatically reveal

        when 55% is scratched.

    */

    if (

        scratchPercentage >= 55

    ) {

        revealScratchCard();

    }

}

/*

    Reveal complete card

*/

function revealScratchCard() {

    scratchCanvas.style.transition =

        "opacity 0.6s ease";

    scratchCanvas.style.opacity =

        "0";

    scratchCanvas.style.pointerEvents =

        "none";

}

/* =========================================================

   GALLERY

========================================================= */

const galleryModal =

    document.getElementById(

        "galleryModal"

    );

const modalImage =

    document.getElementById(

        "modalImage"

    );

const modalClose =

    document.getElementById(

        "modalClose"

    );

document

    .querySelectorAll(".gallery-item")

    .forEach(item => {

        item.addEventListener(

            "click",

            () => {

                const image =

                    item.dataset.image;

                modalImage.src =

                    image;

                galleryModal?.classList.add(

                    "active"

                );

                document.body.classList.add(

                    "no-scroll"

                );

            }

        );

    });

function closeGallery() {

    galleryModal?.classList.remove(

        "active"

    );

    document.body.classList.remove(

        "no-scroll"

    );

}

modalClose?.addEventListener(

    "click",

    closeGallery

);

galleryModal?.addEventListener(

    "click",

    event => {

        if (

            event.target ===

            galleryModal

        ) {

            closeGallery();

        }

    }

);

/*

    ESC closes gallery

*/

document.addEventListener(

    "keydown",

    event => {

        if (

            event.key === "Escape"

        ) {

            closeGallery();

            closeSuccessModal();

        }

    }

);

/* =========================================================

   RSVP

========================================================= */

const rsvpForm =

    document.getElementById(

        "rsvpForm"

    );

const successModal =

    document.getElementById(

        "successModal"

    );

const successClose =

    document.getElementById(

        "successClose"

    );

const successButton =

    document.getElementById(

        "successButton"

    );

rsvpForm?.addEventListener(

    "submit",

    event => {

        event.preventDefault();

        const name =

            document.getElementById(

                "guestName"

            ).value.trim();

        const guests =

            document.getElementById(

                "guestCount"

            ).value;

        const attendance =

            document.querySelector(

                'input[name="attendance"]:checked'

            ).value;

        if (!name) {

            alert(

                "Please enter your name."

            );

            return;

        }

        console.log(

            "RSVP:",

            {

                name,

                guests,

                attendance

            }

        );

        /*

            For now this is frontend only.

            Later you can connect this

            to:

            - Google Sheets

            - Firebase

            - PHP/MySQL

            - Node/Express

            - WhatsApp

        */

        successModal?.classList.add(

            "active"

        );

        document.body.classList.add(

            "no-scroll"

        );

        rsvpForm.reset();

    }

);

/* =========================================================

   CLOSE SUCCESS MODAL

========================================================= */

function closeSuccessModal() {

    successModal?.classList.remove(

        "active"

    );

    document.body.classList.remove(

        "no-scroll"

    );

}

successClose?.addEventListener(

    "click",

    closeSuccessModal

);

successButton?.addEventListener(

    "click",

    closeSuccessModal

);

/* =========================================================

   PREVENT IMAGE DRAGGING

========================================================= */

document

    .querySelectorAll("img")

    .forEach(img => {

        img.addEventListener(

            "dragstart",

            event => {

                event.preventDefault();

            }

        );

    });

/* =========================================================

   ACTIVE NAV LINK

========================================================= */

const sections =

    document.querySelectorAll(

        "section[id]"

    );

const navigationLinks =

    document.querySelectorAll(

        ".nav-links a"

    );

window.addEventListener(

    "scroll",

    () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =

                section.offsetTop - 120;

            const sectionHeight =

                section.offsetHeight;

            if (

                window.scrollY >=

                sectionTop

                &&

                window.scrollY <

                sectionTop +

                sectionHeight

            ) {

                currentSection =

                    section.id;

            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove(

                "active"

            );

            if (

                link.getAttribute("href") ===

                "#" + currentSection

            ) {

                link.classList.add(

                    "active"

                );

            }

        });

    }

);

const intro = document.getElementById("intro");

const openButton = document.getElementById("openButton");

let hasOpened = false;

openButton.addEventListener("click", () => {

  if (hasOpened) return;

  hasOpened = true;

  // Open the top flap and lift the invitation card.

  intro.classList.add("opening");

  openButton.setAttribute("aria-label", "Invitation opened");

  // Let the opening animation play, then fade away the whole intro.

  window.setTimeout(() => {

    intro.classList.add("exit");

  }, 2500);

  // Remove the intro from keyboard and screen-reader navigation.

  window.setTimeout(() => {

    intro.setAttribute("aria-hidden", "true");
    intro.style.display = "none";
    document.body.classList.remove("no-scroll");
    document.body.style.overflowY = "auto";

  }, 3500);

});

// Keep envelope visible after loader and support reduced-motion users.
window.addEventListener("load", () => {
  window.setTimeout(() => document.getElementById("loader")?.classList.add("hidden"), 500);
});
