<template>
  <div class="input">
    <div class="overlay" v-if="isOpen" @click="onOpen"></div>
    <div class="button" @click="onOpen" :class="{ '-is-open': isOpen }">
      <input
        class="main-input"
        :class="{ '-text-selected': currentValueDisplay }"
        ref="myinput"
        @focus="onFocusing"
        @input="onTyping"
        type="text"
        :placeholder="placeholder"
        :value="currentValueDisplay || textTyped"
      />
      <ArrowIcon class="arrow-icon" :class="{ '-is-open': isOpen && options.length }"></ArrowIcon>
    </div>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen && options.length" ref="optionListRef">
        <template v-if="isGroupBy">
          <template
            v-for="groupByKey in Object.keys(groupByList)"
            v-bind:key="groupByKey"
          >
            <div class="option grouped">
              {{ groupByKey }}
            </div>
            <div
              class="option"
              v-for="option in groupByList[groupByKey]"
              :class="{ '-selected': currentValue === option.value }"
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
            :class="{ '-selected': currentValue === option.value }"
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
import ArrowIcon from "@/icons/ArrowIcon.vue";
import { defineComponent, ref, watch, watchEffect, onMounted, onUnmounted } from "vue";
export default defineComponent({
  name: "Input",
  props: ["options", "currentValue", "textTyped", "placeholder"],
  setup(props) {
    const optionListRef = ref(null);
    const isOpen = ref(false);
    const currentValueDisplay = ref("");
    const groupByList = ref({});
    const isGroupBy = ref(props.options.length && !!props.options[0].groupBy);
    let scrollIntoViewTimeout = null;

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

    watch(
      () => props.options,
      (newValue) => {
        isGroupBy.value = newValue.length && !!newValue[0].groupBy;
        if (isGroupBy.value) {
          setGroupByList(newValue);
        }
      }
    );

    watchEffect(
      () => {
        if (!isOpen.value) {
          clearTimeout(scrollIntoViewTimeout);
        }

        if (optionListRef.value && isOpen) {
          scrollIntoViewTimeout = setTimeout(() => {
            optionListRef.value.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
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

      currentValueDisplay.value = props.options.find(
        (opt) => opt.value === props.currentValue
      )?.label;
    });

    onUnmounted(() => {
      clearTimeout(scrollIntoViewTimeout);
    });

    return {
      optionListRef,
      isOpen,
      currentValueDisplay,
      isGroupBy,
      groupByList,
    };
  },
  watch: {
    currentValue: function(newValue) {
      this.currentValueDisplay = this.options.find(
        (opt) => opt.value === newValue
      )?.label;
    },
  },
  methods: {
    onOpen: function(event) {
      if (this.isOpen && event.target.className === "main-input") {
        return;
      }

      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.$refs.myinput.focus();
      } else {
        this.$emit("onClose", "");
      }
    },
    onSelect: function(opt) {
      this.isOpen = false;
      this.$emit("onSelect", opt);
    },
    onTyping: function(opt) {
      this.$emit("onTyping", opt.target.value);
      this.$emit("onSelect", "");
      this.isOpen = true;
    },
    onFocusing: function() {
      this.isOpen = true;
    },
  },
  components: {
    ArrowIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.input {
  position: relative;
}

.input > div.button {
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
  box-sizing: border-box;
}

.input > div.button.-is-open {
  z-index: 2;
}

.main-input {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  padding-right: 1em;
  border: 0;
  background: transparent;
  font-weight: 500;
  font-size: 1rem;

  &.-text-selected {
    font-weight: bold;
  }

  &:focus {
    outline: none;
  }
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
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
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
  padding-left: 1em;
  font-weight: 400;
  cursor: pointer;
  transition: all ease 0.3s;
  color: white;
  border-bottom: solid 1px white;

  &:last-child {
    border-bottom: none;
  }
}

.option.grouped {
  border-bottom: solid 4px white;
  cursor: default;
  pointer-events: none;
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
}

@media (hover: hover) and (pointer: fine) {
  .input > div.button:hover {
    box-shadow: 0 0 0 1px white;
  }

  .option:hover {
    background-color: $yellow;
  }

  .option:not(.grouped):hover {
    background-color: $yellow;
    color: $deepblack;
  }
}
</style>
