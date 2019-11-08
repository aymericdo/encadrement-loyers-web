<template>
  <div class="stats">
    <div id="map"></div>
  </div>
</template>

<script>
import vegaEmbed from "vega-embed";

export default {
  name: "stats",
  mounted: function() {
    fetch('https://encadrement-loyers.herokuapp.com/stats/map')
        .then(res => res.json())
        .then(spec => {
          vegaEmbed('#map', spec);
    })
  } 
};

</script>