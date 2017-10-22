import '../scss/main.scss';
import Vue                from 'vue'
import axios              from 'axios';

import YoutubeVideoList   from '../YoutubeVideoList.vue';
import PageNav            from '../PageNav.vue';
import Demo               from '../demo.vue';

import VuePaginate        from 'vue-paginate'
import SocialSharing      from 'vue-social-sharing';
import prism              from 'prismjs';

window.axios = axios;
window.Vue = Vue;

console.log('Hello Vue and Webpack and Loader web server!');

Vue.use(VuePaginate);
Vue.use(SocialSharing);

new Vue({
  el: '#app',
  data: {}
})


new Vue({
  el: '#youtubelist',
  render: h => h(YoutubeVideoList)
});

new Vue({
  el: '#pageNavContainer',
  render: h => h(PageNav)
});

new Vue({
  el: '#demo',
  render: h => h(PageNav)
});


var elements = document.querySelectorAll('pre');

if(elements !== null)
Array.prototype.forEach.call(elements, function(el, i){
    el.innerHTML = '<code class="' + el.className + '">' +  el.innerHTML + '</code>';
});
