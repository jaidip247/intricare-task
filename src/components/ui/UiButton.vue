<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'sm',
  },
  icon: {
    type: String,
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <v-btn
    class="ui-btn"
    :class="[`ui-btn--${variant}`, `ui-btn--${size}`]"
    :block="block"
    variant="flat"
  >
    <v-icon v-if="icon" size="15">{{ icon }}</v-icon>
    <slot />
  </v-btn>
</template>

<style scoped>
.ui-btn {
  text-transform: none;
  letter-spacing: 0;
  border-radius: 7px;
  font-weight: 600;
  white-space: nowrap;
}

.ui-btn--sm {
  height: 32px;
  min-width: 90px;
  font-size: 12px;
  gap: 6px;
  padding-inline: 12px;
}

.ui-btn--md {
  height: 38px;
  min-width: 120px;
  font-size: 13px;
  gap: 7px;
  padding-inline: 14px;
}

.ui-btn--primary {
  color: #fff;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.ui-btn--neutral {
  color: #8c93a8;
  background: #f2f3f7;
}

.ui-btn--outline {
  color: #63708f;
  background: #fff;
  border: 1px solid #dfe5ef;
}

/* Mobile: enlarge touch targets to ≥ 40px */
@media (max-width: 767px) {
  .ui-btn--sm {
    height: 40px;
    font-size: 13px;
    padding-inline: 14px;
  }
}
</style>
