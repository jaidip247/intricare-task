<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'select',
  },
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="ui-toolbar-field" :class="{ 'ui-toolbar-field--search': mode === 'search' }">
    <template v-if="mode === 'search'">
      <v-icon size="16" color="#8f96ab">mdi-magnify</v-icon>
      <span>{{ label || 'Search' }}</span>
    </template>
    <template v-else>
      <span>{{ label || 'All' }}</span>
      <v-icon size="18">mdi-menu-down</v-icon>
    </template>
  </div>
</template>

<style scoped>
.ui-toolbar-field {
  height: 30px;
  border: 1px solid #e0e4ee;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: #8e95a9;
  font-size: 11px;
  width: 136px;
}

.ui-toolbar-field--search {
  justify-content: flex-start;
  gap: 6px;
}

/* Mobile: taller touch target, flexible width */
@media (max-width: 767px) {
  .ui-toolbar-field {
    height: 40px;
    font-size: 12px;
    width: auto;
    min-width: 100px;
    flex: 1;
  }
}
</style>
