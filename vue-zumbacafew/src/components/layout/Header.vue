<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <img src="res/img/logo.png" alt="logo" height="80" />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#beeswarm">Nuage d'artistes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#word-histogram">Histogramme</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#word-cloud">Nuage de mots</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#lineChart">Linechart</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
nav {
  background-color: rgb(255, 255, 255) !important;
  border-bottom: 1px solid rgb(41, 128, 185);
}

.nav-link {
  color: rgb(41, 128, 185) !important;
}

.nav-link:hover {
  color: gray !important;
}

nav a {
  font-size: 24px;
}

nav .navbar-brand {
  font-size: 36px;
  margin-right: 60px;
}

nav img {
  margin-right: 25px;
}

nav h1 {
  position: absolute;
  margin-left: 80px;
}
</style>
