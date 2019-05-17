import objectPath from 'object-path';
import Vue from 'vue';
import cloneDeep from 'lodash.clonedeep';

const state = {
	data: {},
};

const getters = {
	getData: state => {
		return state.data;
	},
	getDataByPath: (state, getters) => path => {
		return objectPath.get(getters.getData, path) || '';
	},
};

const actions = {};

const mutations = {
	removeElement(state, identifier) {
		delete state.data[identifier];
	},
	setElement(state, { identifier, data }) {
		Vue.set(state.data, identifier, data);
	},
	setData(state, { identifier, data }) {
		Vue.set(state.data, identifier, data);
	},
	setSubData(state, { data, path }) {
		if (!objectPath.has(state.data, path)) {
			return;
		}

		objectPath.set(state.data, path, data);

		const identifier = path.split('.')[0];

		// After setting the sub data, we make the "data" key reactive
		Vue.set(state.data, identifier, cloneDeep(state.data[identifier]));
	},
	sliceData(state, { index, path }) {
		if (
			!objectPath.has(state.data, path) ||
			!Array.isArray(objectPath.get(state.data, path))
		) {
			return;
		}
		objectPath.get(state.data, path).splice(index, 1);
	},
	pushData(state, { data, path }) {
		if (
			!objectPath.has(state.data, path) ||
			!Array.isArray(objectPath.get(state.data, path))
		) {
			return;
		}
		objectPath.get(state.data, path).push(data);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
