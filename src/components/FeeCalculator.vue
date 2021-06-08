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
import coefficients from '../data/coefficients.js'
import { ref, computed } from 'vue'

/* Party data setup */
const MRPs = ref(0)
const MSPs = ref(0)
const MEPs = ref(0)
const inGovernment = ref(false)
const GDP = ref(2)

/* Determine rep level */
const isLocal = computed(() => MRPs.value + MSPs.value + MEPs.value === 0)
const isRegional = computed(() => MSPs.value + MEPs.value === 0 && !isLocal.value)
const isState = computed(() => MEPs.value === 0 && !isRegional.value && !isLocal.value)
const onEuparl = computed(() => MEPs.value > 0)

/* Calculate fee */
const resultBeforeGDP = computed(() => {
  const {
    intercept, local, regional, state, euparl, government,
    MRPs: MRPCoefficient, MSPs: MSPCoefficient, MEPs: MEPCoefficient
  } = coefficients

  let fee = intercept
  fee += isLocal.value ? local : 0
  fee += isRegional.value ? regional : 0
  fee += isState.value ? state : 0
  fee += onEuparl.value ? euparl : 0
  fee += MRPs.value * MRPCoefficient
  fee += MSPs.value * MSPCoefficient
  fee += MEPs.value * MEPCoefficient
  fee += inGovernment.value ? government : 0

  return fee
})

/* Adjusted for GDP */
const resultAfterGDP = computed(() => {
  let { value: fee } = resultBeforeGDP
  const roundTo = 25
  const brackets = {
    1: 0.95,
    2: 1,
    3: 1.05
  }

  fee *= brackets[GDP.value]
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
