import VueAutoFormField from "../../src";
import Vuex from 'vuex';

import { vaffStore } from '../../src';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
	Vue.use(VueAutoFormField)
	Vue.use(Vuex)

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