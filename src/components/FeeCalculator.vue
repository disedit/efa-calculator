<template>
  <fieldset class="calculator">
    <legend><h1>Contribution <br> Calculator</h1></legend>

    <div class="background">
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

      <div class="efa-card field gdp">
        <div class="columns">
          <div class="column party-column">
            <label for="party">Select Region's GDP Index based on party</label>
            <select name="party" id="party" @change="autoselectGDP" class="form-select form-select-lg">
              <option value="2" disabled selected>Select your party</option>
              <option v-for="party in parties" :key="party.name" :value="party.bracket">
                {{ party.name }}
              </option>
            </select>
          </div>
          <div class="column index-column">
            <label for="GDP">
              GDP/Inhabitant Index
            </label>
            <select v-model="GDP" name="GDP" id="GDP" class="form-select form-select-lg">
              <option value="1">&lt; 90</option>
              <option value="2">90-125</option>
              <option value="3">&gt; 125</option>
            </select>
          </div>
        </div>

        <div class="source">
          Average EU-28 (2017) = 100.
          Index based on GDP in Purchasing Power Standards (PPS) in relation to the EU-28 average, by NUTS 2 regions.
          Source: <a href="https://ec.europa.eu/eurostat/documents/3217494/10095393/KS-HA-19-001-EN-N.pdf/d434affa-99cd-4ebf-a3e3-6d4a5f10bb07?t=1574339587000" target="_blank" rel="noopener noreferer">Eurostat</a>
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
    </div>
  </fieldset>
</template>

<script setup>
import { ref, computed } from 'vue'
import { coefficients, roundTo, GDPBrackets, parties } from '../settings.js'
import NumberInput from './NumberInput.vue'

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
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number)
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

  h1 {
    font-weight: bold;
    color: var(--accent-color);
    font-size: 3.75rem;
    margin: 0 0 4rem;
    line-height: .9;
  }

  .background{
    position: relative;

    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: -3rem;
      left: 3rem;
      right: -3rem;
      bottom: -3rem;
      background: var(--gray-light);
    }
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
    margin-top: -2rem;
  }

  &-number {
    font-size: 2rem;
    font-weight: bold;
    margin-left: auto;
  }
}

.columns {
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
  align-self: stretch;

  label {
    margin-bottom: .5rem;
  }

  .form-select {
    margin-top: auto;
  }

  &.index-column {
    width: 250px;
    margin-left: 1rem;
  }

  &.full {
    width: 100%;
  }
}

.field.gdp {
  display: block;
}

.source {
  display: block;
  font-size: .85rem;
  line-height: 1.1;
  margin-top: 1rem;
}

@media (max-width: 750px) {
  .calculator {
    h1 {
      margin-bottom: 2rem;
      font-size: 3rem;
    }

    .background::before {
      top: -1rem;
      left: -1rem;
      bottom: -1rem;
      right: -1rem;
    }

    .field {
      margin: 1rem 0;
    }

    .result.highlighted {
      margin-top: -1rem;
    }

    .columns {
      flex-direction: column;
    }

    .column {
      width: 100%;
    }

    .party-column {
      margin-top: 1rem;
    }
  }
}
</style>
