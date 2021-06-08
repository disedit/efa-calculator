<template>
  <label for="MRPs">
    MRPs
    <input type="number" v-model="MRPs" name="MRPs" id="MRPs">
  </label>
  <label for="MSPs">
    MSPs
    <input type="number" v-model="MSPs" name="MSPs" id="MSPs">
  </label>
  <label for="MEPs">
    MEPs
    <input type="number" v-model="MEPs" name="MEPs" id="MEPs">
  </label>

  <label for="inGovernment">
    inGovernment
    <input type="checkbox" v-model="inGovernment" name="inGovernment" id="inGovernment">
  </label>

  <p>Result: {{ formated(resultBeforeGDP) }}</p>

  <label for="GDP">
    GDP
    <select v-model="GDP" name="GDP" id="GDP">
      <option value="1">&lt; 90</option>
      <option value="2">90-125</option>
      <option value="3">&gt; 125</option>
    </select>
  </label>

  <p>Result: {{ formated(resultAfterGDP) }}</p>
</template>

<script setup>
import { coefficients, roundTo, GDPBrackets } from '../settings.js'
import { ref, computed } from 'vue'

/* Party data setup */
const MRPs = ref(0)
const MSPs = ref(0)
const MEPs = ref(0)
const inGovernment = ref(false)
const GDP = ref(2)

/* Determine highest representative level */
const repLevel = computed(() => {
  if (MEPs.value > 0) return 'euparl'
  if (MSPs.value > 0) return 'state'
  if (MRPs.value > 0) return 'regional'
  return 'local'
})

/* Calculate fee */
const resultBeforeGDP = computed(() => {
  let fee = coefficients.intercept
  fee += coefficients[repLevel.value]
  fee += MRPs.value * coefficients.MRPs
  fee += MSPs.value * coefficients.MSPs
  fee += MEPs.value * coefficients.MEPs
  fee += inGovernment.value ? coefficients.government : 0

  return fee
})

/* Adjusted for GDP */
const resultAfterGDP = computed(() => {
  let { value: fee } = resultBeforeGDP
  fee *= GDPBrackets[GDP.value]
  return roundTo * Math.round(fee / roundTo)
})

/* Formated result */
const formated = (number) => {
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(number)
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
