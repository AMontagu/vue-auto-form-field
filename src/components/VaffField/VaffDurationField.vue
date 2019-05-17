<template>
  <div>
    <v-layout
      class="vaffDuration"
      row
      wrap
      data-app="true"
    >
      <v-flex
        v-for="option in durationSupported"
        :key="option"
        :px-3="$vuetify.breakpoint.smAndUp"
        :my-2="$vuetify.breakpoint.xsOnly"
        xs12
        sm6
      >
        <v-text-field
          :ref="`input-${option}`"
          :label="$vaffT(`vaffField.vaffDurationField.${option}`)"
          :value="modelDuration[option]"
          :class="`${option}Input`"
          hide-details
          type="number"
          class="inputDuration"
          @input="recalculateDuration(option, $event)"
        />
      </v-flex>
    </v-layout>
    <p
      v-if="limitReached"
      style="margin-top: 10px; margin-bottom: 0; color: darkorange"
    >
      {{ limitReached }} value reached
    </p>
  </div>
</template>

<script>
export default {
	name: 'VaffDurationField',
	props: {
		value: {
			type: Number,
			default: 0,
		},
		durationSupported: {
			type: Array,
			default: () => ['seconds', 'minutes', 'hours', 'days', 'months', 'years']
		},
		min: {
			type: [String, Number],
			default: undefined
		},
		max: {
			type: [String, Number],
			default: undefined
		}
	},
	data() {
		return {
			modelDuration: null,
			limitReached: '',
		}
	},
	watch: {
		value(newValue) {
			let tmpValue = this.tryParseInt(newValue, 0);
			this.modelDuration = this.getDurationFromValue(newValue);
		}
	},
	created() {

		let tmpValue = this.tryParseInt(this.value, 0);
		this.modelDuration = this.getDurationFromValue(tmpValue);
	},
	mounted() {},
	methods: {

		getDurationFromValue(tmpValue) {
			let divisor = 1;

			if (this.durationSupported.includes('seconds')) {
				divisor = 60 * 60 * 24 * 30 * 12;
			} else if (this.durationSupported.includes('minutes')) {
				divisor *= 60 * 24 * 30 * 12;
			} else if (this.durationSupported.includes('hours')) {
				divisor *= 24 * 30 * 12;
			} else if (this.durationSupported.includes('days')) {
				divisor *= 30 * 12;
			} else if (this.durationSupported.includes('months')) {
				divisor = 12;
			}

			//-----

			let modelDuration = {};

			if (this.durationSupported.includes('years')) {
				modelDuration.years = this.tryParseInt(tmpValue / divisor, 0);
				tmpValue -= modelDuration.years * divisor;
			}
			divisor /= 12;

			if (this.durationSupported.includes('months')) {
				modelDuration.months = this.tryParseInt(tmpValue / divisor, 0);
				tmpValue -= modelDuration.months * divisor;
			}
			divisor /= 30;

			if (this.durationSupported.includes('days')) {
				modelDuration.days = this.tryParseInt(tmpValue / divisor, 0);
				tmpValue -= modelDuration.days * divisor;
			}
			divisor /= 24;

			if (this.durationSupported.includes('hours')) {
				modelDuration.hours = this.tryParseInt(tmpValue / divisor, 0);
				tmpValue -= modelDuration.hours * divisor;
			}
			divisor /= 60;

			if (this.durationSupported.includes('minutes')) {
				modelDuration.minutes = this.tryParseInt(tmpValue / divisor, 0);
				tmpValue -= modelDuration.minutes * divisor;
			}
			divisor /= 60;

			if (this.durationSupported.includes('seconds')) {
				modelDuration.seconds = this.tryParseInt(tmpValue / divisor, 0);
			}

			return modelDuration;
		},

		tryParseInt(str, defaultValue) {
			// this is for avoid mismatch beacause of exponientielle javascript representation
			if (typeof str === 'number') {
				str = str.toFixed(19);
			}

			let retValue = defaultValue;
			if (str !== null && typeof str !== 'undefined') {
				if (str.length > 0) {
					if (!isNaN(str)) {
						retValue = parseInt(str);
					}
				}
			}
			return retValue;
		},
		recalculateDuration(option, value) {
			let modelDuration = Object.assign({}, this.modelDuration);
			modelDuration[option] = value;

			let tmpValue = 0;
			let multiplier = 1;
			if (this.durationSupported.includes('seconds')) {
				tmpValue = tmpValue * 60 + this.tryParseInt(modelDuration.seconds, 0);
				multiplier = 60;
			}

			if (this.durationSupported.includes('minutes')) {
				tmpValue =
					tmpValue + this.tryParseInt(modelDuration.minutes, 0) * multiplier;
				multiplier *= 60;
			} else if (multiplier !== 1) {
				multiplier *= 60;
			}

			if (this.durationSupported.includes('hours')) {
				tmpValue =
					tmpValue + this.tryParseInt(modelDuration.hours, 0) * multiplier;
				multiplier *= 24;
			} else if (multiplier !== 1) {
				multiplier *= 24;
			}

			if (this.durationSupported.includes('days')) {
				tmpValue =
					tmpValue + this.tryParseInt(modelDuration.days, 0) * multiplier;
				multiplier *= 30;
			} else if (multiplier !== 1) {
				multiplier *= 30;
			}

			if (this.durationSupported.includes('months')) {
				tmpValue =
					tmpValue + this.tryParseInt(modelDuration.months, 0) * multiplier;
				multiplier *= 12;
			} else if (multiplier !== 1) {
				multiplier *= 12;
			}

			if (this.durationSupported.includes('years')) {
				tmpValue = tmpValue + this.tryParseInt(modelDuration.years, 0) * multiplier;
			}

			if(tmpValue === this.value) {
				return;
			}

			if(typeof this.min !== 'undefined' && tmpValue < parseInt(this.min)) {
				tmpValue = this.tryParseInt(this.min);
				this.limitReached = 'Min';
			} else if(typeof this.max !== 'undefined' && tmpValue > parseInt(this.max)) {
				tmpValue = this.tryParseInt(this.max);
				this.limitReached = 'Max';
			} else {
				this.limitReached = '';
			}

			this.$emit('input', tmpValue);

			this.$nextTick(() => {
				const modelDuration = this.getDurationFromValue(tmpValue);
				Object.keys(modelDuration).forEach((timeUnit) => {
					if(this.$refs[`input-${timeUnit}`]) {
						if(this.$refs[`input-${timeUnit}`][0].internalValue !== modelDuration[timeUnit]) {
							this.$refs[`input-${timeUnit}`][0].internalValue = modelDuration[timeUnit]
						}
					}
				});
			})
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
