console.log('it works!');

var desktopOnly = window.matchMedia( "(min-width: 1024px)" );

// Add a listen event
desktopOnly.addListener(mobileToDesktop);

// Function to do something with the media query
function mobileToDesktop(desktopOnly) {
    if (desktopOnly.matches) {
       getElementById('pageNavContent').removeClass('open');
    }
  // On load
  mobileToDesktop(desktopOnly);
};

var app = new Vue({
  el: '#siteWrapper',
  delimiters: ['${', '}'],
  methods: {
    toggle: function() {
        console.log('Wiip!');
    }
  },
})
