<template>
  <div class="vaffUpload">
    <div v-show="visualStyle === 'button'">
      <v-btn
        :class="{
          'body-2': $vuetify.breakpoint.lgAndUp,
          'caption': $vuetify.breakpoint.mdAndDown,
          'mr-0': $vuetify.breakpoint.smAndUp,
          'mt-2': $vuetify.breakpoint.xsOnly,
        }"
        :block="$vuetify.breakpoint.xsOnly"
        :large="$vuetify.breakpoint.xlOnly"
        :medium="$vuetify.breakpoint.lgAndDown"
        color="third"
        depressed
        dark
        @click="openFileSelector"
      >
        <v-icon class="mr-2">
          file_upload
        </v-icon>{{ label }}
      </v-btn>
      <input
        v-show="false"
        ref="fileInput"
        :accept="acceptedFileTypes"
        :multiple="allowMultiple"
        type="file"
        @change="addFile($event.target.files[0])"
      >
    </div>

    <vue-dropzone
      v-show="visualStyle !== 'button'"
      :id="randomId"
      ref="vaffDropzone"
      :options="dropzoneOptions"
      :style="{height: dropzoneHeight, width: dropzoneWidth}"
      class="vaffDropzone"
      @vdropzone-file-added="addFile"
      @vdropzone-error="handleError"
    />

    <v-dialog
      v-model="showModalError"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title> {{ $vaffT('vaffUpload.Error') }} </v-card-title>
        <v-layout px-4>
          <v-flex xs12>
            <p>{{ labelError }}</p>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn
            depressed
            color="grey"
            flat
            @click="showModalError = false; uploadError = null;"
          >
            {{ $vaffT('vaffUpload.Close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LoggerMixin from '../LoggerMixin';
import vue2Dropzone from 'vue2-dropzone';
// TODO remove next line after Leo's design
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

function getTemplate(previewWidth) {
	return `
		<div class="dz-preview dz-file-preview" style="width: ${previewWidth}">
			<div class="thumbnailContainer">
				<img data-dz-thumbnail />
			</div>
			<div class="dz-details">
				<div class="fileInfo">
					<span class="dz-filename" data-dz-name></span>
					<span class="dz-size" data-dz-size></span>
				</div>
				<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress id="testTemplate"></span></div>
				<span class="mark dz-success-mark">✔</span>
				<span class="mark dz-error-mark">✘</span>
			</div>
		</div>
	`;
}

export default {
	name: 'VaffUpload',
	components: {
		vueDropzone: vue2Dropzone,
	},
	mixins: [LoggerMixin],
	props: {
		url: {
			type: String,
			default: '/fake/url',
		},
		useWebSocket: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: 'Click here or drop a file',
		},
		allowMultiple: {
			type: Boolean,
			default: false,
		},
		acceptedFileTypes: {
			type: [Array, String],
			default: '',
		},
		maxFileSize: {
			type: Number,
			default: 50,
		},
		timeout: {
			type: Number,
			default: 7000,
		},
		visualStyle: {
			type: String,
			default: 'dropZone',
		},
		useDefaultErrorBehavior: {
			type: Boolean,
			default: true,
		},
		progress: {
			type: Number,
			default: 0,
		},
		dropzoneHeight: {
			type: String,
			default: '200px',
		},
		dropzoneWidth: {
			type: String,
			default: '100%',
		},
		previewWidth: {
			type: String,
			default: '500px',
		},
	},
	data() {
		const dropzoneOptions = {
			url: this.url,
			method: 'POST',
			withCredentials: false,
			autoProcessQueue: false,
			acceptedFiles: Array.isArray(this.acceptedFileTypes)
				? this.acceptedFileTypesAsString
				: this.acceptedFileTypes,
			headers:
				this.$vaffWebToolsOptions &&
				this.$vaffWebToolsOptions.vaffUploadOptions
					? this.$vaffWebToolsOptions.vaffUploadOptions.headers
					: {},
			previewTemplate: getTemplate(this.previewWidth, this.visualStyle),
			timeout: this.timeout,
			maxFilesize: this.maxFileSize
		};

		return {
			randomId: Math.random()
				.toString(36)
				.substr(2, 5),
			files: [],
			uploadError: null,
			showModalError: false,
			unknownErrorMessage: this.$vaffT('vaffUpload.UnknownError'),
			dropzoneOptions: dropzoneOptions,
		};
	},
	computed: {
		options() {
			return this.$vaffWebToolsOptions &&
				this.$vaffWebToolsOptions.vaffUploadOptions
				? this.$vaffWebToolsOptions.vaffUploadOptions
				: {};
		},
		acceptedFileTypesAsString() {
			return this.acceptedFileTypes.join(', ');
		},
		fileSizeMaxInOctet() {
			return this.maxFileSize * 1024 * 1024;
		},
		labelError() {
			if (typeof this.uploadError === 'object' && this.uploadError !== null) {
				let label = '';
				if ('name' in this.uploadError) {
					label += `${this.uploadError.name}: \n`;
				}
				if ('message' in this.uploadError) {
					label += this.uploadError.message;
				}
				if (!label) {
					label = this.unknownErrorMessage;
				}

				return label;
			}

			return this.uploadError;
		},
	},
	created() {
		if (this.label === 'Click here or drop a file') {
			this.shownLabel = this.$vaffT('vaffUpload.ClickOrDrop');
		} else {
			this.shownLabel = this.label;
		}

		this.dropzoneOptions.autoProcessQueue = !this.useWebSocket;
	},
	methods: {
		handleError(e, message) {
			this.logger.LOGERROR('fileUploadError: ', message);
			if (!this.uploadError) {
				this.uploadError = message;
			}
			this.removeAllFiles();
			if (e.size > this.fileSizeMaxInOctet) {
				const error = {
					name: 'FileTooBig',
					message: `File size: ${this.formatBytes(
						e.size
					)}. Max file size authorised: ${this.maxFileSize}MB`,
				};
				this.uploadError = error;
				this.$emit('fileUploadError', error);
			} else {
				this.$emit('fileUploadError', e);
			}
			if (this.useDefaultErrorBehavior) {
				this.showModalError = true;
			}
		},
		getClassName() {
			if (this.visualStyle === 'zone') {
				return 'zonePond';
			}

			return 'buttonPond';
		},
		formatBytes(bytes, decimals) {
			if (bytes === 0) return '0 Bytes';
			let k = 1024,
				dm = decimals || 2,
				sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
		},
		addFile(file) {
			if (!/[!@#$%^&*(),?":{}|<>\s/]/.test(file.name)) {
				this.$emit('addFile', file);
				this.setTypeZipClassToZipFile(file.name);
				document.documentElement.style.setProperty('--justifyValue', this.$refs.vaffDropzone.dropzone.files.length > 3 ? 'flex-end' : 'center');
			} else {
				this.$refs.vaffDropzone.removeAllFiles();
				this.uploadError = this.$vaffT('vaffUpload.ErrorImgName');
				this.showModalError = true;
			}
		},
		uploadProgress(progressEvent) {
			const pourcentage = Math.round(
				(progressEvent.bytesLoaded / progressEvent.file.size) * 100
			);

			if (this.$refs.vaffDropzone) {
				const dzPeview = Array.from(this.$refs.vaffDropzone.$el.children).find(
					el => {
						return el.className.includes('dz-preview');
					}
				);
				if (!dzPeview) {
					return;
				}

				const dzDetails = Array.from(dzPeview.children).find(
					el => {
						return el.className.includes('dz-details');
					}
				);
				if (!dzDetails) {
					return;
				}

				const dzProgress = Array.from(dzDetails.children).find(el => {
					return el.className.includes('dz-progress');
				});
				if (!dzProgress) {
					return;
				}

				const dzUpload = Array.from(dzProgress.children).find(el => {
					return el.className.includes('dz-upload');
				});
				if (!dzUpload) {
					return;
				}
				dzUpload.style.width = `${pourcentage}%`;
			}
		},
		getFileName() {
			const queuedFiles = this.$refs.vaffDropzone.getQueuedFiles();
			if (queuedFiles) {
				return this.$refs.vaffDropzone.getQueuedFiles()[0].name;
			}
		},
		setTypeZipClassToZipFile(fileName) {
			const files = this.$refs.vaffDropzone.files ? this.$refs.vaffDropzone.dropzone.files : this.$refs.fileInput.files;
			if (files.length) {
				let upload = files[files.length - 1].previewElement;
				var fileType = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName) : undefined;
				if ( fileType[0] === 'zip') {
					upload.classList.add('type-zip');
				}
			}
		},
		removeAllFiles() {
			this.$refs.vaffDropzone.removeAllFiles();
		},
		manuallyAddFile(file) {
			this.$refs.vaffDropzone.manuallyAddFile(file, file.name);
		},
		openFileSelector() {
			this.$refs.fileInput.click();
		}
	},
};
</script>

<style lang="scss">
:root {
	--justifyValue : center;
}

.vaffDropzone {
	min-height: 0 !important;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: var(--justifyValue);
	height: 395px !important;
	overflow: hidden;
	background: transparent;
	padding: 0 !important;
	margin: 0 !important;
	font-size: 24px !important;
	cursor: pointer;
	border: 2px dashed rgba(0,0,0,.87);
	border-radius: 7px;
	transition: all .3s ease;

	&.dz-drag-hover {
		border-style: dashed;
		border: 2px dashed rgba(0,0,0,.3);

		& .dz-message {
			font-size: 16px;
		}

	}

	.dz-message {
		font-size: 18px;
		color: rgba(0,0,0,.87);
		transition: all .3s ease;
	}

	.dz-preview {
		z-index:1;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none !important;

		&.type-zip .thumbnailContainer {
			background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1NiA1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTYgNTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojNTU2MDgwO30uc3Qxe2ZpbGw6IzNGNDg1RTt9LnN0MntmaWxsOiNGRkZGRkY7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTM3LDBIOEM3LjIsMCw2LjUsMC43LDYuNSwxLjlWNTVjMCwwLjMsMC43LDEsMS41LDFINDhjMC44LDAsMS41LTAuNywxLjUtMVYxM2MwLTAuNy0wLjEtMC45LTAuMy0xLjFMMzcuNiwwLjNDMzcuNCwwLjEsMzcuMiwwLDM3LDB6Ii8+PHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIzNy41LDAuMiAzNy41LDEyIDQ5LjMsMTIgIi8+PGc+PHBhdGggY2xhc3M9InN0MiIgZD0iTTI0LjksMjV2MS4zbC00LjgsNy4ybC0wLjMsMC4yaDUuMVYzNWgtNi43di0xLjNsNC44LTcuMmwwLjMtMC4yaC01LjFWMjVIMjQuOXoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjguOSwzNWgtMS43VjI1aDEuN1YzNXoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzMsMzVoLTEuNlYyNWgyLjljMC40LDAsMC45LDAuMSwxLjMsMC4yczAuOCwwLjMsMS4xLDAuNmMwLjMsMC4zLDAuNiwwLjYsMC44LDFzMC4zLDAuOCwwLjMsMS4zYzAsMC41LTAuMSwxLTAuMywxLjRjLTAuMiwwLjQtMC40LDAuOC0wLjcsMWMtMC4zLDAuMy0wLjcsMC41LTEuMSwwLjdzLTAuOSwwLjItMS40LDAuMkgzM0wzMywzNUwzMywzNXogTTMzLDI2LjJ2NGgxLjVjMC4yLDAsMC40LDAsMC42LTAuMWMwLjItMC4xLDAuNC0wLjIsMC41LTAuM3MwLjMtMC40LDAuNC0wLjZzMC4yLTAuNiwwLjItMWMwLTAuMiwwLTAuNC0wLjEtMC42YzAtMC4yLTAuMS0wLjQtMC4zLTAuNmMtMC4xLTAuMi0wLjMtMC40LTAuNi0wLjVzLTAuNi0wLjItMS0wLjJMMzMsMjYuMkwzMywyNi4yeiIvPjwvZz48L3N2Zz4=);
		}

		.thumbnailContainer {
			display: block;
			height: 65px;
			width: 65px;
			border-radius: 7px;

			img {
				max-width: 65px;
				height: auto;
			}
		}

		.dz-details {
			opacity: 1;
			position: relative;
			flex: 0 0 calc(100% - 50px);
			justify-content: space-between;
			background: none;
			color: inherit;
			margin-left: 10px;
			padding: 10px;
			max-width: 400px;
			min-width: 400px;

			.fileInfo {
				display: flex;
				justify-content: space-between;

				.dz-filename {
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 290px;
					color: rgba(0,0,0,.87);
					font-size: 14px;
				}

				.dz-size {
					font-size: 14px;
					margin-bottom: 0;

					strong {
						font-weight: normal !important;
					}
				}
			}

			.dz-progress {
				opacity: 1;
				z-index: 1000;
				pointer-events: none;
				position: relative;
				left: 0;
				height: 9px;
				margin-top: 7px;
				width: 100%;
				margin-left: 0;
				-webkit-transform: scale(1);
				border-radius: 5px;
				overflow: hidden;
				background: rgba(43, 43, 43, .25);

				.dz-upload {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					width: 0;
					-webkit-transition: width .3s ease-in-out;
					-moz-transition: width .3s ease-in-out;
					-ms-transition: width .3s ease-in-out;
					-o-transition: width .3s ease-in-out;
					transition: width .3s ease-in-out;

					background: rgba(48,216,246,1);
					background: -moz-linear-gradient(left, #293480 0%, rgba(48,216,246,1) 100%);
					background: -webkit-gradient(left top, right top, color-stop(0%, #293480), color-stop(100%, rgba(48,216,246,1)));
					background: -webkit-linear-gradient(left, #293480 0%, rgba(48,216,246,1) 100%);
					background: -o-linear-gradient(left, #293480 0%, rgba(48,216,246,1) 100%);
					background: -ms-linear-gradient(left, #293480 0%, rgba(48,216,246,1) 100%);
					background: linear-gradient(to right, #293480 0%, rgba(48,216,246,1) 100%);
					filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#293480', endColorstr='#ff7bae', GradientType=1 );
				}

			}

			.mark {
				width: 19px;
				position: absolute;
				top: 31px;
				left: 398px;
				pointer-events: none;
				z-index: 500;
				margin-left: 0px;
				margin-top: 0px;
				font-size: 20px;
			}

			.dz-success-mark {
				color: #00c364;
			}

			.dz-error-mark {
				color: #FF5252;
			}
		}

		&.dz-processing .dz-progress {
			opacity: 1;
			-webkit-transition: all 0.2s linear;
			-moz-transition: all 0.2s linear;
			-ms-transition: all 0.2s linear;
			-o-transition: all 0.2s linear;
			transition: all 0.2s linear;
		}

		&:not(.dz-processing) .dz-progress {
			animation: none !important;
		}
	}

	div.type-zip .thumbnailContainer:after {
		background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1NiA1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTYgNTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojNTU2MDgwO30uc3Qxe2ZpbGw6IzNGNDg1RTt9LnN0MntmaWxsOiNGRkZGRkY7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTM3LDBIOEM3LjIsMCw2LjUsMC43LDYuNSwxLjlWNTVjMCwwLjMsMC43LDEsMS41LDFINDhjMC44LDAsMS41LTAuNywxLjUtMVYxM2MwLTAuNy0wLjEtMC45LTAuMy0xLjFMMzcuNiwwLjNDMzcuNCwwLjEsMzcuMiwwLDM3LDB6Ii8+PHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIzNy41LDAuMiAzNy41LDEyIDQ5LjMsMTIgIi8+PGc+PHBhdGggY2xhc3M9InN0MiIgZD0iTTI0LjksMjV2MS4zbC00LjgsNy4ybC0wLjMsMC4yaDUuMVYzNWgtNi43di0xLjNsNC44LTcuMmwwLjMtMC4yaC01LjFWMjVIMjQuOXoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjguOSwzNWgtMS43VjI1aDEuN1YzNXoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzMsMzVoLTEuNlYyNWgyLjljMC40LDAsMC45LDAuMSwxLjMsMC4yczAuOCwwLjMsMS4xLDAuNmMwLjMsMC4zLDAuNiwwLjYsMC44LDFzMC4zLDAuOCwwLjMsMS4zYzAsMC41LTAuMSwxLTAuMywxLjRjLTAuMiwwLjQtMC40LDAuOC0wLjcsMWMtMC4zLDAuMy0wLjcsMC41LTEuMSwwLjdzLTAuOSwwLjItMS40LDAuMkgzM0wzMywzNUwzMywzNXogTTMzLDI2LjJ2NGgxLjVjMC4yLDAsMC40LDAsMC42LTAuMWMwLjItMC4xLDAuNC0wLjIsMC41LTAuM3MwLjMtMC40LDAuNC0wLjZzMC4yLTAuNiwwLjItMWMwLTAuMiwwLTAuNC0wLjEtMC42YzAtMC4yLTAuMS0wLjQtMC4zLTAuNmMtMC4xLTAuMi0wLjMtMC40LTAuNi0wLjVzLTAuNi0wLjItMS0wLjJMMzMsMjYuMkwzMywyNi4yeiIvPjwvZz48L3N2Zz4=);
	}
}
</style>
