<template>
  <div
    id="vaffArrayField"
    class="arrayField"
  >
    <v-layout v-if="displayAs('multiplecheckbox')">
      <v-flex
        v-if="field['@options'] && field['@options'].data && field['@options'].data.length"
        xs12
      >
        <vaff-field
          v-model="data"
          :field="field"
          :app-name="identifier"
          :visual-style="visualStyle"
          @input="$emit('input', $event)"
          @deleteMedia="$emit('deleteMedia', $event)"
        />
        <v-divider
          v-if="useDivider"
          class="mt-4"
        />
      </v-flex>
      <v-flex
        v-else
        xs12
      >
        <p>{{ $vaffT('vaffArrayField.NoData') }}</p>
      </v-flex>
    </v-layout>
    <template v-else>
      <v-layout row>
        <v-flex
          v-if="showHeader"
          class="header"
          pa-3
          mb-4
        >
          <div class="title font-weight-bold">
            {{ headername || $getValueTranslated(field["@label"]) || fieldName }}
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(subValue, index) in getDataByPath(pathWithId)"
          :key="`${particle}${index}`"
          v-bind="widthOfItem"
          :px-3="$vuetify.breakpoint.smAndUp"
          :pr-3="$vuetify.breakpoint.xsOnly"
          mb-3
        >
          <v-layout
            align-center
          >
            <v-flex
              sm9
              xs8
            >
              <vaff-multi-field
                v-bind="$props"
                :path="path ? `${path}.${index}`: index.toString()"
                @input="emitInputArray(index, $event)"
                @deleteMedia="$emit('deleteMedia', $event)"
              />
            </v-flex>
            <v-flex
              sm3
              xs4
            >
              <v-layout justify-center>
                <v-btn
                  :medium="$vuetify.breakpoint.xlOnly"
                  :small="$vuetify.breakpoint.lgAndDown"
                  class="text-xs-center"
                  depressed
                  color="error"
                  @click="deleteOneToArray(index)"
                >
                  <v-icon
                    :small="$vuetify.breakpoint.lgAndDown"
                    :class="{'mr-2': $vuetify.breakpoint.smAndUp}"
                  >
                    delete
                  </v-icon>
                  <span
                    v-if="itemsPerRow < 6"
                    class="hidden-xs-only"
                  >{{ $vaffT('vaffArrayField.Delete') }}</span>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout
        :pl-3="$vuetify.breakpoint.smAndUp"
        mt-1
      >
        <v-btn
          :medium="$vuetify.breakpoint.xlOnly"
          :small="$vuetify.breakpoint.lgAndDown"
          color="third"
          depressed
          dark
          @click="addOneToArray()"
        >
          <v-icon
            :small="$vuetify.breakpoint.lgAndDown"
            class="mr-2"
          >
            add_circle_outline
          </v-icon>{{ $vaffT('vaffArrayField.AddOne') }}
        </v-btn>
      </v-layout>
    </template>
  </div>
</template>

<script>
import MultiFieldMixin from './MultiFieldMixin';
import { mapMutations } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

export default {
	name: 'VaffArrayField',
	mixins: [MultiFieldMixin],
	data() {
		return {
			particle: 'a',
		};
	},
	methods: {
		...mapMutations('vaffStore/', ['pushData', 'sliceData']),
		deleteOneToArray(index) {
			//Performance: Instead of use vuex slice and push and then get data again. Maybe just get data, slice or push it and emit input with it. Because it will be set after on the vuex store when value change.
			//performance tip can be used for vaff array of object field too
			this.particle += this.particle;
			this.sliceData({ path: this.pathWithId, index: index });
			this.$emit('input', cloneDeep(this.getDataByPath(this.pathWithId)));
		},
		addOneToArray() {
			let fieldData = this.field['@default'] ? this.field['@default'][0] : false
			this.pushData({
				path: this.pathWithId,
				data: fieldData || '',
			});
			this.$emit('input', cloneDeep(this.getDataByPath(this.pathWithId)));
		},
		emitInputArray(index, newValue) {
			let array = cloneDeep(this.getDataByPath(this.pathWithId));
			array[index] = newValue;
			this.$emit('input', array);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
