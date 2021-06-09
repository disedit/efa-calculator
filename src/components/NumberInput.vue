<template>
  <label :for="name" class="number-label">
    {{ label }}
  </label>
  <div class="number-input">
    <input
      type="number"
      class="form-control"
      :value="modelValue"
      :name="name"
      :id="name"
      min="0"
      @input="(e) => $emit('update:modelValue', e.target.value)">
  </div>
</template>

<script setup>
import { defineProps, defineEmit } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },

  label: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  }
})

const emits = defineEmit(['update:modelValue'])
</script>

<style lang="scss" scoped>
  .number {
    &-label {
      font-size: 1.25rem;
    }

    &-input {
      margin-left: auto;

      input {
        appearance: none;
        font-size: 3rem;
        text-align: right;
        width: 6rem;
        border: 0;
        margin: calc(var(--card-padding) * -1);
        padding: var(--card-padding);

        &:hover,
        &:focus {
          background: var(--accent-color-light);
          color: var(--accent-color);
          outline: 0;
        }
      }
    }
  }
</style>