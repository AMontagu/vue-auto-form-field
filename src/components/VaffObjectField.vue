<template>
  <v-layout
    id="vaffobjectField"
    class="objectField"
    column
  >
    <v-flex
      v-if="showHeader && $getValueTranslated(field['@label'])"
      class="header"
      pa-3
      mb-2
    >
      <div class="title font-weight-bold">
        {{ headername || $getValueTranslated(field['@label']) || fieldName }}
      </div>
    </v-flex>

    <v-layout wrap>
      <slot
        :field="field"
        name="object"
      >
        <v-flex
          v-for="(subField, subFieldName) in (field['@data'] || field)"
          :key="subFieldName"
          v-bind="widthOfItem"
          xs6
        >
          <vaff
            :field="subField"
            :path="path ? `${path}.${subFieldName}` : subFieldName"
            v-bind="$props"
            @input="emitInputObjectWhenOnlySubDataChanged(subFieldName, $event)"
            @deleteMedia="$emit('deleteMedia', $event)"
            :items-per-rows="itemsPerRow"
          />
        </v-flex>
      </slot>
    </v-layout>
  </v-layout>
</template>

<script>
import MultiFieldMixin from './MultiFieldMixin';

export default {
	name: 'VaffObjectField',
	mixins: [MultiFieldMixin],
};
</script>

<style lang="scss" scoped>
</style>
