<template>
  <footer class="section">
    <p>
      Brought to you by
      <span>
        <a href="https://www.linkedin.com/in/aymeric-dominique-b11349a6/">Aymeric Dominique</a>
      </span>,
      <span>
        <a href="https://www.linkedin.com/in/thomas-d-legrand/">Thomas Legrand</a>
      </span> and
      <span>
        <a href="https://www.linkedin.com/in/lucienlandanger/">Lucien Landanger</a>
      </span>
      <br />
      <span>
        <a href="https://buymeacoff.ee/DnzzL">☕️Buy us a coffee</a>
      </span>
    </p>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  props: {}
};
</script>
<style scoped>
footer.section {
  flex-direction: column;
}
footer p {
  font-size: 12px;
  text-align: center;
}
</style>