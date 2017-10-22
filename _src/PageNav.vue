<template lang="html">
<div id="pageNavContainer">
  <div id="pageNavHeading">
    <!--div id="brandLogo">
      <a href="/"><img src="./img/digikokki-logo.svg"/> Hello</a>
    </div>
    <div id="mobileNav" @click="navOpen = !navOpen">
      valikko
    </div-->
  </div>
  <div id="pageNavContent" :class="{ open: navOpen }">
    <ul class="siteLinkList" id="pageLinks">
      <a href="/"><li id="brandLogo"><img src="./img/digikokki-logo.svg"/><span>Digikokki</span></li></a>
      <a href="#"><li><i class="fa fa-globe"></i> <span>Internet</span></li></a>
      <a href="#"><li><i class="fa fa-html5"></i> <span>Html</span></li></a>
      <a href="#"><li><i class="fa fa-css3"></i>  <span>Css</span></li></a>
      <a href="#"><li><i class="fa fa-code"></i>  <span>Javascript</span></li></a>
      <a href="#"><li><i class="fa fa-cogs"></i>  <span>Koodarin työkalut</span></li></a>
    </ul>
  </div>
</div>
</template>

<script>
export default {
    delimiters: ['${', '}'],
    data () {
       return {
          navOpen: false
       }
    }
}
</script>

<style>
</style>
