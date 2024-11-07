<template>
  <div class="multi-dropdown">
    <div class="overlay" v-if="isOpen" @click="onOpen"></div>
    <button @click="onOpen" :class="{ '-is-open': isOpen }">
      <span>{{ currentValuesDisplay }}</span
      ><ArrowIcon
        class="arrow-icon"
        :class="{ '-is-open': isOpen }"
      ></ArrowIcon>
    </button>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen" ref="optionListRef">
        <template v-if="isGroupBy">
          <template
            v-for="groupByKey in Object.keys(groupByList)"
            v-bind:key="groupByKey"
          >
            <div
              class="option grouped"
              :class="{
                '-selected': groupByList[groupByKey].every((opt) =>
                  currentValues.includes(opt.value)
                ),
              }"
              @click="onGroupBySelect(groupByKey)"
            >
              {{ groupByKey }}
            </div>
            <div
              class="option"
              v-for="option in groupByList[groupByKey]"
              :class="{
                '-selected': currentValues.some((v) => v === option.value),
              }"
              v-bind:key="option.value"
              @click="onSelect(option)"
            >
              {{ option.label }}
            </div>
          </template>
        </template>
        <template v-else>
          <div
            class="option classic"
            v-for="option in options"
            :class="{
              '-selected': currentValues.some((v) => v === option.value),
            }"
            v-bind:key="option.value"
            @click="onSelect(option)"
          >
            {{ option.label }}
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watchEffect,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import ArrowIcon from "@/icons/ArrowIcon.vue";

export default defineComponent({
  name: "MultiDropdown",
  props: ["options", "currentValues"],
  setup(props) {
    const optionListRef = ref(null);
    const isOpen = ref(false);
    const currentValuesDisplay = ref("");
    const groupByList = ref({});
    const isGroupBy = ref(props.options.length && !!props.options[0].groupBy);

    const setGroupByList = (currentOptions) => {
      groupByList.value = currentOptions.reduce((prev, currentValue) => {
        if (prev[currentValue.groupBy]) {
          prev[currentValue.groupBy].push(currentValue);
        } else {
          prev[currentValue.groupBy] = [currentValue];
        }
        return prev;
      }, {});
    };

    const setCurrentValueDisplay = (newCurrentValues) => {
      currentValuesDisplay.value =
        props.options
          .filter((opt) => newCurrentValues.includes(opt.value))
          .map((opt) => opt.label)
          .join(", ") || "Tout";
    };

    watch(
      () => props.options,
      (newValue) => {
        isGroupBy.value = newValue.length && !!newValue[0].groupBy;
        if (isGroupBy.value) {
          setGroupByList(newValue);
        }
      }
    );

    watch(
      () => props.currentValues,
      (newValue) => {
        setCurrentValueDisplay(newValue);
      }
    );

    let scrollIntoViewTimeout = null;
    watchEffect(
      () => {
        if (!isOpen.value) {
          clearTimeout(scrollIntoViewTimeout);
        }

        if (optionListRef.value && isOpen) {
          scrollIntoViewTimeout = setTimeout(() => {
            if (optionListRef.value.querySelector('.option.-selected')) {
              optionListRef.value.querySelector('.option.-selected').scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          }, 250);
        }
      },
      {
        flush: "post",
      }
    );

    onMounted(() => {
      if (isGroupBy.value) {
        setGroupByList(props.options);
      }

      setCurrentValueDisplay(props.currentValues);
    });

    onUnmounted(() => {
      clearTimeout(scrollIntoViewTimeout);
    });

    return {
      optionListRef,
      isOpen,
      currentValuesDisplay,
      isGroupBy,
      groupByList,
    };
  },
  methods: {
    onOpen: function() {
      this.isOpen = !this.isOpen;
    },
    onSelect: function(opt) {
      this.$emit("onSelect", [opt]);
    },
    onGroupBySelect: function(groupByKey) {
      this.$emit("onSelect", this.groupByList[groupByKey]);
    },
  },
  components: {
    ArrowIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.multi-dropdown {
  position: relative;
}

.multi-dropdown > button {
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  background-color: $yellow;
  font-weight: 600;
  height: 36px;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  padding: 6px 12px;
  border-color: transparent;
  transition: background-color ease 0.3s;
}

.multi-dropdown > button.-is-open {
  z-index: 2;
}

.multi-dropdown > button > span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  padding-right: 1em;
}

.arrow-icon {
  position: absolute;
  right: 14px;
  transition: transform ease 0.3s;
}

.arrow-icon.-is-open {
  transform: rotate(-180deg);
}

.overlay {
  background: rgba(19, 15, 64, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;
  overflow: hidden;
}

.option-list {
  position: absolute;
  max-height: 250px;
  overflow-y: auto;
  width: 100%;
  top: 100%;
  margin-top: 4px;
  background-color: $deepblack;
  border-radius: 4px;
  border: 1px solid white;
  z-index: 5;
}

.option {
  display: flex;
  min-height: 36px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all ease 0.3s;
  color: white;
  transition-property: background-color, color;
  border-bottom: solid 1px white;

  &:last-child {
    border-bottom: none;
  }
}

.option.grouped {
  border-bottom: solid 4px white;
}

.option:not(.grouped):not(.classic) {
  padding-left: 2rem;
}

.option.-selected,
.option:active {
  background-color: $yellow;
  color: $deepblack;
}

.option.-selected {
  font-weight: 500;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all ease 400ms;
  transition-property: opacity, transform;
}

@media (hover: hover) and (pointer: fine) {
  .dropdown > button:hover {
    box-shadow: 0 0 0 1px white;
  }

  .option:hover {
    background-color: $yellow;
    color: $deepblack;
  }
}
</style>
