<template>
  <v-layout
    :column="$vuetify.breakpoint.xsOnly"
    :align-center="!$vuetify.breakpoint.xsOnly"
    :justify-center="!$vuetify.breakpoint.xsOnly"
    :px-2="$vuetify.breakpoint.smAndUp"
    :my-2="$vuetify.breakpoint.smAndUp"
    :my-4="$vuetify.breakpoint.xsOnly"
    row
    wrap
    class="vaffMediaField"
  >
    <div v-if="options && options.storageConfigs && options.storageConfigs.length">
      <v-flex
        v-if="value !== null && value!== '' || type === 'map'"
        xs12
        style="cursor: pointer;"
        justify-center
        @click="showVaffMediaIfNotMapType"
      >
        <vaff-media-display
          :type="`${type}s`"
          :display-src="false"
          :free-edit="true"
          :src="isMediaMap ? value : getSrcDependOnOptions(value, undefined)"
          :height="$vuetify.breakpoint.lgAndDown ? '70px' : '110px'"
          :style="{maxWidth: maxWidth}"
          class="mx-auto"
          @update:src="updateValueIfMap($event)"
        />
      </v-flex>
      <v-flex
        xs12
        column
        text-xs-center
      >
        <v-btn
          :medium="$vuetify.breakpoint.xlOnly"
          :small="$vuetify.breakpoint.lgAndDown"
          :class="{'caption': $vuetify.breakpoint.smAndDown}"
          :style="{maxWidth: maxWidth}"
          class="mx-auto"
          block
          color="primary"
          dark
          depressed
          @click="showVaffMedia = true"
        >
          <v-icon
            :small="$vuetify.breakpoint.lgAndDown"
            class="mr-2 hidden-xs-only"
          >
            add_circle_outline
          </v-icon>{{ $vaffT('vaffField.vaffMediaField.vaffMediaField.Choose') }} {{ $vaffT(`vaffField.vaffMediaField.vaffMediaField.${type}`) }}
        </v-btn>
        <v-btn
          v-if="typeof defaultValue === 'string' && defaultValue"
          :medium="$vuetify.breakpoint.xlOnly"
          :small="$vuetify.breakpoint.lgAndDown"
          :class="{'caption': $vuetify.breakpoint.smAndDown}"
          :style="{maxWidth: maxWidth}"
          class="mx-auto"
          block
          color="warning"
          dark
          depressed
          @click="resetDefault()"
        >
          <v-icon
            :small="$vuetify.breakpoint.lgAndDown"
            class="mr-2 hidden-xs-only"
          >
            settings_backup_restore
          </v-icon> {{ $vaffT('vaffField.vaffMediaField.vaffMediaField.Reset') }}
        </v-btn>
      </v-flex>

      <vaff-media
        v-if="showVaffMedia"
        v-model="showVaffMedia"
        :type="type"
        :identifier="identifier"
        :current-value="value"
        :default-value="defaultValue"
        @close="showVaffMedia = false"
        @mediaSelected="setMedia"
        @deleteMedia="$emit('deleteMedia', $event)"
      />
    </div>
    <div v-else>
      <p>{{ $vaffT('vaffField.vaffMediaField.vaffMediaField.Choose') }}</p>
    </div>
  </v-layout>
</template>

<script>
import MultiFieldMixin from './VaffMediaMixin';

export default {
	name: 'VaffMediaField',
	mixins: [MultiFieldMixin],
	props: {
		value: { type: String, required: true },
		defaultValue: {
			type: [String, Array],
			required: true,
		},
		maxWidth: {
			type: String,
			default: '250px',
		},
	},
	data() {
		return {
			showVaffMedia: false,
		};
	},
	computed: {
		mediaFieldSize() {
			let maxWidth = '250px';
			switch (this.$vuetify.breakpoint.name) {
				case 'xs':
				case 'sm':
				case 'md':
				case 'lg':
					maxWidth = '250px';
					break;
				case 'xl':
					maxWidth = '300px';
					break;
			}
			return {
				maxWidth
			}
		},
		isMediaMap() {
			return this.type === 'map';
		},
	},
	methods: {
		resetDefault() {
			this.$emit('input', this.defaultValue);
		},
		setMedia(data) {
			this.$emit('input', data.media);
		},
		updateValueIfMap(value) {
			if (this.type === 'map') {
				this.$emit('input', value);
			}
		},
		showVaffMediaIfNotMapType() {
			if (this.isMediaMap) {
				this.showVaffMedia = true;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
