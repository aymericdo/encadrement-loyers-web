<template>
  <Section class="section-thanks">
    <SectionTitle>Remerciements</SectionTitle>
    <SectionRightPart>
      <div class="data-provider">
        <div>
            <a href="https://opendata.paris.fr/pages/home/" target="_blank">
                <img src="@/assets/images/data-paris.png" alt="Photo de logo data paris">
            </a>
            <span>Open Data Paris</span>
        </div>
        <div>
            <a href="https://opendata.apur.org/" target="_blank">
                <img src="@/assets/images/data-apur.png" alt="Photo logo Apur">
            </a>
            <span>Open Data Apur</span>
        </div>
      </div>
    </SectionRightPart>
  </Section>
</template>

<script>
import Section from "@/shared/Section";
import SectionTitle from "@/shared/SectionTitle";
import SectionRightPart from "@/shared/SectionRightPart";

export default {
  name: "SectionThanks",
  components: {
    Section,
    SectionRightPart,
    SectionTitle
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.data-provider {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.data-provider > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2em 2em;
}

.data-provider img {
    width: 180px;
}
</style>
