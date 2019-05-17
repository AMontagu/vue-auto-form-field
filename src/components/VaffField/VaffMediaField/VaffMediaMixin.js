import urlJoin from 'url-join';
import axios from 'axios';
import LoggerMixin from '../../LoggerMixin';

export default {
	mixins: [LoggerMixin],
	props: {
		type: { type: String, default: 'media' },
		identifier: { type: String, default: '' },
	},
	computed: {
		options() {
			return this.$vaffWebToolsOptions
				? this.$vaffWebToolsOptions.vaffMediaOptions
				: {};
		},
		getIdentifierDependOnOptions() {
			return this.options.splitIdentifier
				? this.identifier.split(this.options.splitIdentifier)[0]
				: this.identifier;
		},
		typePlural() {
			return `${this.type}s`;
		},
		getStorageUrls() {
			if (!this.options.storageConfigs) {
				return ['/']; //'/api/media'
			}

			return this.options.storageConfigs.map(config => {
				return config.storage;
			});
		},
	},
	created() {
		//console.log(this.getMediaUrls);
		//console.log(this.getStorageUrls);
	},
	methods: {
		findStorageByName(storageName) {
			return this.options.storageConfigs.find(
				config => config.name === storageName
			);
		},
		findStorageBySrc(src) {
			let storageConfig = this.options.storageConfigs.find(config =>
				src.startsWith(config.storage)
			);

			if (!storageConfig) {
				storageConfig =
					this.options.storageConfigs.find(
						config => config.useStorageAsPrefix
					) || this.options.storageConfigs[0];
			}

			return storageConfig;
		},
		findStorage(src, storageName) {
			if (storageName && this.findStorageByName(storageName)) {
				return this.findStorageByName(storageName);
			} else {
				return this.findStorageBySrc(src);
			}
		},
		getUrlPrefixDependOnOptions(src, storageName) {
			let storageConfig = this.findStorage(src, storageName);

			if (!src) {
				return '';
			}

			if (!storageConfig) {
				return '/';
			}

			let urlPrefixDependOnOptions = '/';

			if (storageConfig.useBaseUrl) {
				urlPrefixDependOnOptions = this.options.baseUrl;
			}

			if (storageConfig.useStorageAsPrefix) {
				urlPrefixDependOnOptions = urlJoin(
					urlPrefixDependOnOptions,
					storageConfig.storage
				);
			}

			if (storageConfig.useIdentifier) {
				urlPrefixDependOnOptions = urlPrefixDependOnOptions.replace(
					'{identifier}',
					this.getIdentifierDependOnOptions
				);
			}

			return urlPrefixDependOnOptions;
		},
		getUrlQueryDependOnOptions(src, storageName) {
			let storageConfig = this.findStorage(src, storageName);

			if (!src) {
				return '';
			}

			if (!storageConfig || typeof storageConfig.query !== 'object') {
				return '';
			}

			return (
				'?' +
				Object.keys(storageConfig.query)
					.map(
						k =>
							`${encodeURIComponent(k)}=${encodeURIComponent(
								storageConfig.query[k]
							)}`
					)
					.join('&')
			);
		},
		getSrcDependOnOptions(src, storageName) {
			const srcSplited = src.split('/');
			if (srcSplited.length <= 1) {
				return urlJoin(
					this.getUrlPrefixDependOnOptions(src, storageName),
					encodeURIComponent(src),
					this.getUrlQueryDependOnOptions(src, storageName)
				);
			}
			const srcWithoutMediaName = srcSplited
				.slice(0, srcSplited.length - 1)
				.join('/');
			const mediaName = srcSplited[srcSplited.length - 1];
			return urlJoin(
				this.getUrlPrefixDependOnOptions(src, storageName),
				encodeURI(srcWithoutMediaName),
				encodeURIComponent(mediaName),
				this.getUrlQueryDependOnOptions(src, storageName)
			);
		},
		getPostUrlDependOnOptions(storage) {
			return urlJoin(
				this.getUrlPrefixDependOnOptions(storage.post, storage.name),
				storage.post
			);
		},
		getLinkDependOnOptionsAndSrc(src) {
			const storage = this.findStorageBySrc(src);

			if (!storage.download) {
				return;
			}

			let downloadUrl = storage.download.replace(
				'{identifier}',
				this.getIdentifierDependOnOptions
			);

			if (storage.useBaseUrl) {
				downloadUrl = urlJoin(this.options.baseUrl, downloadUrl);
			}

			const srcSplited = src.split('/');
			if (srcSplited.length <= 1) {
				downloadUrl = urlJoin(
					downloadUrl,
					encodeURIComponent(src),
					this.getUrlQueryDependOnOptions(src, storage.name)
				);
			} else {
				const srcWithoutMediaName = srcSplited
					.slice(0, srcSplited.length - 1)
					.join('/');
				const mediaName = srcSplited[srcSplited.length - 1];
				downloadUrl = urlJoin(
					downloadUrl,
					encodeURI(srcWithoutMediaName),
					encodeURIComponent(mediaName),
					this.getUrlQueryDependOnOptions(src, storage.name)
				);
			}

			return downloadUrl;
		},
		isPostWithWebSocket(storage) {
			return typeof storage.post === 'object' && storage.post.protocol === 'ws';
		},
		isGetWithWebSocket(storage) {
			return typeof storage.get === 'object' && storage.get.protocol === 'ws';
		},
		isRemoveWithWebSocket(storage) {
			return (
				typeof storage.remove === 'object' && storage.remove.protocol === 'ws'
			);
		},
		getWebSocketInstance() {
			if (!this.options.socketInstance) {
				this.logger.LOGWARNING('No socket instance defined in media options !');
			}
			return this.options.socketInstance;
		},
		async getMediaAnyProtocol(storage) {
			if (typeof storage === 'undefined' || !storage.get) {
				throw new Error(`Storage ${storage.name} doesn't allow get media`);
			}

			if (this.isGetWithWebSocket(storage)) {
				const topicWithIdentifier = storage.get.topic.replace(
					'{identifier}',
					this.getIdentifierDependOnOptions
				);
				const dataWithIdentifier = {};
				if (typeof storage.get.data === 'object') {
					Object.keys(storage.get.data).forEach(dataKey => {
						dataWithIdentifier[dataKey] = storage.get.data[dataKey].replace(
							'{identifier}',
							this.getIdentifierDependOnOptions
						);
					});
				}
				return await this.options.socketInstance.ask(
					topicWithIdentifier,
					dataWithIdentifier
				);
			} else {
				let getUrl = storage.get.replace(
					'{identifier}',
					this.getIdentifierDependOnOptions
				);

				if (storage.useBaseUrl) {
					getUrl = urlJoin(this.options.baseUrl, getUrl);
				}

				const { data: medias } = await axios.get(getUrl, {
					headers: storage.headers,
				});

				return medias;
			}
		},
		async removeMediaAnyProtocol(storage, media) {
			if (!storage.remove) {
				return;
			}

			if (this.isRemoveWithWebSocket(storage)) {
				// TODO get media with ask topic

				const response = await this.options.socketInstance.ask(
					storage.remove.topic,
					{ media }
				);

				if (response.name !== 'Success') {
					throw new Error(`${response.name}: ${response.message}`);
				}

				return response;
			} else {
				let { data } = await axios.post(
					storage.remove,
					{
						media,
					},
					{ headers: storage.headers }
				);

				if (typeof data === 'string') {
					data = JSON.parse(data);
				}

				if (data.name === 'Success') {
					return data;
				} else {
					throw new Error(data.message);
				}
			}
		},
	},
};
