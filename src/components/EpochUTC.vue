<template>
  <Fieldset>
    <template #legend> <h1 class="title">EPOCH ⬄ UTC</h1> </template>

    <div class="wrapper">
      <label for="epoch"
        ><h4>Epoch</h4>
        <InputNumber
          id="epoch"
          class="p-inputtext-lg"
          type="text"
          v-model="epoch"
          @input="handleInput"
      /></label>

      <div class="time-wrapper">
        <label for="time"
          ><h4>UTC</h4>
          <div class="p-field">
            <InputText
              id="time"
              type="text"
              aria-describedby="time-help"
              class="p-inputtext-lg [invalidTime === true && 'p-invalid']"
              v-model="time"
            />
            <small id="time-help" class="p-error" v-show="invalidTime"
              >YYYY-MM-DD hh:mm:ss.</small
            >
          </div>
        </label>
      </div>

      <div class="button-wrapper">
        <Button
          class="p-button-rounded"
          icon="pi pi-refresh"
          label="UTC now"
          @click="handleReset"
        />
      </div>
    </div>
  </Fieldset>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import dayjsUTCPlugin from 'dayjs/plugin/utc';
import dayjsParserPlugin from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'EpochUTC',
  setup: () => {
    dayjs.extend(dayjsUTCPlugin);
    dayjs.extend(dayjsParserPlugin);
    const _day = dayjs.utc();
    const epoch = ref(_day.unix());
    const time = ref(_day.format('YYYY-MM-DD hh:mm:ss'));
    const invalidTime = ref(false);

    watch(epoch, (current) => {
      let value = current;
      const length = current.toString().length;

      if (length < 10 || length > 13) return;
      if (length !== 10 && length !== 13) return;
      if (current.toString().length === 13) {
        value = Math.round(current / 1000);
      }

      time.value = dayjs.unix(value).utc().format('YYYY-MM-DD hh:mm:ss');
    });

    watch(time, (current) => {
      const day = dayjs.utc(current, 'YYYY-MM-DD hh:mm:ss');

      invalidTime.value = day.isValid() === false;
      if (invalidTime.value === true) {
        return;
      }

      epoch.value = day.unix();
    });

    return { epoch, time, invalidTime };
  },

  methods: {
    handleInput(event: Event) {
      // input number only update on blur
      this.epoch = parseInt((event.target as HTMLInputElement).value);
    },
    handleReset() {
      this.epoch = dayjs.utc().unix();
    },
  },
});
</script>

<style>
.title {
  font-size: 1.25rem;
}
</style>

<style scoped>
a {
  color: #42b983;
}
h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
.wrapper {
  display: flex;
}
.time-wrapper {
  margin-left: 2rem;
}
.time-wrapper .p-field {
  display: flex;
  flex-direction: column;
}

.button-wrapper {
  display: flex;
  align-items: end;
  margin-left: 2rem;
  margin-bottom: 0.525rem;
}
</style>
