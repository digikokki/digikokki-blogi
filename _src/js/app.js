import '../scss/main.scss';
import Vue from 'vue'
import axios from 'axios';
import YoutubeVideoList from '../YoutubeVideoList.vue';
import VuePaginate from 'vue-paginate'
import SocialSharing from 'vue-social-sharing';
import prism from 'prismjs';

window.axios = axios;
window.Vue = Vue;

console.log('Hello Vue and Webpack and Loader web server');

var desktopOnly = window.matchMedia( "(min-width: 1024px)" );

// Add a listen event
desktopOnly.addListener(mobileToDesktop);
// Function to do something with the media query
function mobileToDesktop(desktopOnly) {
  if (desktopOnly.matches) {
     document.getElementById('pageNavContent').classList.remove('open');
  } else {
  }
}
// On load
mobileToDesktop(desktopOnly);


Vue.use(VuePaginate);
Vue.use(SocialSharing);

new Vue({
  el: '#app',
  data: {}
})

var toggleMobileNav = new Vue({
  el: '#pageNavContainer',
  data: {
      navOpen: false
  },
  methods: {
    toggleClass: function(data) {
         data.navOpen = !this.navOpen;
    }
  }
});

new Vue({
  el: '#youtubelist',
  render: h => h(YoutubeVideoList)
});


var elements = document.querySelectorAll('pre');

if(elements !== null)
Array.prototype.forEach.call(elements, function(el, i){
    el.innerHTML = '<code class="' + el.className + '">' +  el.innerHTML + '</code>';
});
