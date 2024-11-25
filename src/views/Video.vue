<template>
  <div id="video">
    <div class="content">
      <video autoplay muted controls>
        <source src="@/assets/video/prez.mp4" type="video/mp4" />
      </video>
    </div>
    <router-link to="/">
      <FixedButton>
        <StrokeIcon :width="'18px'" :height="'18px'" />
      </FixedButton>
    </router-link>
  </div>
</template>

<script setup>
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

#video {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  .content {
    position: relative;
    width: 500px;
    height: 500px;
    max-width: 90%;
    min-width: 300px;
    min-height: 300px;
  }

  video {
    width: 100%;
    height: 100%;
    outline: none;
  }
}
</style>