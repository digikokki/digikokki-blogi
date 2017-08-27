<template lang="html">
  <div id="youtubelist">
      <input type="search" placeholder="Etsi videota" v-model="searchkeyword">
      <paginate id="videoLinks" name="filteredlist" class="paginate-list" :list="filteredlist" :per="4">
        <li v-for="youtubeLink in paginated('filteredlist')">
          <div class="videoThumbnail">
            <a href="#">
            <img v-bind:src="youtubeLink.image" lass="img-fluid"  alt="youtubeLink.title" />
            </a>
          </div>
          <div class="videoInfo">
            <a v-bind:href="youtubeLink.link" target="_blank"><h4>{{ youtubeLink.title }}</h4></a>
            <h6><a href="#">#{{youtubeLink.category}}</a> &middot; <span>Julkaistu: {{youtubeLink.date_published}}</span></h6>
          </div>
        </li>
      </paginate>
      <paginate-links for="filteredlist" :simple="{next: 'Seuraavat »',prev: '« Edelliset'}"></paginate-links>
  </div>
</template>

<script>
export default {
    delimiters: ['${', '}'],
    data () {
       return {
            searchkeyword: '',
            youtubeLinks: [],
            paginate: ['filteredlist']
       }
    },
    mounted() {
      axios.get("http://146.185.169.225/api/v1/youtube.json").then(response => {
        //console.log(response.data)
        this.youtubeLinks = response.data.data;
      });
    },
    computed: {
     filteredlist () {
       var re = new RegExp(this.searchkeyword, 'i')
       return this.youtubeLinks && this.youtubeLinks.filter(data => data.title.match(re)) || []
     }
    }
}
</script>

<style>
</style>
