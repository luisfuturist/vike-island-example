<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  count: number;
}>();
const count = ref(props.count || 0);

const incrementCount = () => {
  count.value++;
};
const decrementCount = () => {
  count.value++;
};
</script>

<template>
  <div>
    <button @click="decrementCount" style="color: #060; font-weight: 800">
      -
    </button>
    <span>{{ count }}</span>
    <button @click="incrementCount" style="color: #060; font-weight: 800">
      +
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 4px;
  justify-content: left;
  align-items: center;
}
</style>