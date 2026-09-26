/* ==========================================================================
   EVENTS

   Add an event by copying one block between { } and changing the details.
   Keep the commas exactly where they are.

   Events that have passed disappear from the website on their own, so
   nothing needs to be deleted. The order does not matter -- the website
   always shows the soonest event first.

   date     Always year-month-day, e.g. "2026-12-24"
   time     Anything you like, e.g. "6:00 PM" (leave "" to hide)
   image    A photo in assets/img/ (leave "" for a plain card)
   link     A sign-up or information page (leave "" to hide the button)
   ========================================================================== */

var EVENTS = [

  {
    title:       "Sunday Worship",
    date:        "2026-12-06",
    time:        "10:00 AM",
    location:    "Main Sanctuary",
    description: "Join us for worship, teaching from Scripture, and coffee together afterward. Everyone is welcome.",
    image:       "assets/img/placeholder-worship.svg",
    link:        "",
    linkLabel:   ""
  },

  {
    title:       "Christmas Eve Service",
    date:        "2026-12-24",
    time:        "6:00 PM",
    location:    "Main Sanctuary",
    description: "A candlelight service of carols and readings. Childcare is available for children under five.",
    image:       "assets/img/placeholder-candles.svg",
    link:        "",
    linkLabel:   ""
  },

  {
    title:       "Congregational Lunch",
    date:        "2027-01-10",
    time:        "12:30 PM",
    location:    "Fellowship Hall",
    description: "Lunch together after the service. Bring a dish to share if you are able — there is always plenty.",
    image:       "assets/img/placeholder-fellowship.svg",
    link:        "",
    linkLabel:   "Sign up"
  }

];

/* ==========================================================================
   Below this line is the code that puts the events above onto the page.
   There is nothing here that needs editing.
   ========================================================================== */

window.GCC_renderEvents = function (root) {
  "use strict";

  var mounts = document.querySelectorAll("[data-events]");
  if (!mounts.length) return;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fill(value) {
    var text = esc(value);
    return /^\[.*\]$/.test(String(value).trim())
      ? '<span class="tbd">' + text + "</span>" : text;
  }

  // "2026-12-24" -> a date object at local midnight, so an event stays
  // listed for the whole of its own day regardless of time zone.
  function toDate(value) {
    var parts = String(value).split("-");
    return new Date(+parts[0], (+parts[1] || 1) - 1, +parts[2] || 1);
  }

  var LONG = { weekday: "long", month: "long", day: "numeric" };
  var SHORT_MONTH = { month: "short" };

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var upcoming = EVENTS
    .filter(function (item) { return toDate(item.date) >= today; })
    .sort(function (a, b) { return toDate(a.date) - toDate(b.date); });

  Array.prototype.forEach.call(mounts, function (mount) {
    var limit = parseInt(mount.getAttribute("data-events"), 10);
    var list = isNaN(limit) ? upcoming : upcoming.slice(0, limit);

    if (!list.length) {
      mount.innerHTML =
        '<div class="notice"><p>There are no events on the calendar right now. ' +
        'Please <a href="' + root + 'contact.html">get in touch</a> — we would love to hear from you.</p></div>';
      return;
    }

    mount.innerHTML = '<ul class="cards cards--events">' + list.map(function (item) {
      var when = toDate(item.date);
      var media = item.image
        ? '<img class="card__image" src="' + root + esc(item.image) + '" alt="" loading="lazy">'
        : '<p class="card__date-block"><span>' +
            esc(when.toLocaleDateString("en-US", SHORT_MONTH)) + "</span><strong>" +
            when.getDate() + "</strong></p>";

      return '<li class="card">' + media +
        '<div class="card__body">' +
          '<p class="card__eyebrow"><time datetime="' + esc(item.date) + '">' +
            esc(when.toLocaleDateString("en-US", LONG)) + "</time>" +
            (item.time ? " · " + fill(item.time) : "") + "</p>" +
          "<h3 class=\"card__title\">" + esc(item.title) + "</h3>" +
          (item.location ? '<p class="card__meta">' + esc(item.location) + "</p>" : "") +
          (item.description ? "<p>" + esc(item.description) + "</p>" : "") +
          (item.link
            ? '<p><a class="link-arrow" href="' + esc(item.link) + '">' +
              esc(item.linkLabel || "Learn more") + "</a></p>"
            : "") +
        "</div></li>";
    }).join("") + "</ul>";
  });
};
