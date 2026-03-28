<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectValue = value => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="ui-segmented-tabs">
    <button
      v-for="option in options"
      :key="option.value"
      class="ui-segmented-tabs__btn"
      :class="{ active: modelValue === option.value }"
      type="button"
      @click="selectValue(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.ui-segmented-tabs {
  display: inline-flex;
  border: 1px solid #dfe5ef;
  border-radius: 6px;
  overflow: hidden;
}

.ui-segmented-tabs__btn {
  border: 0;
  border-right: 1px solid #dfe5ef;
  background: #fff;
  color: #68718d;
  font-size: 12px;
  min-width: 64px;
  padding: 2px 10px;
}

.ui-segmented-tabs__btn:last-child {
  border-right: 0;
}

.ui-segmented-tabs__btn.active {
  background: #eef3ff;
  color: #3f6bff;
}

/* Mobile: larger touch targets */
@media (max-width: 767px) {
  .ui-segmented-tabs__btn {
    min-width: 56px;
    padding: 6px 10px;
    min-height: 36px;
  }
}
</style>
