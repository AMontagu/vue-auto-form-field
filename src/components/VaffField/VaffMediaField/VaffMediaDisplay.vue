<template>
  <v-card
    :class="{selected: isSelected}"
    height="auto"
    width="100%"
    flat
    tile
    class="vaffMediaDisplay"
    @dblclick="$emit('choose')"
  >
    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <v-img
        v-if="type === 'images'"
        :src="src"
        :height="height"
        :style="srcIsPng ? {background: `url(${transparentBackground}) top left repeat`} : {}"
        contain
        @click="$emit('select')"
      >
        <v-layout
          slot="placeholder"
          fill-height
          align-center
          justify-center
          ma-0
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-layout>
      </v-img>

      <v-layout
        v-else-if="type === 'sounds'"
        column
        class="mediaSound"
        align-center
        fill-height
        justify-center
        @click="$emit('select')"
      >
        <audio
          :src="src"
          controls
        />
        <p v-if="displaySrc">
          {{ deleteTokenLinkShow }}:
        </p>
      </v-layout>
      <v-layout
        v-else-if="type === 'videos'"
        :style="{height: height}"
        column
        class="mediaVideo"
        @click="$emit('select')"
      >
        <video
          :src="src"
          controls
        />
        <p v-if="displaySrc">
          {{ deleteTokenLinkShow }}:
        </p>
      </v-layout>
      <div
        v-else
        @click="$emit('select')"
      >
        <v-textarea
          v-if="freeEdit && type === 'map'"
          :value="src"
          auto-grow
          ouline
          @input="$emit('update:src', $event)"
        />
        <p v-else>
          {{ deleteTokenLinkShow }}
        </p>
      </div>
    </transition>
  </v-card>
</template>

<script>
import transparentBackground from '../../../assets/images/transparent.png';
export default {
	name: 'VaffMediaDisplay',
	props: {
		height: {
			type: String,
			required: true,
		},
		width: {
			type: String,
			required: false,
			default: 'auto',
		},
		type: {
			type: String,
			required: true,
		},
		src: {
			type: String,
			required: true,
		},
		isSelected: {
			type: Boolean,
			default: false,
		},
		displaySrc: {
			type: Boolean,
			default: true,
		},
		freeEdit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			transparentBackground,
		};
	},
	computed: {
		srcIsPng() {
			return this.src.split('.').pop() === 'png';
		},
		deleteTokenLinkShow() {
			let lastCaractere = this.src.indexOf('?token');
			return this.src.substring(0, lastCaractere)
		}
	}
};
</script>

<style lang="scss" scoped>
.vaffMediaDisplay {
	background-color: rgba(0, 0, 0, 0.05) !important;
	box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1),
		inset 0 0 0 1px rgba(0, 0, 0, 0.05);
	padding: 4px;
	border: 1px #e8e8e8 solid;
	transition: 0.2s ease;

	.mediaSound {
		audio {
			width: 100%;
		}
	}

	.mediaVideo {
		video {
			max-height: 100%;
			max-width: 100%;
		}
	}

	&.selected {
		border-color: deepskyblue;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.07) !important;
	}
}
</style>
