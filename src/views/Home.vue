<template>
  <div class="home">
    <TopBar />
    <Body />
  </div>
</template>

<script>
import Body from "@/components/Body.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "home",
  components: {
    Body,
    TopBar
  }
};
</script>
