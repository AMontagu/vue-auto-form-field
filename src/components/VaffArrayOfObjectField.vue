<template>
  <v-expansion-panel
    id="vaffArrayOfObjectField"
    :value="expansionIndex"
    class="fieldExpansion elevation-0 px-3"
  >
    <v-expansion-panel-content
      v-for="(fields, index) in getDataByPath(pathWithId)"
      :key="fields._id ? fields._id['$oid'] : index"
      class="children"
    >
      <v-layout
        slot="header"
        align-center
        justify-center
        class="header"
      >
        <v-flex xs8>
          <p
            :class="{'title': $vuetify.breakpoint.xlOnly, 'subheading': $vuetify.breakpoint.lgOnly || $vuetify.breakpoint.mdOnly, 'body-1': $vuetify.breakpoint.smAndDown}"
            class="ma-0 secondary--text text-truncate text-capitalize textFlex"
          >
            {{ ( headername || $getValueTranslated(field["@label"]) || fieldName) | singularize }} <span class="indexBullet ml-2">{{ index + 1 }}</span>
          </p>
        </v-flex>
        <v-spacer />
        <v-flex
          xs4
          class="text-xs-right mr-3"
        >
          <v-btn
            :class="{'body-1': $vuetify.breakpoint.xlOnly, 'caption': $vuetify.breakpoint.lgAndDown}"
            flat
            small
            color="secondary"
            @click="removeField(index)"
          >
            <v-icon
              :small="$vuetify.breakpoint.lgAndDown"
              color="secondary"
              class="mr-2"
            >
              delete
            </v-icon> <span class="hidden-xs-only">{{ $vaffT('vaffArrayOfObjectField.Delete') }}</span>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout
        row
        wrap
      >
        <slot
          :fields="fields"
          :index="index"
          name="subFields"
        >
          <v-flex
            v-for="(subField, subFieldName) in fields"
            :key="subFieldName"
            v-bind="widthOfItem"
            class="child"
          >
            <vaff
              v-if="subFieldName !== '_id'"
              v-bind="$props"
              :field="field['@data'][0][subFieldName]"
              :path="path ? `${path}.${index}.${subFieldName}` : `${index}.${subFieldName}`"
              @input="emitInputArrayOfObject(index, subFieldName, $event)"
              @deleteMedia="$emit('deleteMedia', $event)"
            />
          </v-flex>
        </slot>
      </v-layout>
    </v-expansion-panel-content>

    <v-layout
      row
      wrap
      align-content
      justify-space-between
      mt-3
    >
      <v-btn
        v-if="showAdd"
        :medium="$vuetify.breakpoint.xlOnly"
        :small="$vuetify.breakpoint.lgAndDown"
        class="ml-0"
        color="primary white--text"
        depressed
        @click="addField(field)"
      >
        <v-icon
          :small="$vuetify.breakpoint.lgAndDown"
          class="mr-2"
        >
          add_circle_outline
        </v-icon> {{ $vaffT('vaffArrayOfObjectField.Add') }} {{ (headername || $getValueTranslated(field["@label"]) || fieldName) | singularize | article($getLocale()) }}
      </v-btn>
      <v-tooltip
        left
        open-delay="50"
        max-width="350"
        content-class="text-xs-center"
      >
        <v-btn
          v-if="showDownload"
          slot="activator"
          :medium="$vuetify.breakpoint.xlOnly"
          :small="$vuetify.breakpoint.lgAndDown"
          color="third white--text"
          fab
          depressed
          @click="downloadJSON2CSV"
        >
          <v-icon :small="$vuetify.breakpoint.lgAndDown">
            save_alt
          </v-icon>
        </v-btn>
        <span> {{ $vaffT('vaffArrayOfObjectField.DownloadCsv') }}</span>
      </v-tooltip>
    </v-layout>
  </v-expansion-panel>
</template>

<script>
import MultiFieldMixin from './MultiFieldMixin';
import { mapMutations } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

export default {
	name: 'VaffArrayOfObjectField',
	mixins: [MultiFieldMixin],
	data() {
		return {
			expansionIndex: 0,
		};
	},
	methods: {
		...mapMutations('vaffStore/', ['pushData', 'sliceData']),
		emitInputArrayOfObject(index, subFieldName, newValueKeyIndex) {
			let array = cloneDeep(this.getDataByPath(this.pathWithId));
			array[index][subFieldName] = newValueKeyIndex;
			this.$emit('input', array);
		},
		addField(field) {
			let defaultData = this.getDefaultForField(field['@data']);

			if (Array.isArray(defaultData) && defaultData.length > 0) {
				defaultData = defaultData[0];
			}

			this.pushData({
				path: this.pathWithId,
				data: defaultData,
			});

			this.$emit('input', cloneDeep(this.getDataByPath(this.pathWithId)));

			this.$nextTick(() => {
				this.expansionIndex = this.getDataByPath(this.pathWithId).length - 1;
			});
		},
		removeField(index) {
			this.sliceData({ index, path: this.pathWithId });
			this.$emit('input', cloneDeep(this.getDataByPath(this.pathWithId)));
		},
		getDefaultForField(fieldData) {
			if (typeof fieldData === 'object' && !Array.isArray(fieldData)) {
				if (fieldData.hasOwnProperty('@default')) {
					return fieldData['@default'];
				} else {
					let defaultObjectValue = {};
					Object.keys(fieldData).forEach(label => {
						let defaultSubField = this.getDefaultForField(fieldData[label]);
						if (defaultSubField !== null) {
							defaultObjectValue[label] = defaultSubField;
						}
					})

					return Object.keys(defaultObjectValue).length > 0
						? defaultObjectValue
						: null;
				}
			} else if (Array.isArray(fieldData)) {
				let defaultValue = [];
				fieldData.forEach(subField => {
					if (typeof subField === 'object') {
						let data = {};
						Object.keys(subField).forEach(key => {
							if(subField[key]['@data']) {
								data[key] = this.getDefaultForField(subField[key]['@data']);
							} else {
								data[key] = this.getDefaultForField(subField[key]);
							}
						})
						defaultValue.push(data);
					}
				});
				return defaultValue;
			}
		},
		downloadJSON2CSV() {
			if (!this.data.length) {
				console.warn(`No data for ${this.fieldName} can't download it`);
				return;
			}

			const items = this.data;
			const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
			const header = Object.keys(items[0]);
			let csv = items.map(row =>
				header
					.map(fieldName => JSON.stringify(row[fieldName], replacer))
					.join(',')
			);
			csv.unshift(header.join(','));
			csv = csv.join('\r\n');

			let a = document.createElement('a');
			a.textContent = 'download';
			a.download = this.fieldName + '.csv';
			a.href = 'data:text/csv;charset=utf-8,' + escape(csv);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		},
	},
};
</script>

<style lang="scss" scoped>
.textFlex {
	display: flex;
	align-items: center;

	.indexBullet {
		width: 25px;
		height: 25px;
		min-width: 25px;
		font-size: 14px;
		border-radius: 50%;
		color: white;
		background-color: #2b469b;
		align-items: center;
		display: inline-flex;
		justify-content: center;
	}
}

.v-expansion-panel__container--active {
	.indexBullet {
		background-color: #14a1f6 !important;
	}
}
</style>
