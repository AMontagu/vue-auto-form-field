<template>
  <v-layout
    v-if="!displayAs('hidden') && displayIfValue"
    class="fields"
    align-center
  >
    <v-layout
      v-if="usetabs"
      row
      mt-2
    >
      <v-flex xs12>
        <v-tabs
          slot="extension"
          :value="currentTabCopy"
          height="70"
          grow
          @change="changeCurrentTab"
        >
          <v-tabs-slider color="primary" />
          <v-tab
            v-for="tabTitle in Object.keys(field)"
            :key="tabTitle"
          >
            {{ $getValueTranslated(field[tabTitle]["@label"]) }}
          </v-tab>
        </v-tabs>

        <v-tabs-items
          :value="currentTabCopy"
          class="manifestData"
        >
          <v-tab-item
            v-for="(subField, tabTitle) in field"
            :key="tabTitle"
          >
            <v-card class="px-2 py-3 borderStyle">
              <vaff-multi-field
                :value="data"
                :field="subField"
                :usetabs="false"
                :path="path ? `${path}.${tabTitle}` : tabTitle"
                v-bind="getPropsWithIsParentTabs()"
                @input="emitInputObjectWhenOnlySubDataChanged(tabTitle, $event)"
                @deleteMedia="$emit('deleteMedia', $event)"
              />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>

    <v-flex
      v-else-if="field != null"
      xs12
    >
      <v-layout v-if="valueIsArrayOfObject">
        <vaff-array-of-object-field
          v-bind="getPropsUpdateShowHeader()"
          @input="$emit('input', $event)"
          @deleteMedia="$emit('deleteMedia', $event)"
        >
          <template
            v-if="hasSubFieldsSlots"
            slot="subFields"
            slot-scope="{ fields, index }"
          >
            <slot
              :fields="fields"
              :index="index"
              name="subFields"
            />
          </template>
        </vaff-array-of-object-field>
      </v-layout>

      <v-layout
        v-else
        class="field my-2"
      >
        <v-flex
          v-if="valueIsArray"
          xs12
        >
          <vaff-array-field
            v-bind="getPropsUpdateShowHeader()"
            @input="$emit('input', $event)"
            @deleteMedia="$emit('deleteMedia', $event)"
          />
        </v-flex>

        <v-flex
          v-else-if="valueIsObject"
          xs12
        >
          <vaff-object-field
            v-bind="getPropsUpdateShowHeader()"
            @input="$emit('input', $event)"
            @deleteMedia="$emit('deleteMedia', $event)"
          >
            <template
              v-if="hasObjectSlot"
              slot="object"
              slot-scope="{ field }"
            >
              <slot
                :field="field"
                name="object"
              />
            </template>
          </vaff-object-field>
        </v-flex>

        <v-flex
          v-else
          xs12
        >
          <vaff-field
            :value="data"
            :field="field"
            :identifier="identifier"
            :visual-style="visualStyle"
            @input="updateData($event)"
            @deleteMedia="$emit('deleteMedia', { data: $event.data, path })"
          />
          <v-divider
            v-if="useDivider"
            class="mt-4"
          />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-snackbar
      v-model="showSnackbarUpdate"
      :timeout="3000"
      top
      color="success"
    >
      {{ $vaffT('vaffMultiField.NewConfigSend') }}
      <v-btn
        flat
        color="black"
        @click.native="showSnackbarUpdate = false"
      >
        {{ $vaffT('vaffMultiField.Close') }}
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import MultiFieldMixin from './MultiFieldMixin';
import { mapGetters } from 'vuex';

export default {
	name: 'VaffMultiField',
	mixins: [MultiFieldMixin],
	props: {
		usetabs: {
			type: Boolean,
			default: false,
		},
		currentTab: {
			type: Number,
			default: 0,
		},
		isParentTabs: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			showSnackbarUpdate: false,
			currentTabCopy: 0,
		};
	},
	computed: {
		...mapGetters('vaffStore/', ['getDataByPath']),
		hasObjectSlot() {
			return this.$scopedSlots.hasOwnProperty('object');
		},
		hasSubFieldsSlots() {
			return this.$scopedSlots.hasOwnProperty('subFields');
		},
		valueIsArrayOfObject() {
			return Array.isArray(this.field['@data'])
		},
		valueIsArray() {
			return Array.isArray(this.getDataByPath(this.pathWithId));
		},
		valueIsObject() {
			return (
				!Array.isArray(this.getDataByPath(this.pathWithId)) &&
				typeof this.getDataByPath(this.pathWithId) === 'object'
			);
		},
	},
	watch: {
		currentTab(newCurrentTab) {
			this.currentTabCopy = newCurrentTab;
		},
	},
	async created() {
		this.currentTabCopy = this.currentTab;
		if (this.displayIfOption) {
			Object.keys(this.displayIfOption).forEach(logicalOperator => {
				this.displayIfOption[logicalOperator].forEach(displayIfElement => {
					const fullPath = this.replacePlaceholderByCurrentItemPath(
						`${this.identifier}.${displayIfElement.path}`
					).replace(/.@data/g, '');

					this.$watch(
						`$store.state.vaffStore.data.${fullPath}`,
						this.refreshIfCondition,
						{
							immediate: true,
						}
					);
				});
			});

			this.refreshIfCondition();
		}
	},
	methods: {
		changeCurrentTab(newTab) {
			this.currentTabCopy = newTab;
			this.$emit('update:currentTab', newTab);
		},
		getPropsWithIsParentTabs() {
			return { ...this.$props, isParentTabs: true };
		},
		getPropsUpdateShowHeader() {
			return { ...this.$props, showHeader: !this.isParentTabs }
		},
		updateData(newValue) {
			this.$emit('input', newValue);
			this.data = newValue;
		},
	},
};
</script>

<style lang="scss">
.arrayField {
	.header {
		background: #dfe0e7;
		display: flex;
		justify-content: space-between;
		height: 45px;
	}

	.v-expansion-panel__container:first-child {
		border-top: 1px rgba(0, 0, 0, 0.3) solid !important;
	}

	.title {
		font-size: 16px;
		font-weight: 500;
		text-transform: capitalize;
	}

	.subheading {
		text-transform: capitalize;
	}

	.children {
		border-left: 1px rgba(0, 0, 0, 0.3) solid;
		border-right: 1px rgba(0, 0, 0, 0.3) solid;
		border-bottom: 1px rgba(0, 0, 0, 0.3) solid;
		border-top: none;
		margin-bottom: 0px;
	}
}

.fieldExpansion {
	.v-expansion-panel__header {
		transition: 0.3s ease;
		padding: 12px 14px !important;

		&:hover {
			background: rgba(0, 0, 0, 0.05);
		}
	}

	.v-expansion-panel__container--active {
		background: rgba(0, 0, 0, 0.01) !important;
	}

	.header {
		background: none !important;
		display: flex;
		justify-content: space-between;
		height: 45px;
		border-top: none !important;
		border-bottom: none !important;
	}

	.v-expansion-panel__container:first-child {
		border-top: 1px rgba(0, 0, 0, 0.1) solid !important;
	}

	.title {
		font-size: 16px;
		font-weight: 500;
	}

	.children {
		border: 1px rgba(0, 0, 0, 0.1) solid;
		border-top: none !important;
		margin-bottom: 0px;
	}
}

.objectField {
	.header {
		background: rgba(0, 0, 0, 0.05);
		display: flex;
		justify-content: space-between;
		height: 50px;
	}

	.title {
		font-size: 16px;
		text-transform: capitalize;
	}
}

@media all and (min-width: 300px) and (max-width: 599px) {
	.v-expansion-panel__header {
		padding: 5px 10px !important;
	}
}
</style>
