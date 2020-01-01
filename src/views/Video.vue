<template>
  <div id="video">
    <div class="content">
      <router-link to="/">
        <div class="close-button">
          <StrokeIcon :width="'20px'" :height="'20px'" />
        </div>
      </router-link>
      <video autoplay muted controls>
        <source src="@/assets/video/prez.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import StrokeIcon from "@/icons/StrokeIcon.vue";
export default {
  name: "Video",
  components: {
    StrokeIcon
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#video {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  .close-button {
    align-items: center;
    background: $yellow;
    border-radius: 50%;
    display: flex;
    height: 35px;
    justify-content: center;
    position: absolute;
    top: -15px;
    right: -15px;
    width: 35px;
    z-index: 1;

    &:hover {
      background-color: $darkeryellow;
    }
  }

  .content {
    position: relative;
    width: 500px;
    max-width: 90%;
    min-width: 300px;
  }

  video {
    width: 100%;
    outline: none;
  }
}
</style>
