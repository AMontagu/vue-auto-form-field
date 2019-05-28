import { mount, createLocalVue } from '@vue/test-utils';
import VaffMedia from '@/components/VaffField/VaffMediaField/VaffMedia.vue';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VaffTools from '@/index';
import axios from 'axios';
import fixVuetifyDataAppWarnings from '../../fixVuetifyDataAppWarnings';
import setupi18n from '../../helper/i18n';

const localVue = createLocalVue();
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VaffTools, {
	vaffMediaOptions: {
		baseUrl: 'http://localhost:3000',
		splitIdentifier: '_',
		storageConfigs: [
			{
				name: 'LocalMedia',
				storage: '/storage/apps/{identifier}',
				useStorageAsPrefix: true,
				useBaseUrl: true,
				useIdentifier: true,
				get: '/api/media/{identifier}',
				download: '/api/media/{identifier}/download',
				/*downloadToken: store.getters['auth/token']*/
			},
			{
				name: 'GlobalMedia',
				storage: '/storage/media',
				useBaseUrl: true,
				get: '/api/media',
				post: '/api/media/add',
				download: '/api/media/download',
				/*downloadToken: store.getters['auth/token']*/
			},
			{
				name: 'PublicMedia',
				storage: '/shf',
				useBaseUrl: true,
			},
		],
	},
});
localVue.prototype.$http = axios;

setupi18n(localVue);

describe('VaffMedia.vue', () => {
	fixVuetifyDataAppWarnings();
	const getMountedWrapper = () =>
		mount(VaffMedia, {
			localVue,
			store: new Vuex.Store({}),
			propsData: {
				value: false,
				currentValue: '',
				defaultValue: '',
			},
		});

	describe('selectedMediaFilename', () => {
		it('returns the selected media filename with its extension', () => {
			const wrapper = getMountedWrapper();

			wrapper.vm.mediaSelected =
				'/storage/apps/jackpot/images/jackpot-icon-100-30.png';

			expect(wrapper.vm.selectedMediaFilename).toBe('jackpot-icon-100-30.png');
		});
	});
});
