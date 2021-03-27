<template>
  <Fieldset>
    <template #legend> <h1 class="title">DECIMAL ⬄ HEX</h1> </template>

    <div class="wrapper">
      <label for="decimal">
        <h4>Decimal</h4>
        <div class="p-inputgroup">
          <InputNumber
            id="decimal"
            class="p-inputtext-lg"
            v-model="state.decimal"
            @input="handleInput"
          /><Button
            :icon="
              state.copied.decimal === false ? 'pi pi-copy' : 'pi pi-check'
            "
            class="p-button-lg"
            @click="handleCopy('decimal')"
          /></div
      ></label>

      <label for="hex">
        <h4>Hex</h4>
        <div class="p-inputgroup">
          <InputText id="hex" class="p-inputtext-lg" v-model="state.hex" />
          <Button
            :icon="state.copied.hex === false ? 'pi pi-copy' : 'pi pi-check'"
            class="p-button-lg"
            @click="handleCopy('hex')"
          />
        </div>
      </label>
    </div>
  </Fieldset>
</template>

<script lang="ts">
import { defineComponent, watch, reactive } from 'vue';

interface IState {
  decimal: number;
  hex: string;
  copied: {
    decimal: boolean;
    hex: boolean;
  };
}

export default defineComponent({
  name: 'DecimalHex',
  setup: () => {
    const state: IState = reactive({
      decimal: 1000,
      hex: '0x' + parseInt('1000').toString(16),
      copied: {
        decimal: false,
        hex: false,
      },
    });

    watch(
      () => state.decimal,
      (current) => {
        state.hex = '0x' + current.toString(16);
      }
    );

    watch(
      () => state.hex,
      (current) => {
        state.decimal = parseInt(current.substr(2), 16);
      }
    );

    return {
      state: state,
    };
  },
  methods: {
    handleCopy(type: 'decimal' | 'hex') {
      const setCopy = (type: 'decimal' | 'hex') => {
        this.state.copied[type] = true;

        setTimeout(() => {
          this.state.copied[type] = false;
        }, 1000);
      };

      // query permission
      navigator.permissions
        .query({ name: 'clipboard-write' })
        .then((result) => {
          if (result.state === 'granted') {
            navigator.clipboard
              .writeText(this.state[type].toString())
              .then(() => {
                setCopy(type);
              });
          }
        })
        // it's such. Firefox does not support clipboard write YET
        .catch(() => {
          const text = document.getElementById(type) as HTMLInputElement;
          if (text != null) {
            text.select();
            document.execCommand('copy');
            setCopy(type);
          }
        });
    },

    handleInput(event: HTMLInputElement) {
      // input number only update on blur
      this.state.decimal = parseInt(event.value);
    },
  },
});
</script>

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
.wrapper label {
  margin-right: 2.5rem;
}
</style>
