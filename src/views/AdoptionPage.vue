<template>
  <Page2Wrapper :is-mounted="isMounted">
    <div class="flex">
      <div
        ref="adoptionContainer"
        class="container flex justify-center"
      >
        <iframe
          style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-encadrement-rents-pfblv/embed/charts?id=843b46f9-9c34-46eb-932c-6a5d15dc1dc3&maxDataAge=86400&theme=dark&autoRefresh=true"
        />
      </div>
    </div>
    <div @click="isMounted = false">
      <FixedButton>
        <StrokeIcon
          :width="'18px'"
          :height="'18px'"
        />
      </FixedButton>
    </div>
  </Page2Wrapper>
</template>

<script setup>
  import StrokeIcon from "@/icons/StrokeIcon.vue";
  import FixedButton from "@/shared/FixedButton.vue";
  import Page2Wrapper from "@/shared/Page2Wrapper.vue";

  import { onMounted, ref } from "vue";

  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  })
</script>
