<template>
  <div class="dropdown">
    <div class="overlay" v-if="isOpen" @click="onOpen"></div>
    <button @click="onOpen" :class="{ '-is-open': isOpen }">
      <span>{{ currentValueDisplay }}</span
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

<script setup>
  import ArrowIcon from "@/icons/ArrowIcon.vue";
  import {
    ref,
    toRefs,
    watch,
    watchEffect,
    onMounted,
    onUnmounted,
  } from "vue";

  const props = defineProps(['currentValue', 'options'])

  const emits = defineEmits([
    'onSelect',
  ])

  const {
    currentValue,
    options,
  } = toRefs(props);

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
    () => options.value,
    (newValue) => {
      isGroupBy.value = newValue.length && !!newValue[0].groupBy;
      if (isGroupBy.value) {
        setGroupByList(newValue);
      }
    }
  );

  watch(
    () => currentValue.value,
    (newValue) => {
      currentValueDisplay.value = options.value.find(
        (opt) => opt.value === newValue
      )?.label;
    },
  );

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
          } else {
            optionListRef.value.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 250);
      }
    },
    {
      flush: "post",
    }
  );

  const onOpen = () => {
    isOpen.value = !isOpen.value;
  }
  
  const onSelect = (opt) => {
    isOpen.value = false;
    emits("onSelect", opt);
  }

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
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.dropdown {
  position: relative;
}

.dropdown > button {
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
  transition: all ease 0.3s;
  color: black;
}

.dropdown > button.-is-open {
  z-index: 2;
}

.dropdown > button > span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
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
  transition-property: background-color, color;
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
  transition-property: opacity, transform;
}

@media (hover: hover) and (pointer: fine) {
  .dropdown > button:hover {
    box-shadow: 0 0 0 1px white;
  }

  .option:not(.grouped):hover {
    background-color: $yellow;
    color: $deepblack;
  }
}
</style>
