<template>
  <div id="about">
    <Header />
    <h1>Documentation</h1>
    <div class="container annotation">
    <h2>Le projet</h2>
    <p>
    Ce projet s'intéresse au vocabulaire des artistes de hip-hop français et vise à fournir des réponses aux questions suivantes :
    <ul>
      <li>Est-ce que le vocabulaire de tel artiste est plus riche que celui d’un autre ? </li>
      <li>Est-ce que les mots les plus fréquemment utilisés sont vulgaires ?</li>
      <li>Est-ce que certains mots deviennent plus fréquents au fil des années ?</li>
    </ul>
    Les publics ciblés sont :
    <ul>
      <li>Prioritaire : Personnes écoutant de la musique hip-hop française</li>
      <li>Secondaire : Personnes curieuses et intéressées par des statistiques diverses</li>
    </ul>
    Nous essayons de répondre à ces questions à l'aide des outils de visualisation suivants :
    <ul>
      <li>Graphique beeswarm : utile pour comparer des distributions tout en affichant des détails sur des éléments ayant des fréquences similaires</li>
      <li>Histogramme empilé : utile pour visualiser des distributions détaillées par des axes d'analyse</li>
      <li>Nuage de mots : utile pour visualiser des mots-clés en faisant ressortir les éléments les plus importants</li>
      <li>Graphique en ligne : utile pour visualiser une évolution au cours du temps</li>
    </ul>
    Un utilisateur peut obtenir plus d'informations ou faire ressortir des éléments efficacement à l'aide d'outils d'interaction mis à disposition :
    <ul>
      <li>Filtres</li>
      <li>Barre de recherce</li>
    </ul>
    Un soin particulier est apporté pour que ces informations soient interpretables et manipulables par un large public. Pour ce faire nous avons réalisé des :
    <ul>
      <li>Tests d'utilisabilité : interfaces intuitives et agréables à utiliser</li>
      <li>Tests d'accessibilité : pour ce projet, s'assurer que les graphiques soient lisibles par des personnes atteintes de Daltonisme</li>
    </ul>
    Ainsi, nous espérons satisfaire la curiosité des utilisateurs à l'aide des ces différents graphiques et outils mis à disposition. 
    </p>
    <h2>Implémentation</h2>
    <p>
      Les prochaines sections s'adressent à toutes les personnes qui s'intéressent aux détails de l'implémentation de cette application.
    </p>
      <h2>Jeu de données</h2>
      <p>
        Toutes les données de ce projet proviennent du site web
        <a href="https://genius.com/">Genius</a> et ont été récupérées par le service
        <a href="https://docs.genius.com/">API</a> de ce même site.
      </p>
      <h3>Artistes</h3>
      <p>
        Le nom des artistes a été récupéré depuis la page
        <a
          href="https://fr.wikipedia.org/wiki/Cat%C3%A9gorie:Rappeur_fran%C3%A7ais"
          >Wikipédia</a
        >
        répertoriant une liste de rappeurs français. Les noms des artistes sont récupérés
        via un script <a href="https://www.python.org/">Python</a>. Les chanteurs récupérés sont ensuite triés à la
        main pour assurer la cohérence des données par rapport aux besoins de l'API Genius. D'autres artistes non-présents sur la page wikipédia sont rajoutés manuellement à la liste.
      </p>
      <h3>Récupération des données</h3>
      <p>
        Les paroles des musiques sont récupérées et prétraitées par un script Python. Le téléchargement des données est effectué via la libraire
        <a href="https://github.com/johnwmillr/LyricsGenius">LyricsGenius</a> disponible sur GitHub.
      </p>
      <p>
        Cette bibliothèque permet de récupérer les informations suivantes :
        <ul>
          <li>Le nom de l'artiste</li>
          <li>Une photo de profile</li>
          <li>Une liste des titres de l'artiste, qui contient pour chaque chanson : </li>
          <ul>
            <li>Le titre</li>
            <li>L'année de sortie</li>
            <li>Les paroles</li>
          </ul>
        </ul>
        Il est à noter que le genre et le type d'un artiste (indiduel ou groupe) sont spécifiés manuellement comme ces informations ne sont pas disponibles dans l'API Genius. 
      </p>
      <p>
        Toutes ces informations à propos des oeuvres des artistes sont récupérées par ordre de popularité avec une limite maximum de <strong>50</strong> oeuvres.
      </p>
      <h3>Prétraitement des données</h3>
      <p>Le nom de l'artiste et l'image de profile ne nécessitent pas de prétraitement.</p>
      <p>Les paroles de chaque musique sont traitées suivant les étapes ci-dessous : 
        <ul>
        <li>Conversion du texte en minuscule</li>
        <li>Suppression des accents</li>
        <li>Suppression des caractères de ponctuation</li>
        <li>Suppression des caractères de mise en page tel que les retours à la ligne</li>
        <li>Suppression des en-têtes de paragraphes et des couplets</li>
        <li>Création de "token"</li>
      </ul>
      Pour chaque artiste, les mots utilisés sont groupés et comptés par année. Résultant en une structure de données similaire à l'exemple suivant : 
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
        Pour chaque artiste, les paroles de toutes les musiques sont mises bout à bout. Les <strong>20'000</strong> premiers mots sont sélectionnés. Sur ces <strong>20'000</strong>, le nombre de mot unique est compté. Cette information permet de comparer le richesse de vocabulaire des artistes. 
        La limitation du nombre de mots a pour but de ne pas favoriser les artistes ayant plus d'oeuvres à leur actif.
      </p>
      <p>Cependant, tous les artistes n'atteignent pas ce seuil de <strong>20'000</strong> mots. 
      Le richesse de vocabulaire de ces artistes est alors calculée avec tous les mots à disposition. 
      Un champs est reservé pour indiquer si un artiste a atteint le seuil.</p>
      <p>
        En résumé, les informations suivantes sont disponibles pour chaque artiste : 
        <ul>
          <li>Le nom</li>
          <li>L'image de profile</li>
          <li>Le genre</li>
          <li>Le type de l'artiste (individuel ou groupe)</li>
          <li>Le nombre de mot pour chaque artiste (20'000 si le seuil atteint, une autre valeur dans le cas contraires)</li>
          <li>Le nombre de mot unique</li>
          <li>Un "flag" qui indique si l'artiste a atteint le seuil des 20'000 mots</li>
          <li>Le nombre de musique anylsées (maximum 50)</li>
          <li>Le titre des musiques anylsées (maximum 50)</li>
          <li>Les années durant lesquelles l'artiste a publié des musiques</li>
          <li>L'occurence de chaque mot utilisé par année</li>
        </ul>
      </p>
      <h3>Base de données</h3>
      <p>
        Les données de chaque artistes sont enregistrées sous forme de document dans une collection.
        Une base de données orientée documents <a href="https://www.mongodb.com/">Mongo DB</a> est utilisée à cet effet. 
      </p>
      <h2>Serveur API</h2>
      <p>
        Le serveur API a été réalisé avec <a href="https://nodejs.org/en/">Node.js</a>. Il permet de servir les informations de la base de données dans le format JSON. L'ORM <a href="https://mongoosejs.com/">Mongoose</a> à été utilsé pour faire le lien entre la base de données et les objets Node JS. De plus, cette librairie permet de simplifier la création de requête MangoDB.
      </p>
      <p>Les routes API ont pour racine l'URL suivante <a href="https://www.zumbacafew.ch/api">https://www.zumbacafew.ch/api</a> et permettent d'obtenir les informations ci-dessous : 
      <ul>
        <li><code>api/artist</code> : Liste de tous les artistes</li>
        <li><code>api/artistcount</code> : Nombre d'artiste</li>
        <li><code>api/maxyear</code> : Année de sortie de l'oeuvre analysée la plus ancienne</li>
        <li><code>api/minyear</code> : Année de sortie de l'oeuvre analysée la plus récente</li>
        <li><code>api/soundcount</code> : Nombre de musique analysées</li>
        <li><code>api/stats</code> : Retourne un ensemble de statistiques sur chaque artiste</li>
        <li><code>api/termfrequency</code> : Dictionnaire de la fréquence d'utilisation des mots</li>
        <li><code>api/termfrequency/:artistName</code> : Dictionnaire de la fréquence d'utilisation des mots pour un artiste donné</li>
        <li><code>api/termfrequencyByYear</code> : Dictionnaire des mots les plus utilisés par année</li>
        <li><code>api/wordcount</code> : Nombre de mot analysés</li>
      </ul>
      Pour les statistiques utilisant la fréquence d'appartion des mots, un filtre est utilisé pour retirer les mots vides.
      Un mot vide est un mot très commun dans une langue qui généralement n'apporte pas d'information pour la tâche réalisée. 
      En effet, il ne serait pas très intéressant de visualiser que le mot le plus utilisé par les artistes sont par exemple des déterminants.
      </p>
      <h2>Frontend</h2>
      <p>
        Le framework frontend utilisé pour réaliser cette application est <a href="https://vuejs.org/">Vue.js</a>. Les données sont récupérés par le client via des requêtes à l'API du serveur détaillée au précédent paragraphe. Le package <a href="https://github.com/axios/axios">Axios</a> est utilisé pour réaliser ces requêtes. 
      </p>
      <p>
        Les graphiques du nuage d'artiste et du nuage de mot sont réalisés à l'aide de la bibliothèque <a href="https://d3js.org/">D3.js</a>. L'histogramme d'artiste est réalisé en Javascript Vanilla sans aucune librairie. Pour plus de détail sur la réalisation de ces graphiques, veuillez consulter la section appropriée sous chacune des visualisations en question.
      </p>
      <h2>Déploiement</h2>
      <p>
        Les diverses applications formant le projet sont déployables sous forme de "container" <a href="https://www.docker.com/">Docker</a>.
        Les 3 "containers" sont dédiés à :
        <ul>
          <li>L'application frontend</li>
          <li>L'application backend</li>
          <li>La base de données</li>
        </ul>
        Ces "containers" sont déployés dans un environement IaaS d'un hébergeur cloud.
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