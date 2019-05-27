<template>
  <v-layout
    v-if="!displayAs('hidden')"
    :align-center="!$vuetify.breakpoint.xsOnly || displayAs('checkbox')"
    :column="$vuetify.breakpoint.xsOnly && !displayAs('checkbox')"
    my-2
    class="input-container"
    row
    px-3
  >
    <v-flex
      v-if="visualStyle === 'separate'"
      :xs10="displayAs('checkbox')"
      :xs6="!displayAs('checkbox') && !$vuetify.breakpoint.xsOnly"
      :xs12="$vuetify.breakpoint.xsOnly && !displayAs('checkbox')"
      column
    >
      <label
        :class="{'body-1': $vuetify.breakpoint.xlOnly, 'caption': $vuetify.breakpoint.lgAndDown}"
        class="input-label"
      >{{ $getValueTranslated(field["@label"]) }}</label>
      <p
        v-if="'@hint' in field && $getValueTranslated(field['@hint']) !== ''"
        :class="{'legend': $vuetify.breakpoint.xlOnly, 'caption': $vuetify.breakpoint.lgAndDown}"
      >
        {{ $getValueTranslated(field['@hint']) }}
      </p>
    </v-flex>

    <v-flex
      :xs2="displayAs('checkbox') && visualStyle === 'separate'"
      :xs6="!displayAs('checkbox') && visualStyle === 'separate' && !$vuetify.breakpoint.xsOnly"
      :xs12="visualStyle === 'inline' || $vuetify.breakpoint.xsOnly && !displayAs('checkbox')"
    >
      <template v-if="displayAsMedia()">
        <vaff-media-field
          v-model="innerValue"
          :type="field['@options'].displayAs"
          :default-value="field['@default']"
          :identifier="identifier"
          @deleteMedia="$emit('deleteMedia', $event)"
        />
      </template>

      <v-layout
        v-else-if="displayAs('select')"
        :pl-3="visualStyle != 'inline' && !$vuetify.breakpoint.xsOnly"
        class="input select"
      >
        <v-select
          v-model="innerValue"
          v-bind="getAttributesDependOnStyle()"
          :items="selectFieldOptionsDataTranslated"
          item-value="value"
          item-text="label"
        />
      </v-layout>

      <v-layout
        v-else-if="displayAs('checkbox')"
        align-center
        justify-content
      >
        <v-switch
          v-model="innerValue"
          v-bind="getAttributesDependOnStyle()"
        />
      </v-layout>

      <v-layout
        v-else-if="displayAs('multiplecheckbox')"
        row
        wrap
        mt-3
      >
        <v-flex
          v-if="visualStyle === 'inline'"
          xs12
          justify-start
          style="text-align: left"
          mb-2
        >
          <label
            :class="{'body-1': $vuetify.breakpoint.xlOnly, 'caption': $vuetify.breakpoint.lgAndDown}"
            class="input-label"
          >{{ $getValueTranslated(field['@label']) }}</label>
          <p
            v-if="'@hint' in field && $getValueTranslated(field['@hint']) !== ''"
            :class="{'legend': $vuetify.breakpoint.xlOnly, 'caption': $vuetify.breakpoint.lgAndDown}"
          >
            {{ $getValueTranslated(field['@hint']) }}
          </p>
        </v-flex>


        <v-flex
          v-for="data in field['@options'].data"
          :key="getKeyOrValue(data, 'value')"
          style="min-width:180px"
        >
          <v-switch
            v-model="innerValue"
            :label="getKeyOrValue(data, 'value')"
            :value="getKeyOrValue(data, 'value')"
            hide-details
          />

          <!--input class="checkbox" type="checkbox" :id="data.value ? data.value+randomId : data+randomId" :checked="checkIfTrue(data.value ? data.value : data)" v-on:change="multipleCheckboxChange(data.value ? data.value : data)"/>
					<label :for="data.value ? data.value+randomId : data+randomId"></label-->
        </v-flex>
      </v-layout>

      <vaff-duration-field
        v-else-if="displayAs('duration')"
        v-model="innerValue"
        :duration-supported="getDurationPeriods()"
        :min="field['@options'].data.min"
        :max="field['@options'].data.max"
      />

      <vaff-color-field
        v-else-if="displayAs('color')"
        :value="innerValue"
        @input="colorChange"
      />

      <v-layout v-else-if="displayAs('datetime')">
        <vaff-date-time-field
          :value="innerValue"
          :date-format="getKeyOrDefault(getOptionsDataOrDefault('data', {}), 'dateFormat')"
          :format="getKeyOrDefault(getOptionsDataOrDefault('data', {}), 'format')"
          :type="getKeyOrDefault(getOptionsDataOrDefault('data', {}), 'type')"
          @input="dateChange(...arguments)"
        />
      </v-layout>

      <v-layout
        v-else
        :pl-3="visualStyle != 'inline' && !$vuetify.breakpoint.xsOnly"
        class="input"
      >
        <v-text-field
          v-if="displayAs('number')"
          :id="randomId"
          v-model="innerValue"
          v-bind="getAttributesDependOnStyle()"
          type="number"
        />

        <v-textarea
          v-else-if="displayAs('textarea')"
          :id="randomId"
          v-model="innerValue"
          v-bind="getAttributesDependOnStyle()"
          outline
        />

        <v-flex v-else-if="displayAs('password')">
          <vaff-password-field
            v-model="innerValue"
            v-bind="getAttributesDependOnStyle()"
          />
        </v-flex>

        <p v-else-if="displayAs('readonly')">
          {{ innerValue }}
        </p>

        <v-layout
          v-else-if="displayAs('slider')"
          row
        >
          <v-flex
            xs8
            pr-3
          >
            <v-slider
              v-model="innerValue"
              :min="getKeyOrDefault(getOptionsDataOrDefault('data', {}), 'min', 0)"
              :max="getKeyOrDefault(getOptionsDataOrDefault('data', {}), 'max', 100)"
              :step="getKeyOrDefault(getOptionsDataOrDefault('data', {}), 'step', 1)"
              thumb-label
            />
          </v-flex>
          <v-flex
            xs4
            pl-3
          >
            <v-text-field
              v-model="innerValue"
              type="number"
            />
          </v-flex>
        </v-layout>

        <v-text-field
          v-else
          :id="randomId"
          v-model="innerValue"
          v-bind="getAttributesDependOnStyle()"
        />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import LoggerMixin from '../LoggerMixin';

export default {
	name: 'VaffField',
	mixins: [LoggerMixin],
	props: {
		value: {
			type: [String, Number, Boolean, Object, Array],
			required: true,
		},
		field: {
			type: Object,
			required: true,
		},
		identifier: {
			type: String,
			default: '',
		},
		visualStyle: {
			type: String,
			default: 'separate',
		},
	},
	data() {
		return {
			innerValue: null,
			randomId: null,
			showVaffMedia: false,
			isLocalMedia: false,
		};
	},
	computed: {
		styleAllowDetails() {
			return this.visualStyle === 'inline';
		},
		selectFieldOptionsDataTranslated() {
			let newData = []
			if(this.displayAs('select')) {
				this.field['@options'].data.forEach((subField) => {
					if(typeof subField === 'object') {
						let subDataTmp = {}
							Object.keys(subField).forEach(key => {
								subDataTmp[key] = this.$getValueTranslated(subField[key])
							})
							newData.push(subDataTmp)
					} else {
						newData.push(subField)
					}
				});
			}
			return newData
		}
	},
	watch: {
		innerValue(newValue, oldValue) {
			if (oldValue !== null) {
				if (this.displayAs('number')) {
					newValue = parseFloat(newValue)
        }
				this.$emit('input', newValue);
			}
		},
		value(val) {
			if (!isEqual(val, this.innerValue)) {
				this.innerValue = cloneDeep(this.value);
				this.initializeData();
			}
		},
	},
	created() {
		this.randomId = Math.random()
			.toString(36)
			.substr(2, 5);
		this.innerValue = cloneDeep(this.value);
		this.initializeData();
	},
	methods: {
		initializeData() {
			if (this.displayAs('checkbox') && typeof this.innerValue !== 'boolean') {
				if (typeof this.innerValue !== 'undefined') {
					this.innerValue = this.innerValue.toLowerCase() === 'true';
				} else {
					this.LOGWARNING('InnerValue undefined for field: ', this.field);
				}
			}
		},
		getKeyOrValue(value, key) {
			return typeof value[key] !== 'undefined' ? this.$getValueTranslated(value[key]) : this.$getValueTranslated(value);
		},
		getOptionsDataOrDefault(option, defaultValue) {
			return this.getKeyOrDefault(this.field['@options'], option, defaultValue);
		},
		getKeyOrDefault(data, option, defaultValue) {
			if (typeof data !== 'undefined' && typeof data[option] !== 'undefined') {
				return data[option];
			} else {
				return defaultValue;
			}
		},
		/*checkIfTrue(data) {
				return this.innerValue.indexOf(data) !== -1;
			},
			multipleCheckboxChange(data) {
				let index = this.innerValue.indexOf(data);
				if (index === -1) {
					this.innerValue.push(data)
				} else {
					this.innerValue.slice(index, 1)
				}
			},*/
		displayAsMedia() {
			return (
				this.displayAs('image') ||
				this.displayAs('video') ||
				this.displayAs('sound') ||
				this.displayAs('file') ||
				this.displayAs('media') ||
				this.displayAs('map')
			);
		},
		displayAs(type) {
			return (
				typeof this.field['@options'] !== 'undefined' &&
				typeof this.field['@options'].displayAs !== 'undefined' &&
				this.field['@options'].displayAs.toLowerCase() === type
			);
		},
		getAttributesDependOnStyle() {
			return {
				'hide-details': !this.styleAllowDetails,
				label: this.styleAllowDetails ? this.$getValueTranslated(this.field['@label']) : null,
				hint: this.getHintIfStyleAllowIt(),
				'persistent-hint': this.styleAllowDetails,
				placeholder: this.styleAllowDetails ? null : this.$getValueTranslated(this.field['@label']),
				solo: this.visualStyle === 'solo',
				outline: this.visualStyle === 'outline',
			};
		},
		getHintIfStyleAllowIt() {
			if (
				this.styleAllowDetails &&
				'@hint' in this.field &&
				this.$getValueTranslated(this.field['@hint']) !== ''
			) {
				return this.$getValueTranslated(this.field['@hint']);
			}
		},
		dateChange(date, dateFormated) {
			this.innerValue = dateFormated;
		},
		colorChange(colorObject) {
			if (typeof colorObject === 'object') {
				this.innerValue = colorObject.hex;
			}
		},
		getDurationPeriods() {
			if(!this.field['@options'].data) {
				return undefined;
			}

			// Support old options version
			if(Array.isArray(this.field['@options'].data)) {
				this.LOGWARNING('DEPRECATED: Passing an array to data options of duration field has been moved into the \'periods\' key. Please refer to the documentation.')
				return this.field['@options'].data
			}

			return this.field['@options'].data.periods;
		}
	},
};
</script>

<style lang="scss" scoped>
.input-container {
	.v-input {
		margin-top: 0 !important;
    padding-top: 0 !important;
	}

	p {
		margin-bottom: 0px;
	}

	.input-label {
		font-weight: 600;
		color: #66717a;
	}

	.legend {
		font-size: 14px;
		margin-bottom: 0;
	}

	.type {
		font-style: italic;
	}

	.form {
		min-width: 100px;
		text-align: right;

		input[type='text'],
		select {
			width: 100%;
			padding: 6px 15px;
			outline: none;
			border: 1px solid #e9e9ea;
			border-radius: 4px;
		}

		select {
			background: #fff;
			color: #66717a;
			height: 36px;
		}
	}
}
</style>
