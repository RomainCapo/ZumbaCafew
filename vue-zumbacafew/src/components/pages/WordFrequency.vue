<template>
  <div>
      <Header />
      <div class="intro">
      <div class="container">
        <h1>Découvrez quels sont les mots les plus utilisés ! </h1>
      </div>
    </div>
    <div class="container annotation">
      <p>
        Vous voulez découvrir quels sont les mots les plus fréquents dans le rap
        français ? Quel termes sont les plus utilisés par un artiste ? Si le mot
        le plus utilisé par
        <a href="https://genius.com/artists/Wejdene">Wejdene</a>
        est Coco ?
      </p>
      <p>Vous êtes au bon endroit !</p>
    </div>
    <div id="word-cloud-container">
      <div class="container">
        <h2 class="title">Nuage de mots de {{ selectedWordCloudArtist }}</h2>
        <div class="row">
          <div class="col-sm-9">
            <img
              v-if="isWordCloudLoading"
              src="res/svg/bars.svg"
              width="50"
              alt="word-cloud-loader"
            />
            <WordCloud
              v-if="termFrequency !== null"
              v-show="!isWordCloudLoading"
              v-bind:termFrequency="termFrequency"
              ref="wordCloud"
              id="word-cloud"
            />
          </div>
          <div class="col-sm-3">
            <SearchBar
              v-if="artists !== null"
              v-bind:values="artists"
              v-bind:legend="'Recherche d\'artistes'"
              v-bind:idName="'wordcloud'"
              v-on:search-input="searchWordCloudKeyBoard"
              v-on:search-input-click="searchWordCloud"
              ref="searchWordCloudBar"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import ArtistsApi from "@/services/api/Artists";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/ui/SearchBar.vue";
import WordCloud from "@/components/charts/WordCloud.vue";
import Footer from "@/components/layout/Footer";

export default {
  name: "WordFrequency",
  components: {
    Footer,
    Header,
    WordCloud,
    SearchBar,
  },
  data() {
    return {
      artists: null,
      isWordCloudLoading: false,
      selectedWordCloudArtist: "tous les artistes",
      termFrequency: null,
    };
  },
  async created() {
    this.artists = await ArtistsApi.getArtists();
    this.termFrequency = await ArtistsApi.getTermFrequency();
  },
  methods: {
    async searchWordCloud(proposition) {
      this.isWordCloudLoading = true;
      this.selectedWordCloudArtist = proposition;
      const termFrequency = await ArtistsApi.getTermFrequencyByArtist(
        proposition
      );
      this.isWordCloudLoading = false;
      this.$refs.wordCloud.drawChart(termFrequency);
    },
    async searchWordCloudKeyBoard(propositions) {
      if (
        propositions.length === 0 &&
        this.selectedWordCloudArtist !== "tous les artistes"
      ) {
        this.selectedWordCloudArtist = "tous les artistes";
        this.isWordCloudLoading = true;
        const termFrequency = await ArtistsApi.getTermFrequency();
        this.isWordCloudLoading = false;
        this.$refs.wordCloud.drawChart(termFrequency);
      }
    },
  },
};
</script>
