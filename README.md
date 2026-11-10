# Wedding Invitation Website

A responsive interactive wedding invitation website built with:

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- Canvas Scratch Card
- CSS animations
- JavaScript countdown
- Responsive mobile design

## Folder Structure

wedding-invitation/

├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    └── music/


## Setup

1. Download/copy the project.
2. Add wedding images inside:

assets/images/

3. Add wedding music:

assets/music/wedding-music.mp3

4. Open index.html in your browser.


## Change Wedding Details

Open:

index.html

Change:

- Groom name
- Bride name
- Dates
- Venues
- Event names
- Event times
- Google Maps links
- Family names
- Story
- Gallery images


## Change Countdown

Open:

js/script.js

Find:

const WEDDING_DATE = new Date(
    "December 16, 2026 19:00:00"
);

Change it to your wedding date.


## Change Images

Replace:

groom.jpg
bride.jpg
hero.jpg
venue.jpg
gallery-1.jpg
gallery-2.jpg
gallery-3.jpg
gallery-4.jpg
gallery-5.jpg
gallery-6.jpg


Keep the same filenames or update
the paths in index.html.


## Free Hosting

The website can be hosted for free using:

GitHub Pages

No backend is required for the basic invitation.


## RSVP

The current RSVP system is frontend-only.

For real RSVP storage you can connect:

- Google Sheets
- Firebase
- PHP/MySQL
- Node.js/Express