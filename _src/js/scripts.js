  console.log('Hello Vue!!');

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

  var toggleMobileNav = new Vue({
    el: '#pageNavContainer',
    data: {
        navOpen: false
    },
    methods: {
      toggleClass: function() {
           this.navOpen = !this.navOpen;
      }
    },
  })

  var searchYoutube = new Vue({
    delimiters: ['${', '}'],
    el: '#youtubelist',
    data:{
      searchkeyword: '',
      youtubeLinks:[],
      paginate: ['filteredlist']
    },
    mounted() {
      axios.get("http://cms-digikokki:8888/api/v1/youtube.json").then(response => {
        //console.log(response.data)
        this.youtubeLinks = response.data.data;
      });
    },
    computed: {
     filteredlist () {
       const re = new RegExp(this.searchkeyword, 'i')
       return this.youtubeLinks.filter(data => data.title.match(re))
     }
    }
  })

  var elements = document.querySelectorAll('pre');

  if(elements !== null)
  Array.prototype.forEach.call(elements, function(el, i){
      el.innerHTML = '<code class="' + el.className + '">' +  el.innerHTML + '</code>';
  });
