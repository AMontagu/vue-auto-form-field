<template>
  <v-layout
    column
    class="vaffColorField"
    style="position: relative; display: flex; align-items: center; justify-content: flex-end"
    my-2
  >
    <div
      id="colorPicker"
      :style="{'background-color': value}"
      style="width: 50px; height: 50px; border-radius: 50%; margin-bottom:10px; text-align: center"
    />
    <v-btn
      id="btnShowPicker"
      :medium="$vuetify.breakpoint.xlOnly"
      :small="$vuetify.breakpoint.lgAndDown"
      :class="{'caption': $vuetify.breakpoint.smAndDown}"
      color="primary"
      dark
      depressed
      @click="showColorPicker=true"
    >
      <v-icon
        :small="$vuetify.breakpoint.lgAndDown"
        class="mr-2 hidden-xs-only"
      >
        add_circle_outline
      </v-icon>{{ $vaffT('vaffField.vaffColorField.PickColor') }}
    </v-btn>

    <div
      v-if="showColorPicker"
      class="colorPickerContainer"
    >
      <sketch-picker
        id="picker"
        :value="value"
        @input="$emit('input', $event)"
      />
      <v-btn
        id="btnHiddenPicker"
        :small="$vuetify.breakpoint.smAndDown"
        color="primary"
        dark
        depressed
        @click="showColorPicker=false"
      >
        {{ $vaffT('vaffField.vaffColorField.Close') }}
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import { Sketch } from 'vue-color';
export default {
	name: 'VaffColorField',
	components: {
		SketchPicker: Sketch,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			showColorPicker: false,
		};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.colorPickerContainer {
	position: absolute;
	z-index: 5000;
	text-align: center;
	padding: 10px 10px 10px;
	box-sizing: initial;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.15);

	.vc-sketch {
		box-shadow: none;
	}
}
</style>
