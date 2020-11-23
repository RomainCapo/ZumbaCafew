<template>
  <div>
    <Header />
    <div class="intro">
      <div class="container">
        <h1>Découvrez les statistiques cachées de vos rappeurs préférés !</h1>
      </div>
    </div>
    <div class="container stats">
      <p>
        Nombre d'artistes analysés:
        <strong
          v-if="artistCount !== null"
          v-html="formatNumber(artistCount.count)"
        ></strong>
      </p>
      <p>
        Nombre de musiques analysées :
        <strong
          v-if="songCount !== null"
          v-html="formatNumber(songCount.count)"
        ></strong>
      </p>
      <p>
        Nombre de mots analysés :
        <strong
          v-if="wordCount !== null"
          v-html="formatNumber(wordCount.count)"
        ></strong>
      </p>
      <p>
        Nombre d'années analysées :
        <strong
          v-if="minYear !== null && maxYear !== null"
          v-html="formatNumber(maxYear.max - minYear.min)"
        ></strong>
      </p>
    </div>
    <div class="container annotation">
      <p>
        Zumba Cafew permet de visualiser différentes statistiques sur vos
        artistes de musique français préférés. Toutes les données de ce projet
        proviennent du site web
        <a href="https://genius.com/">Genius</a>.
      </p>
    </div>
    <div class="container" id="home">
      <div class="row justify-content-center">
        <div class="col-xs">
          <router-link to="/vocab_richness#beeswarm"
            >Nuage d'artiste</router-link
          >
        </div>
        <div class="col-xs" id="middle">
          <router-link to="/vocab_richness#word-histogram"
            >Histogramme d'artiste</router-link
          >
        </div>
        <div class="col-xs">
          <router-link to="/word_frequency">Nuage de mot</router-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import ArtistsApi from "@/services/api/Artists";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default {
  name: "Home",
  components: {
    Footer,
    Header,
  },
  data() {
    return {
      artistCount: null,
      songCount: null,
      wordCount: null,
      minYear: null,
      maxYear: null,
    };
  },
  async created() {
    this.artistCount = await ArtistsApi.getArtistCount();
    this.songCount = await ArtistsApi.getSongCount();
    this.wordCount = await ArtistsApi.getWordCount();
    this.minYear = await ArtistsApi.getMinYear();
    this.maxYear = await ArtistsApi.getMaxYear();
  },
  methods: {
    formatNumber(number, separator = "'") {
      return number.toLocaleString("en-US").replace(/,/g, separator);
    },
  },
};
</script>
<style scoped>
#home {
  margin-bottom: 100px;
}

#home .col-xs {
  margin-left: 30px;
  font-size: 32px;
}
</style>
