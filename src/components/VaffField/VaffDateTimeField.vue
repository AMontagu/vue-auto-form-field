<template>
  <v-menu
    :nudge-right="40"
    :close-on-content-click="false"
    class="vaffDateTime"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
    data-app="true"
  >
    <v-text-field
      slot="activator"
      :value="dateTime"
      :label="label"
      class="datetimeText"
      prepend-icon="event"
      readonly
    />
		
    <v-card>
      <v-date-picker
        v-if="type === 'date' || type === 'datetime'"
        v-model="date"
        :locale="$getLocaleBCPTag()"
        class="dateInput"
      />

      <!--v-layout row>
				<p class="text-xs-center full">TIME:</p>
			</v-layout-->

      <v-layout
        v-if="type === 'time' || type === 'datetime'"
        row
        align-center
        justify-content
        class="timeInput"
      >
        <v-flex xs5>
          <v-select
            id="selectHours"
            v-model="hours"
            :items="hoursArray"
            dense
          />
        </v-flex>
        <v-flex xs2>
          :
        </v-flex>
        <v-flex xs5>
          <v-select
            v-model="minutes"
            :items="minutesArray"
            dense
          />
        </v-flex>
      </v-layout>
    </v-card>
  </v-menu>
</template>

<script>
import Moment from 'moment';

export default {
	name: 'VaffDateTimeField',
	props: {
		value: {
			type: [Object, String],
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'datetime',
		},
		dateFormat: {
			type: String,
			default: 'YYYY-MM-DD',
		},
		format: {
			type: String,
			default: 'YYYY-MM-DDTHH:mm:ssZ',
		},
	},
	data() {
		return {
			date: null,
			hours: null,
			minutes: null,
			vuetifyDateFormat: 'YYYY-MM-DD',
		};
	},
	computed: {
		valueFormated() {
			if (typeof this.value === 'string') {
				let date = Moment(this.value, this.format);
				if (!date.isValid()) {
					date = Moment(this.value);
				}
				return date;
			}
			return Moment(this.value);
		},
		dateTime() {
			let str = '';
			if (
				this.date !== null &&
				(this.type === 'date' || this.type === 'datetime')
			) {
				str += Moment(this.date, this.vuetifyDateFormat).format(
					this.dateFormat
				);
			}
			if (
				this.hours !== null &&
				this.minutes !== null &&
				(this.type === 'time' || this.type === 'datetime')
			) {
				if (str) {
					str += ' ';
				}
				str += `${this.hours}:${this.minutes}`;
			}
			return str;
		},
		hoursArray() {
			return Array.from(new Array(24).keys(), item => {
				return ('0' + item).slice(-2);
			});
		},
		minutesArray() {
			return Array.from(new Array(60).keys(), item => {
				return ('0' + item).slice(-2);
			});
		},
	},
	watch: {
		date() {
			this.constructDateAndEmit();
		},
		hours() {
			this.constructDateAndEmit();
		},
		minutes() {
			this.constructDateAndEmit();
		},
	},
	created() {
		if (Object.keys(this.valueFormated).length > 0) {
			this.date = this.valueFormated.format(this.vuetifyDateFormat);
			this.hours = ('0' + this.valueFormated.hours()).slice(-2);
			this.minutes = ('0' + this.valueFormated.minutes()).slice(-2);
		}
	},
	mounted() {},
	methods: {
		constructDateAndEmit() {
			let newDate = Moment(this.date, this.vuetifyDateFormat)
				.hours(parseInt(this.hours))
				.minutes(parseInt(this.minutes));
			this.$emit('input', newDate, newDate.format(this.format));
		},
	},
};
</script>

<style lang="scss" scoped>
.timeInput {
	text-align: center;
	max-width: 175px;
	margin: auto;
}
</style>
