<template>
  <v-dialog
    ref="vaffMedia"
    :value="value"
    class="vaffMedia"
    max-width="90%"
    @input="$emit('close')"
  >
    <v-layout
      row
      align-end
    >
      <v-flex xs12>
        <v-card
          style="position: relative"
          class="mediaCard"
          flat
        >
          <v-layout
            :pr-4="$vuetify.breakpoint.smAndUp"
            :px-2="$vuetify.breakpoint.xsOnly"
            row
            wrap
            align-center
            justify-space-between
            py-2
          >
            <v-flex d-flex>
              <v-layout
                row
                wrap
                justify-start
              >
                <v-card-title :class="{'title': $vuetify.breakpoint.smAndUp, 'hidden-xs-only': $vuetify.breakpoint.xsOnly}">
                  {{ $vaffT('vaffField.vaffMediaField.vaffMedia.FileManager') }}
                </v-card-title>
                <div
                  v-for="storage in options.storageConfigs"
                  :key="storage.name"
                >
                  <template v-if="storage.post">
                    <v-btn
                      :large="$vuetify.breakpoint.xlOnly"
                      :medium="$vuetify.breakpoint.lgAndDown && !$vuetify.breakpoint.xsOnly"
                      :small="$vuetify.breakpoint.xsOnly"
                      color="third"
                      depressed
                      dark
                      @click="$refs[`fileInput${storage.name}`][0].click()"
                    >
                      <v-icon class="mr-2 hidden-xs-only">
                        add_circle_outline
                      </v-icon> {{ $vaffT('vaffField.vaffMediaField.vaffMedia.Upload') }} {{ $vaffT(`vaffField.vaffMediaField.vaffMedia.${storage.name}`) }}
                    </v-btn>
                    <input
                      :ref="`fileInput${storage.name}`"
                      type="file"
                      multiple
                      hidden
                      @change="onFileChange(storage, $event)"
                    >
                  </template>
                </div>
              </v-layout>
            </v-flex>
            <v-flex class="text-xs-right closeBtn">
              <v-icon
                large
                @click="$emit('close')"
              >
                close
              </v-icon>
            </v-flex>
          </v-layout>

          <v-divider style="background-color: #a9aab0" />

          <v-layout
            v-if="!showVaffUpload"
            row
            wrap
          >
            <v-flex
              xs12
              sm9
              xl10
              pt-4
              px-3
              class="mediaContainer"
            >
              <v-tabs
                v-model="currentMediaTypeIndex"
                centered
                slider-color="blue"
              >
                <v-tab
                  v-for="(key, index) in mediaTypes"
                  :key="key"
                  :href="`#tabMedia-${index}`"
                  :disabled="activeMedia !== key && activeMediaBlocked"
                >
                  {{ key }}
                </v-tab>

                <v-tabs-items
                  v-model="currentMediaTypeIndex"
                  class="my-3"
                >
                  <v-tab-item
                    v-for="(key, idx) in mediaTypes"
                    :key="key"
                    :value="`tabMedia-${idx}`"
                  >
                    <div
                      v-for="(mediaInStorage, storageName) in mediaByStorage"
                      :key="storageName"
                    >
                      <v-layout>
                        <h4 class="title mt-2">
                          {{ storageName }}:
                        </h4>
                      </v-layout>

                      <v-layout
                        v-if="typeof mediaInStorage[activeMedia] !== 'undefined'"
                        column
                      >
                        <v-container
                          fluid
                          grid-list-md
                          px-0
                          py-2
                        >
                          <v-layout
                            v-if="mediaInStorage[activeMedia].length > 0"
                            row
                            wrap
                          >
                            <v-flex
                              v-for="(subMedia, subIdx) in mediaInStorage[activeMedia]"
                              :key="subIdx"
                              v-bind="getSizeForMedia()"
                              class="my-1"
                            >
                              <vaff-media-display
                                :type="activeMedia"
                                :src="getSrcDependOnOptions(subMedia, false)"
                                :is-selected="mediaSelected===subMedia"
                                :height="$vuetify.breakpoint.xlOnly? '6vw' : '80px'"
                                width="100%"
                                @select="selectMedia(subMedia, false)"
                                @choose="chooseMedia(subMedia, false)"
                              />
                            </v-flex>
                          </v-layout>
                          <v-layout v-else>
                            <p class="caption">
                              {{ $vaffT(`vaffField.vaffMediaField.vaffMedia.No${storageName}`) }}
                            </p>
                          </v-layout>
                        </v-container>
                      </v-layout>

                      <v-layout v-else>
                        <vaff-loader sentence="Loading images..." />
                      </v-layout>
                    </div>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-flex>
            <v-flex
              xs12
              sm3
              xl2
              class="hidden-xs-only"
            >
              <v-card
                flat
                tile
                height="100%"
                style="background-color:#e6e6e6; border-left: 1px #a9aab0 solid"
              >
                <v-layout
                  v-if="mediaSelected !== ''"
                  :pt-3="$vuetify.breakpoint.smAndUp"
                  px-4
                  column
                  align-center
                  fill-height
                  justify-center
                >
                  <v-card-title class="mb-3">
                    {{ $vaffT('vaffField.vaffMediaField.vaffMedia.Preview') }}
                  </v-card-title>
                  <vaff-media-display
                    :key="mediaSelected"
                    :type="activeMedia"
                    :src="getSrcDependOnOptions(mediaSelected, findStorageBySrc(mediaSelected).name)"
                    :height="$vuetify.breakpoint.mdAndUp ? '12vw' : '20vw'"
                    width="100%"
                    class="pa-2 mb-2"
                  />
                  <h5
                    :class="{'subheading': $vuetify.breakpoint.lgAndUp, 'body-1': $vuetify.breakpoint.mdAndDown}"
                    class="font-weight-medium mb-3"
                  >
                    {{ selectedMediaFilename }}
                  </h5>
                  <v-card-actions class="hidden-sm-and-down">
                    <v-layout
                      :column="$vuetify.breakpoint.mdAndDown"
                      row
                      wrap
                    >
                      <v-btn
                        :href="getLinkDependOnOptionsAndSrc(mediaSelected)"
                        :medium="$vuetify.breakpoint.xlOnly"
                        :small="$vuetify.breakpoint.lgAndDown"
                        download
                        depressed
                        flat
                        color="primary"
                      >
                        <p class="caption">
                          {{ $vaffT('vaffField.vaffMediaField.vaffMedia.Download') }}
                        </p>
                      </v-btn>
                      <v-btn
                        v-if="findStorageBySrc(mediaSelected).remove"
                        :medium="$vuetify.breakpoint.xlOnly"
                        :small="$vuetify.breakpoint.lgAndDown"
                        depressed
                        flat
                        color="error"
                        @click="showRemoveDialog = true"
                      >
                        <p class="caption">
                          {{ $vaffT('vaffField.vaffMediaField.vaffMedia.Remove') }}
                        </p>
                      </v-btn>
                    </v-layout>
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>

          <v-card
            style="position: relative; border-top: 1px #a9aab0 solid"
            flat
          >
            <v-layout
              row
              wrap
              align-center
              justify-end
              px-4
              py-2
            >
              <v-btn
                :disabled="mediaSelected == ''"
                :small="$vuetify.breakpoint.xsOnly"
                :large="$vuetify.breakpoint.xlOnly"
                color="success"
                depressed
                medium
                dark
                @click="chooseMedia(mediaSelected)"
              >
                <v-icon class="mr-2">
                  done
                </v-icon> {{ $vaffT('vaffField.vaffMediaField.vaffMedia.ChooseMedia') }}
              </v-btn>
            </v-layout>
          </v-card>

          <v-layout
            v-if="showVaffUpload"
            ma-4
            column
          >
            <div
              v-for="storage in options.storageConfigs"
              :key="storage.name"
            >
              <v-flex
                v-if="storage.post"
                class="mediaAddContainer"
              >
                <vaff-media-upload
                  v-if="isPostWithWebSocket(storage)"
                  :ref="`mediaVaffUpload${storage.name}`"
                  :use-web-socket="true"
                  :headers="storage.headers || {}"
                  @addFile="sendMedia(storage, $event)"
                />
                <vaff-media-upload
                  v-else
                  :ref="`mediaVaffUpload${storage.name}`"
                  :timeout="120000"
                  :allow-multiple="true"
                  :max-file-size="500"
                  :url="getPostUrlDependOnOptions(storage)"
                  name="media"
                  label="Drop your media here"
                  visual-style="zone"
                  :headers="storage.headers || {}"
                  @onload="onLoadMedia(storage, $event)"
                />
              </v-flex>
            </div>

            <v-flex justify-center>
              <v-btn
                color="third"
                depressed
                dark
                class="my-4"
                @click="showVaffUpload = false"
              >
                {{ $vaffT('vaffField.vaffMediaField.vaffMedia.GoBack') }}
              </v-btn>
            </v-flex>
          </v-layout>

          <v-dialog v-model="showRemoveDialog" max-width="500px">
            <v-card class="px-3 pt-3 pb-3">
              <v-card-title :class="{'headline':$vuetify.breakpoint.xlOnly, 'title': $vuetify.breakpoint.lgAndDown}">{{ $vaffT('vaffField.vaffMediaField.vaffMedia.RemoveFile', {'fileName': selectedMediaFilename}) }}</v-card-title>
              <v-card-text :class="{'subheading':$vuetify.breakpoint.xlOnly, 'body-1': $vuetify.breakpoint.lgAndDown}">{{ $vaffT('vaffField.vaffMediaField.vaffMedia.RemoveFileDescription', {'fileName': selectedMediaFilename}) }}</v-card-text>
              <v-card-actions class="pt-5 pb-0">
                <v-btn
                  medium
                  color="grey"
                  flat
                  depressed
                  @click="showRemoveDialog = false"
                > {{ $vaffT('vaffField.vaffMediaField.vaffMedia.Close') }} </v-btn>
                <v-btn
                  id="btnConfirmation"
                  color="error"
                  medium
                  dark
                  depressed
                  @click="deleteMediaConfirmation()"
                >{{ $vaffT('vaffField.vaffMediaField.vaffMedia.ConfirmText') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
import MultiFieldMixin from './VaffMediaMixin';
import LoggerMixin from '../../LoggerMixin';
import { mapGetters } from 'vuex';
import VaffMediaUpload from './VaffMediaUpload.vue';

export default {
	name: 'VaffMedia',
	components: { VaffMediaUpload },
	mixins: [LoggerMixin, MultiFieldMixin],
	props: {
		value: { type: Boolean, required: true },
		currentValue: { type: String, required: true },
		defaultValue: {
			type: [String, Array],
			required: true,
		},
	},
	data() {
		return {
			mediaSelected: this.currentValue,
			mediaByStorage: {},
			media: {},
			activeMedia: '',
			activeMediaBlocked: false,
			showVaffUpload: false,
			dragEnterListener: null,
			showRemoveDialog: false,
			//dragLeaveListener: null,
		};
	},
	computed: {
		...mapGetters('vaffStore/', ['getDataByPath']),
		mediaTypes() {
			let mediaTypes = [];

			Object.keys(this.mediaByStorage).forEach(storageName => {
				Object.keys(this.mediaByStorage[storageName]).forEach(type => {
					if (!mediaTypes.includes(type)) {
						mediaTypes.push(type);
					}
				});
			});

			return mediaTypes;
		},
		currentMediaTypeIndex: {
			get() {
				const currentMediaTypeIndex = this.mediaTypes.findIndex(
					type => this.activeMedia === type
				);
				if (currentMediaTypeIndex < 0) {
					return 'tabMedia-0';
				}

				return `tabMedia-${currentMediaTypeIndex}`;
			},
			set(val) {
				if (!this.activeMediaBlocked) {
					this.activeMedia = this.mediaTypes[val];
					this.mediaSelected = '';
				}
			},
		},
		selectedMediaFilename() {
			return this.mediaSelected.split('/').pop();
		},
		service() {
			return this.identifier.split('_')[0];
		},
		arrayPath() {
			let array = this.identifier.split('_');
			array.splice(0, 1);
			return array;
		},
	},
	async created() {
		if (
			!this.options.storageConfigs ||
			!Array.isArray(this.options.storageConfigs)
		) {
			return;
		}

		await Promise.all(
			this.options.storageConfigs.map(async storageConfig => {
				if (!storageConfig.get) {
					return;
				}
				try {
					let globalMedias = await this.getMediaAnyProtocol(storageConfig);

					if (typeof globalMedias === 'string') {
						globalMedias = JSON.parse(globalMedias);
					}

					this.$set(this.mediaByStorage, storageConfig.name, globalMedias);

					if (
						this.mediaByStorage[storageConfig.name].hasOwnProperty(
							this.typePlural
						) &&
						!this.activeMediaBlocked
					) {
						this.activeMedia = this.typePlural;
						this.activeMediaBlocked = true;
					}
				} catch (e) {
					this.logger.LOGERROR(
						`vaff-WEB-TOOLS: can't fetch media at ${JSON.stringify(
							storageConfig.get
						)} or data received not json`
					);
				}
			})
		);
		if (!this.activeMedia) {
			this.activeMedia = this.mediaTypes[0];
		}
	},
	mounted() {
		this.dragEnterListener = this.$refs.vaffMedia.$refs.content.addEventListener(
			'dragenter',
			() => {
				//console.log("enter: ", e.target.className, this.showVaffUpload )
				this.showVaffUpload = true;
			},
			false
		);
	},
	beforeDestroy() {
		if (this.dragEnterListener !== null) {
			this.$refs.vaffMedia.$refs.content.removeEventListener(
				'dragenter',
				this.dragEnterListener
			);
		}
	},
	methods: {
		async sendMedia(storage, file) {
			this.$nextTick(async () => {
				if (this.isPostWithWebSocket(storage)) {
					const response = await this.getWebSocketInstance().sendFile(
						storage.post.topic,
						storage.post.listen,
						file,
						{},
						this.$refs[`mediaVaffUpload${storage.name}`][0].uploadProgress
					);

					const data = response.detail.robotMessage.data;

					this.mediaByStorage[storage.name][data.type].unshift(data.path);

					setTimeout(() => {
						this.showVaffUpload = false;
					}, 2000);
				} else {
					this.$refs[`mediaVaffUpload${storage.name}`][0].addFile(file);
				}
			});
		},
		onFileChange(storage, e) {
			let files = e.target.files || e.dataTransfer.files;

			if (files.length > 0) {
				this.showVaffUpload = true;

				this.$nextTick(async () => {
					if (this.isPostWithWebSocket(storage)) {
						this.$refs[`mediaVaffUpload${storage.name}`][0].manuallyAddFile(
							files[0]
						);
					} else {
						this.$refs[`mediaVaffUpload${storage.name}`][0].addFile(files[0]);
					}
				});
			}
		},
		onLoadMedia(storage, response) {
			response = JSON.parse(response);

			this.mediaByStorage[storage.name][response.type].unshift(response.path);

			setTimeout(() => {
				this.showVaffUpload = false;
			}, 2000);
		},
		chooseMedia(
			media,
			isLocalMediaSelected,
			closeModaleAndRemoveSelected = true
		) {
			if (typeof isLocalMediaSelected === 'undefined') {
				isLocalMediaSelected = this.isLocalMediaSelected;
			}

			this.isLocalMediaSelected = isLocalMediaSelected;

			let msg = { media: media, isLocalMedia: this.isLocalMediaSelected };

			if (this.isLocalMediaSelected) {
				msg.media = media.split(
					`/storage/apps/${this.getIdentifierDependOnOptions}/`
				)[1];
			}

			this.$emit('mediaSelected', msg);
			if (closeModaleAndRemoveSelected) {
				this.$emit('close');
				this.mediaSelected = '';
			}
		},

		selectMedia(media, isLocalMediaSelected) {
			this.mediaSelected = media;
			this.isLocalMediaSelected = isLocalMediaSelected;
		},
		getSizeForMedia() {
			if (this.type === 'image') {
				return { md2: true, sm4: true, xs6: true };
			} else if (this.type === 'sound') {
				return { xs12: true };
			} else if (this.type === 'video') {
				return { md6: true, xs12: true };
			} else {
				return { md3: true, xs6: true };
			}
		},
		async deleteMedia(source) {
			const storage = this.findStorageBySrc(source);

			try {
				const response = await this.removeMediaAnyProtocol(storage, source);

				const index = this.mediaByStorage[storage.name][response.type].indexOf(
					source
				);

				this.mediaByStorage[storage.name][response.type].splice(index, 1);

				if (
					this.defaultValue &&
					typeof this.defaultValue === 'string' &&
					this.currentValue === source
				) {
					this.mediaSelected = this.defaultValue;
				} else if (
					(this.currentValue !== this.defaultValue &&
						this.defaultValue &&
						typeof this.defaultValue === 'string') ||
					this.currentValue !== source
				) {
					this.mediaSelected = this.currentValue;
				} else {
					this.mediaSelected = '';
				}

				this.$emit('deleteMedia', {
					data: this.mediaSelected,
				});

				this.chooseMedia(this.mediaSelected, this.isLocalMediaSelected, false);
			} catch (e) {
				this.logger.LOGWARNING('Remove media error: ', e);
				this.uploadError = e.toString();
			}
		},
		deleteMediaConfirmation() {
			this.deleteMedia(this.mediaSelected);
			this.showRemoveDialog = false;
		},
	},
};
</script>

<style lang="scss">
.mediaAddContainer {
	height: 400px;
	text-align: center;
	position: relative;
}

.mediaContainer {
	max-height: 70vh;
	min-height: 50vh;
	overflow-y: scroll;
	overflow-x: hidden;

	.container.grid-list-md .layout:only-child {
		margin: 0px !important;
	}

	&::-webkit-scrollbar {
		width: 10px;
		background-color: rgba(0, 0, 0, 0.05) !important;
	}

	&::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #555;
	}
}

.closeBtn {
	.icon {
		color: #e0e0e0 !important;
		cursor: pointer;
	}
	.icon:hover {
		color: #bdbdbd !important;
	}
}
</style>
