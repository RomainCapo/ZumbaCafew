<template>
  <div>
      <Header />
      <div class="intro">
      <div class="container">
        <h1>Découvrez quel artiste à le plus grand vocabulaire !</h1>
      </div>
    </div>
      <div class="container annotation">
      <p>
        Vous avez toujours voulu savoir si le vocabulaire d'un rappeur était
        plus riche que celui d'un autre ? Si le rap c'était mieux avant ? Si le
        vocabulaire de <a href="https://genius.com/artists/Booba">Booba</a> est
        plus riche que celui de
        <a href="https://genius.com/artists/Kaaris">Kaaris</a> ?
      </p>
      <p>Le graphique suivant va vous donner la réponse !</p>
    </div>
       <div id="beeswarm-container">
      <h2 class="title">Nombre de mots uniques par artistes</h2>
      <div class="container justify-content-center">
        <Beeswarm
          ref="beeswarm"
          v-if="artistsStats !== null"
          v-bind:artistsStats="artistsStats"
          id="beeswarm"
        />
        <div class="row radio-button-beeswarm">
          <GroupRadio
            v-bind:legend="'Sexe'"
            v-bind:radioGroup="'sex'"
            v-bind:filters="filtersSex"
            v-on:radio-btn-clicked="filterBeeSwarm"
            ref="radioSex"
          />
          <GroupRadio
            v-bind:legend="'Type d\'artiste'"
            v-bind:radioGroup="'artist-type'"
            v-bind:filters="filtersArtistType"
            v-on:radio-btn-clicked="filterBeeSwarm"
            ref="radioArtistType"
          />
          <GroupRadio
            v-bind:legend="'Decenie'"
            v-bind:radioGroup="'year'"
            v-bind:filters="filtersDecade"
            v-on:radio-btn-clicked="filterBeeSwarm"
            ref="radioYear"
          />
          <GroupRadio
            v-bind:legend="'Seuil atteint'"
            v-bind:radioGroup="'is-complete'"
            v-bind:filters="filtersIsComplete"
            v-on:radio-btn-clicked="filterBeeSwarm"
            ref="radioIsComplete"
          />
          <SearchBar
            v-if="artists !== null"
            v-bind:values="artists"
            v-bind:legend="'Recherche d\'artistes'"
            v-bind:idName="'beeswarm'"
            v-on:search-input="searchBeeSwarm"
            ref="searchBeeswarm"
          />
        </div>
      </div>
    </div>
    <div class="container annotation">
      <p>
        Le graphique représente la richesse de vocabulaire de chaque artistes.
        C'est à dire le nombre de mot uniques uitlisés par chaque chanteur. le
        nombre de mots uniques est calculé sur un ensemble de
        <strong>20'000 mots</strong> récupérés sur ses musiques les plus
        populaires. Les artistes qui n'atteignent pas ce seuil peuvent être
        filtré via le filtre <strong>"Seuil atteint"</strong>.
      </p>
      <p>
        Le graphique permet de filtrer les artistes selon :
        <ul>
          <li>Leur sexe</li>
          <li>Le type d'artiste, solo ou groupe</li>
          <li>L'année</li>
          <li>L'atteint ou non du seuil de mot</li>
        </ul>
        Les filtres peuvent être combiné les uns les autres.
        Il est également possible de rechercher les artistes via una barre de recherche en bas à droite du graphique. L'usage des filtres n'est plus accesible pendant le processus de recherche.
      </p>
      <p>
        La décennie à laquelle appartient chaque artiste est calculée à partir
        de la moyenne de ses musiques les plus populaires.
      </p>
      <p>
        Le graphique est réalisé avec la librairie <a href="https://d3js.org/">D3.js</a>. Globalement voici les principales étapes de création du graphique : 
      <ul>
        <li>Initialisation de l'élément <strong>SVG</strong> avec une taille définit. Cet élément permet d'effectuer des dessin sur la page web.</li>
      </ul>
      </p>
    </div>
        
    <div id="word-histogram-container">
      <div class="container">
        <h2 class="title">Histogramme du nombre de mot uniques par artiste</h2>
        <WordHistogram
          v-if="artistsStats !== null"
          v-bind:artistsStats="artistsStats"
          v-bind:legend="this.$refs.legendContainer"
          ref="wordHistogram"
          id="word-histogram"
        />
        <div id="xaxis-legend">Nombre de mot</div>
        <div id="source">Source: <a href="https://genius.com">Genius</a></div>
        <div class="row">
          <div class="col-sm">
            <span ref="legendContainer" id="legend-container">
              <strong>Année</strong><br />
              <span class="y1990">1990</span><br />
              <span class="y2000">2000</span><br />
              <span class="y2010">2010</span><br />
              <span class="y2020">2020</span>
            </span>
          </div>
          <div class="col-sm">
            <label for="input-number-bin"
              ><strong>Nombre de collones : </strong></label
            >
            <input
              type="number"
              class="form-control"
              id="input-number-bin"
              min="3"
              max="10"
              value="6"
              @input="inputNumberEvent"
            />
          </div>
          <div class="col-sm">
            <span id="criterion-container">
              <GroupRadio
                v-bind:legend="'Critère'"
                v-bind:radioGroup="'criterions'"
                v-bind:filters="filtersName"
                v-on:radio-btn-clicked="filterWordHistogram"
                ref="radioCriterions"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container annotation">
      <p>
        Ce graphique présente une autre vue du premier graphique. Chaque
        artistes est disposé dans une collonne en fonction de la richesse de son
        vocabulaire
      </p>
    </div>
    <Footer />
</div>
</template>
<script>
import ArtistsApi from "@/services/api/Artists";
import Beeswarm from "@/components/charts/Beeswarm.vue";
import Header from "@/components/layout/Header";
import GroupRadio from "@/components/ui/GroupRadio.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import Footer from "@/components/layout/Footer";
import WordHistogram from "@/components/charts/WordHistogram.vue";

export default {
  name: "VocabRichness",
  components: {
    Beeswarm,
    Footer,
    GroupRadio,
    WordHistogram,
    Header,
    SearchBar,
  },
  data() {
    return {
      artists: null,
      artistsStats: null,
      artistCount: null,
      filtersArtistType: [
        {
          key: "all",
          value: "Les deux",
        },
        {
          key: "individual",
          value: "Individuel",
        },
        {
          key: "group",
          value: "Groupe",
        },
      ],
      filtersDecade: [
        {
          key: "all",
          value: "Toutes les années",
        },
        {
          key: "1990",
          value: "1990",
        },
        {
          key: "2000",
          value: "2000",
        },
        {
          key: "2010",
          value: "2010",
        },
        {
          key: "2020",
          value: "2020",
        },
      ],
      filtersSex: [
        {
          key: "all",
          value: "Les deux",
        },
        {
          key: "men",
          value: "Homme",
        },
        {
          key: "woman",
          value: "Femme",
        },
      ],
      filtersIsComplete: [
        {
          key: "all",
          value: "Tous les artistes",
        },
        {
          key: "complete",
          value: "Seuil atteint",
        },
        {
          key: "incomplete",
          value: "Seuil non atteint",
        },
      ],
      filtersName: [
        {
          key: "year",
          value: "Année",
        },
        {
          key: "gender",
          value: "Sexe",
        },
        {
          key: "artist_type",
          value: "Type d artiste",
        },
      ],
    };
  },
  async created() {
    this.artists = await ArtistsApi.getArtists();
    this.artistsStats = await ArtistsApi.getStats();
  },
  methods: {
    inputNumberEvent(e) {
      let criterion = this.$refs.radioCriterions.currentValue;
      this.$refs.wordHistogram.numberInputEvent(e.target.value, criterion);
    },
    filterWordHistogram(e) {
      this.$refs.wordHistogram.applyFilter(e.value);
    },
    filterBeeSwarm(e) {
      this.$refs.beeswarm.filter(e);
    },
    searchBeeSwarm(propositions) {
      this.$refs.beeswarm.search(propositions, [
        this.$refs.radioSex,
        this.$refs.radioArtistType,
        this.$refs.radioYear,
        this.$refs.radioIsComplete,
      ]);
    },
  },
};
</script>
