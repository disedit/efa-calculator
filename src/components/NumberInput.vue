<template>
  <div class="number">
    <label :for="name" class="number-label">
      {{ label }}
    </label>
    <div class="number-input">
      <button class="btn stepper subtract" @click="subtract">-</button>
      <input
        type="number"
        class="form-control"
        :value="modelValue"
        :name="name"
        :id="name"
        min="0"
        max="99"
        maxlength="2"
        @input="(e) => $emit('update:modelValue', e.target.value)">
      <button class="btn stepper add" @click="add">+</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmit, useContext } from 'vue'

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
const { emit } = useContext()

const add = () => {
  const result = parseInt(props.modelValue) + 1
  emit('update:modelValue', (result < 100) ? result : 99)
}

const subtract = () => {
  const result = parseInt(props.modelValue) - 1
  emit('update:modelValue', (result > 0) ? result : 0)
}
</script>

<style lang="scss" scoped>
  .number {
    flex-grow: 1;
    display: flex;
    margin: calc(var(--card-padding) * -1);

    &:hover,
    &:focus-within {
      .number-input {
        background: var(--accent-color-light);
        color: var(--accent-color);
      }

      .stepper {
        background: var(--accent-color-shade);
        color: var(--accent-color);
      }
    }

    &-label {
      font-size: 1.25rem;
      flex-grow: 1;
      align-self: stretch;
      display: flex;
      align-items: center;
      padding: var(--card-padding);
    }

    &-input {
      position: relative;
      margin-left: 1rem;
      color: var(--black);
      transition: .2s ease;

      .stepper {
        appearance: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: var(--gray-light);
        color: var(--gray-dark);
        border: 0;
        border-radius: 100%;
        padding: 0;
        width: 1.6em;
        height: 1.6em;
        font-size: 1.25rem;

        &:active {
          background: var(--accent-color);
          color: var(--white);
        }

        &.subtract {
          left: 1rem;
        }

        &.add {
          right: 1rem;
        }
      }

      input {
        appearance: none;
        -moz-appearance: textfield;
        font-size: 3rem;
        text-align: right;
        width: 11.5rem;
        border: 0;
        padding: var(--card-padding) 4rem;
        color: inherit;
        background: transparent;
        text-align: center;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
</style>