import VueAutoFormField from "../../src";
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";

import { vaffStore } from '../../src';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
	Vue.use(Vuex)
	Vue.use(Vuetify, {
		theme: {
			primary: '#3f51b5',
			secondary: '#b0bec5',
			accent: '#8c9eff',
			error: '#b71c1c'
		}
	})
	Vue.use(VueAutoFormField)

	const store = new Vuex.Store({
		state: {},
		mutations: {},
		actions: {},
		modules: {
			vaffStore,
		}
	});

	Vue.mixin({store: store})

	Vue.store = store;

}