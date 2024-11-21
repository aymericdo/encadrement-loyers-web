<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <Section class="stats-section">
          <div class="container" ref="adoptionContainer">
            <iframe style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-encadrement-rents-pfblv/embed/charts?id=843b46f9-9c34-46eb-932c-6a5d15dc1dc3&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
          </div>
        </Section>
      </Page2Wrapper>
    </transition>
    <div @click="isMounted = false">
      <FixedButton>
        <StrokeIcon :width="'18px'" :height="'18px'" />
      </FixedButton>
    </div>
  </div>
</template>

<script setup>
  import StrokeIcon from "@/icons/StrokeIcon.vue";
  import FixedButton from "@/shared/FixedButton.vue";
  import Page2Wrapper from "@/shared/Page2Wrapper.vue";
  import Section from "@/shared/Section.vue";

  import { onMounted, ref } from "vue";

  import { useRouter } from "vue-router";

  const router = useRouter()

  const isMounted = ref(false);
  const isAdoptionLoaded = ref(false);

  onMounted(() => {
    isMounted.value = true;
  })

  const leave = () => {
    setTimeout(() => {
      router.push({ path: "/" });
    }, 400);
  }
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

#stats {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 400ms;
}

#adoption {
  max-width: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}

:deep(.title) {
  max-width: inherit;

  & > h3 {
    margin-top: 42px;
    margin-bottom: 8px;
  }
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 700px;
  height: 500px;
}

.spinner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.stats-section {
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  flex: 1;
  justify-content: center;

  &:last-child {
    margin-bottom: 20px;
  }
}
</style>
