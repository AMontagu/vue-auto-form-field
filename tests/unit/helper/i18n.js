export default Vue => {
	Vue.prototype.$getLocale = () => {
		return 'en';
	};

	Vue.prototype.$getLocaleBCPTag = () => {
		return 'en-US';
	};

	Vue.prototype.$vaffT = key => {
		return key;
	};
};
