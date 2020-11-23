<template>
  <div id="about">
    <Header />
    <h1>Documentation</h1>
    <div class="container annotation">
      
    <p>
      Cette section du site s'adresse à toute les personnes qui s'interesse plus en détails à comment a été developpé cette application.  
    </p>
      <h2>Jeu de données</h2>
      <p>
        Toutes les données de ce projet proviennent du site web
        <a href="https://genius.com/">Genius</a> et ont récupéré par le service
        <a href="https://docs.genius.com/">API</a> de ce même site.
      </p>
      <h3>Artistes</h3>
      <p>
        Le nom des artistes ont été récupéré depuis la page
        <a
          href="https://fr.wikipedia.org/wiki/Cat%C3%A9gorie:Rappeur_fran%C3%A7ais"
          >Wikipédia</a
        >
        répertoriant les rappeurs français. Les noms des artistes sont récupéré
        via un script <a href="https://www.python.org/">Python</a>. Les chanteurs récupérés sont ensuite triés à la
        main pour assurer la cohérence des données. D'autres artistes non
        présent sur la page wikipédia sont rajouté manuellement.
      </p>
      <h3>Récupération des données</h3>
      <p>
        Les données sont récupérés et prétraités par un script Python. La
        récupération des données en effectué via la libraire GitHub
        <a href="https://github.com/johnwmillr/LyricsGenius">LyricsGenius</a>.
      </p>
      <p>
        Cette bibliothèque permet de récupérer les informations suivantes :
        <ul>
          <li>Le nom de l'artiste</li>
          <li>L'image de profile</li>
          <li>Une liste de musique qui contient pour chaque chanson : </li>
          <ul>
            <li>Le nom</li>
            <li>L'année de sortie</li>
            <li>Les paroles</li>
          </ul>
        </ul>
        Il est a noter que le sexe et le type d'un artiste (indiduel ou groupe) sont précisié manuellement comme cette informations n'est pas fourni par l'API Genius. 
      </p>
      <p>
        Toutes les musiques des artistes sont récupérées par ordre de popularité avec une limite maximum de <strong>50</strong> chansons.
      </p>
      <h3>Prétraitement des données</h3>
      <p>Le nom de l'artiste et l'image de profile sont récupérés tel quel.</p>
      <p>Pour les paroles de chaque musique les traitements suivants sont effectués : 
        <ul>
        <li>Conversion de texte en minuscule</li>
        <li>Suppression des accents</li>
        <li>Suppression des caractères de ponctuation</li>
        <li>Suppression des sauts de lignes</li>
        <li>Suppression des en-têtes de paragraphes et des couplets</li>
        <li>Création de "token" pour chaque mot des paroles</li>
      </ul>
      Pour chaque artiste, les mots utilisé sont groupés et compté par année sous la forme : 
      <pre>
        [{"year" : 2018,
         "words" : [{
                    "word" : "Artiste",
                    "count" : 10,
                    }, 
                    {
                      "word" : "Musique",
                      "count" : 20,
                    } ...]
        }, 
        {
          "year" : 2020,
          "words" : [...]
        }]
      </pre>
       Cette représentation permet d'avoir une relation entre l'utilisation des mots par un artiste d'une année à l'autre
      </p>
      <p>
        Pour chaque artiste, les paroles de toutes les musiques sont mises bout à bout. Les <strong>20'000</strong> premiers mots sont sélectionné. Sur ces <strong>20'000</strong>, le nombre de mot unique est compté. Cette information permet de déterminer le richesse de vocabulaire d'un artiste.
      </p>
      <p>Il est a noter que tous les artistes n'atteignent pas ce seuil de <strong>20'000</strong> mots. Le vocabulaire de ces artistes sont alors calculés avec tous les mots à disposition. Un champs est reservé pour indiquer si un artiste a atteint ou non ce seuil.</p>
      <p>
        Pour résumer les informations suivantes sont disponibles pour chaque artiste : 
        <ul>
          <li>Le nom</li>
          <li>L'image de profile</li>
          <li>Le sexe</li>
          <li>Le type de l'artiste (individuel ou groupe)</li>
          <li>Le nombre de mot pour chaque artiste (20'000 si le seuil atteint, une autre valeur dans le cas contraires)</li>
          <li>Le nombre de mot unique</li>
          <li>Un "flag" qui indique si l'artiste a atteint le seuil de 20'000 mots ou non</li>
          <li>Le nombre de musique anylsées (maximum 50)</li>
          <li>Le titres des musiques anylsées (maximum 50)</li>
          <li>Les années durant lequel l'artiste a sorti des musiques</li>
          <li>L'occurence de chaque mot utilisé par année</li>
        </ul>
      </p>
      <h3>Base de données</h3>
      <p>
        Les données décrites dans le chapitre ci-dessus sont stockés dans une base de données non relationnelle <a href="https://www.mongodb.com/">Mongo DB</a>. Chaque artistes est stocké comme un document dans une collection.
      </p>
      <h2>Serveur API</h2>
      <p>
        Le serveur API a été réalisé avec <a href="https://nodejs.org/en/">Node.js</a>. Il permet de servir les informations de la base de données sous forme de JSON. L'ORM <a href="https://mongoosejs.com/">Mongoose</a> à été utilsé pour faire le lien entre la base de données et les objets Node JS. De plus, cette librairie permet de simplifier la création de requête MangoDB.
      </p>
      <p>Des requetes API sont disponible à l'adresse suivante <a href="https://www.zumbacafew.ch/api">https://www.zumbacafew.ch/api</a> et permette d'obtenir les informations ci-dessous : 
      <ul>
        <li><code>api/artist</code> : Liste de tous les artistes</li>
        <li><code>api/artistcount</code> : Nombre d'artiste</li>
        <li><code>api/maxyear</code> : Année minimum de toute les musiques analysées</li>
        <li><code>api/minyear</code> : Année maximum de toute les musiques analysées</li>
        <li><code>api/soundcount</code> : Nombre de musique analysées</li>
        <li><code>api/stats</code> : Retourne un ensemble de statistiques sur chaque artiste</li>
        <li><code>api/termfrequency</code> : Dictionnaire des mots les plus utilisés</li>
        <li><code>api/termfrequency/:artistName</code> : Dictionnaire des mots les plus utilisés pour l'artiste fournit en paramètre</li>
        <li><code>api/termfrequencyByYear</code> : Dictionnaire des mots les plus utilisé pour chaque année</li>
        <li><code>api/wordcount</code> : Nombre de mot analysés</li>
      </ul>
      </p>
      <h2>Frontend</h2>
      <p>
        Le framework frontend utilisé pour réaliser cette application est <a href="https://vuejs.org/">Vue.js</a>. Les données sont récupérés chez le client via des requetes API sur le serveur précisisé ci-dessus. Le package <a href="https://github.com/axios/axios">Axios</a> est utilisé pour réaliser les requêtes. 
      </p>
      <p>
        Les graphiques du nuage d'artiste et du nuage de mot sont réalisé à l'aide de la bibliothèque <a href="https://d3js.org/">D3.js</a>. L'histogramme d'artiste est réalisé en Javascript Vanilla sans aucune librairie. Pour plus de détail sur la réalisation des graphiques, veuillez consulter la section approprié sous chacune des visualisations en question.
      </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default {
  name: "About",
  components: {
    Footer,
    Header,
  },
};
</script>