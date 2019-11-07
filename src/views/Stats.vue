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
    fetch('http://localhost:3000/stats/map')
        .then(res => res.json())
        .then(spec => {
          vegaEmbed('#map', spec);
    })
  } 
};

</script>