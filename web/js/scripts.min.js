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
      youtubeLinks:[]
    },
    mounted() {
      axios.get("http://cms-digikokki:8888/api/v1/youtube.json").then(response => {
        console.log(response.data)
        this.youtubeLinks = response.data.data
      });
    },
    computed: {
     filteredlist(){
       // filer() returns an array, filter((what) => { return the thing that includes the search keyword })
       return this.youtubeLinks.filter((data) => {
         return data.title.toLowerCase().includes(this.searchkeyword.toLowerCase());
       });
     }
    }
  })
