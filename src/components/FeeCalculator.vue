<template>
  <fieldset class="calculator">
    <legend><h1>Contribution <br> Calculator</h1></legend>

    <div class="efa-card field">
      <NumberInput
        name="MRPs" 
        label="Members in the Regional Parliament"
        v-model="MRPs" />
    </div>

    <div class="efa-card field">
      <NumberInput
        name="MSPs" 
        label="Members in the State Parliament"
        v-model="MSPs" />
    </div>

    <div class="efa-card field">
      <NumberInput
        name="MEPs" 
        label="Members in the European Parliament"
        v-model="MEPs" />
    </div>

    <div class="efa-card field">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="inGovernment" v-model="inGovernment">
        <label class="form-check-label" for="inGovernment">Party is in government</label>
      </div>
    </div>

    <div class="efa-card result" aria-live="polite">
      <span class="result-label">
        Before GDP adjustment
      </span>
      <span class="result-number">
        {{ formated(resultBeforeGDP) }}
      </span>
    </div>

    <div class="efa-card field">
      <div>
        <label for="GDP">
          GDP/Inhabitant Index
        </label>
        <select v-model="GDP" name="GDP" id="GDP" class="form-select form-select-lg">
          <option value="1">&lt; 90</option>
          <option value="2">90-125</option>
          <option value="3">&gt; 125</option>
        </select>
      </div>

      <div>
        <label for="party">Or select based on party</label>
        <select name="party" id="party" @change="autoselectGDP" class="form-select form-select-lg">
          <option value="2" disabled selected>Select your party</option>
          <option v-for="party in parties" :key="party.name" :value="party.bracket">
            {{ party.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="efa-card result highlighted">
      <span class="result-label">
        Yearly contribution
      </span>
      <span class="result-number">
        {{ formated(resultAfterGDP) }}
      </span>
    </div>
  </fieldset>
</template>

<script setup>
import NumberInput from './NumberInput.vue'
import { coefficients, roundTo, GDPBrackets, parties } from '../settings.js'
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
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(number)
}

/* GDP party selector */
const autoselectGDP = (e) => {
  GDP.value = e.target.value
}
</script>

<style lang="scss" scoped>
.calculator {
  position: relative;
  border: 0;
  margin: 2rem 0;
  padding: 0;

  legend h1 {
    font-weight: bold;
    color: var(--accent-color);
    font-size: 3.75rem;
    margin: 0 0 1.25rem;
    line-height: .9;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate(3rem, 0);
    background: var(--gray-light);
  }
}

.efa-card {
  --card-padding: 1rem;
  background: var(--white);
  box-shadow: var(--box-shadow);
  padding: var(--card-padding);
  margin: 2rem 0;
}

.field {
  display: flex;
  box-shadow: var(--box-shadow);
  align-items: center;
  font-size: 1.25rem;
}

.result {
  display: flex;
  color: var(--accent-color);
  font-size: 1.25rem;
  align-items: center;
  font-weight: bold;

  &.highlighted {
    color: var(--white);
    background: var(--accent-color);
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  &-number {
    font-size: 2rem;
    font-weight: bold;
    margin-left: auto;
  }
}

@media (max-width: 750px) {
  .calculator {
    &::before {
      transform: none;
    }
  }
}
</style>
