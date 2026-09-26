/* ==========================================================================
   GOSPEL CHURCH OF CHICAGO — SITE SETTINGS

   This is the ONE file to edit for information that appears on every page:
   service times, address, phone, email, links, and the menu.

   HOW TO EDIT
   1. Change only the text between the "quotation marks".
   2. Keep the quotation marks and the comma at the end of each line.
   3. Save the file. Every page updates automatically.

   Anything written like [this] is a placeholder waiting for real information.
   ========================================================================== */

var SITE = {

  /* --- The basics ------------------------------------------------------ */
  churchName:     "Gospel Church of Chicago",
  churchNameKo:   "시카고 복음 교회",
  shortName:      "GCC",
  tagline:        "A warm, Christ-centered church in Des Plaines, Illinois.",

  /* --- Sunday worship -------------------------------------------------- */
  serviceTime:    "10:00 AM",
  serviceTimeKo:  "오전 10시",

  /* --- Where to find us ------------------------------------------------ */
  addressLine1:   "1250 E. Golf Road",
  addressLine2:   "Des Plaines, IL 60016",
  phone:          "(847) 803-9191",
  email:          "onenesschurch1250@gmail.com",

  /* --- Links ----------------------------------------------------------- */

  // Sermons page: paste the ID of the church's YouTube sermon PLAYLIST.
  // In a playlist URL it is the part after "list=".
  // Example: youtube.com/playlist?list=PLabc123  ->  "PLabc123"
  // New sermons added to that playlist appear on the website automatically.
  youtubePlaylistId: "",
  youtubeChannelUrl: "https://www.youtube.com/@[channel-name]",

  // Give page: the church's existing giving platform. The website never
  // handles money itself -- this button simply sends people there.
  givingUrl:      "",

  // Social media. Leave a line empty ("") to hide that icon.
  facebookUrl:    "",
  instagramUrl:   "",

  // Contact form. Paste a form address from a free service such as
  // Formspree (formspree.io). While this is empty, the contact page shows
  // an email address instead of a form, so nothing is ever broken.
  contactFormUrl: "",

  /* --- Menu ------------------------------------------------------------
     The links across the top of every page. To remove a page, delete its
     line. To add one, copy a line and change both parts.               */
  nav: [
    { label: "Home",       href: "index.html"      },
    { label: "About",      href: "about.html"      },
    { label: "Visit",      href: "visit.html"      },
    { label: "Ministries", href: "ministries.html" },
    { label: "Missions",   href: "missions.html"   },
    { label: "Sermons",    href: "sermons.html"    },
    { label: "Events",     href: "events.html"     }
  ]

};

/* ==========================================================================
   Below this line is the code that puts the settings above onto each page.
   There is nothing here that needs editing.
   ========================================================================== */

(function () {
  "use strict";

  // Pages inside /ko/ have to reach back up one folder for shared files.
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var HERE = document.body ? document.body.getAttribute("data-page") : "";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Wraps [placeholder text] so it is easy to spot before launch.
  function fill(value) {
    var text = esc(value);
    return /^\[.*\]$/.test(String(value).trim())
      ? '<span class="tbd">' + text + "</span>"
      : text;
  }

  function digitsOnly(value) {
    return String(value).replace(/[^\d+]/g, "");
  }

  SITE.fullAddress = SITE.addressLine1 + ", " + SITE.addressLine2;
  SITE.mapEmbedUrl = "https://www.google.com/maps?q=" +
    encodeURIComponent(SITE.fullAddress) + "&output=embed";
  SITE.mapLinkUrl = "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(SITE.fullAddress);

  /* --- Header ---------------------------------------------------------- */

  function buildHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;

    var links = SITE.nav.map(function (item) {
      var current = item.href === HERE;
      return '<li><a href="' + ROOT + esc(item.href) + '"' +
        (current ? ' aria-current="page"' : "") + ">" + esc(item.label) + "</a></li>";
    }).join("");

    mount.innerHTML =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<div class="header__inner container">' +
        '<a class="wordmark" href="' + ROOT + 'index.html">' +
          '<span class="wordmark__mark">' + esc(SITE.shortName) + "</span>" +
          '<span class="wordmark__name">' + esc(SITE.churchName) + "</span>" +
        "</a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" ' +
          'aria-controls="site-nav"><span class="nav-toggle__bars" aria-hidden="true">' +
          "</span>Menu</button>" +
        '<nav class="nav" id="site-nav" aria-label="Main">' +
          "<ul class=\"nav__list\">" + links + "</ul>" +
          '<div class="nav__actions">' +
            '<a class="btn btn--sm" href="' + ROOT + 'give.html">Give</a>' +
            '<a class="nav__lang" href="' + ROOT + 'ko/index.html" lang="ko">한국어</a>' +
          "</div>" +
        "</nav>" +
      "</div>";

    var toggle = mount.querySelector(".nav-toggle");
    var nav = mount.querySelector(".nav");
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  /* --- Footer ---------------------------------------------------------- */

  function buildFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;

    var social = "";
    if (SITE.facebookUrl) {
      social += '<a href="' + esc(SITE.facebookUrl) + '">Facebook</a>';
    }
    if (SITE.instagramUrl) {
      social += '<a href="' + esc(SITE.instagramUrl) + '">Instagram</a>';
    }
    if (SITE.youtubeChannelUrl) {
      social += '<a href="' + esc(SITE.youtubeChannelUrl) + '">YouTube</a>';
    }

    var pages = SITE.nav.concat([
      { label: "Give",    href: "give.html"    },
      { label: "Contact", href: "contact.html" }
    ]).map(function (item) {
      return '<li><a href="' + ROOT + esc(item.href) + '">' + esc(item.label) + "</a></li>";
    }).join("");

    mount.innerHTML =
      '<div class="container footer__grid">' +
        '<div class="footer__col footer__col--brand">' +
          '<p class="footer__name">' + esc(SITE.churchName) + "</p>" +
          '<p class="footer__tagline">' + esc(SITE.tagline) + "</p>" +
        "</div>" +
        '<div class="footer__col">' +
          "<h2>Sundays</h2>" +
          "<p>" + fill(SITE.serviceTime) + "</p>" +
          '<p><a href="' + ROOT + 'visit.html">Plan your visit</a></p>' +
        "</div>" +
        '<div class="footer__col">' +
          "<h2>Find us</h2>" +
          '<p><a href="' + esc(SITE.mapLinkUrl) + '">' +
            fill(SITE.addressLine1) + "<br>" + fill(SITE.addressLine2) + "</a></p>" +
          '<p><a href="tel:' + esc(digitsOnly(SITE.phone)) + '">' + fill(SITE.phone) + "</a><br>" +
            '<a href="mailto:' + esc(SITE.email) + '">' + fill(SITE.email) + "</a></p>" +
        "</div>" +
        '<div class="footer__col">' +
          "<h2>More</h2>" +
          '<ul class="footer__links">' + pages + "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="container footer__bar">' +
        "<p>&copy; " + new Date().getFullYear() + " " + esc(SITE.churchName) + "</p>" +
        '<p class="footer__social">' + social + "</p>" +
        '<p><a href="' + ROOT + 'ko/index.html" lang="ko">한국어 안내</a></p>' +
      "</div>";
  }

  /* --- Settings placed into the page ------------------------------------
     Any element written as <span data-site="phone"></span> is filled in
     with the matching setting from the list at the top of this file.    */

  function fillPlaceholders() {
    var nodes = document.querySelectorAll("[data-site]");
    Array.prototype.forEach.call(nodes, function (node) {
      var value = SITE[node.getAttribute("data-site")];
      if (value) node.innerHTML = fill(value);
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-site-href]"), function (node) {
      var key = node.getAttribute("data-site-href");
      var value = SITE[key];
      if (value) {
        node.setAttribute("href", key === "email" ? "mailto:" + value :
          key === "phone" ? "tel:" + digitsOnly(value) : value);
      } else {
        node.classList.add("is-unset");
      }
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-site-src]"), function (node) {
      var value = SITE[node.getAttribute("data-site-src")];
      if (value) node.setAttribute("src", value);
    });
  }

  /* --- Sermon playlist -------------------------------------------------- */

  function buildSermons() {
    var mount = document.getElementById("sermon-player");
    if (!mount) return;

    if (!SITE.youtubePlaylistId) {
      mount.innerHTML =
        '<div class="notice">' +
          "<p><strong>Sermons will appear here.</strong> Add the church's YouTube " +
          "playlist ID to <code>assets/js/site.js</code> and every new sermon posted " +
          "to that playlist shows up on this page automatically.</p>" +
        "</div>";
      return;
    }

    mount.innerHTML =
      '<div class="video">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=' +
          encodeURIComponent(SITE.youtubePlaylistId) + '" title="Sermons from ' +
          esc(SITE.churchName) + '" loading="lazy" allowfullscreen ' +
          'allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture">' +
        "</iframe>" +
      "</div>";
  }

  /* --- Giving button ---------------------------------------------------- */

  function buildGiving() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-give-button]"), function (node) {
      if (SITE.givingUrl) {
        node.innerHTML = '<a class="btn btn--lg" href="' + esc(SITE.givingUrl) + '">Give online</a>';
      } else {
        node.innerHTML =
          '<p class="notice notice--inline">Add the church’s giving link to ' +
          "<code>assets/js/site.js</code> to turn on this button.</p>";
      }
    });
  }

  /* --- Contact form ----------------------------------------------------- */

  function buildContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    if (!SITE.contactFormUrl) {
      form.outerHTML =
        '<div class="notice">' +
          "<p><strong>Prefer to write to us?</strong> Email " +
          '<a href="mailto:' + esc(SITE.email) + '">' + fill(SITE.email) + "</a> " +
          "and someone will reply within a few days.</p>" +
        "</div>";
      return;
    }
    form.setAttribute("action", SITE.contactFormUrl);
  }

  /* --- Map -------------------------------------------------------------- */

  function buildMap() {
    var mount = document.getElementById("site-map");
    if (!mount) return;
    mount.innerHTML =
      '<iframe src="' + esc(SITE.mapEmbedUrl) + '" title="Map to ' +
      esc(SITE.churchName) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade">' +
      "</iframe>";
  }

  function start() {
    buildHeader();
    buildFooter();
    fillPlaceholders();
    buildSermons();
    buildGiving();
    buildContactForm();
    buildMap();
    if (window.GCC_renderEvents) window.GCC_renderEvents(ROOT);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
