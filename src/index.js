import * as VaffComponents from "./components";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vaffStore from "./store/vaffStore";
import objectPath from 'object-path';

import EnMessage from "./locales/en/index.js";
import FrMessage from "./locales/fr/index.js";

const langToBCP47 = {
  fr: "fr-FR",
  en: "en-US"
};

const VueAutoFormField = {
  install(Vue, options) {
    Vue.prototype.$vaffWebToolsOptions = options;

    if (options && options.i18n) {
      options.i18n.mergeLocaleMessage("en", EnMessage);
      options.i18n.mergeLocaleMessage("fr", FrMessage);
    }

	  function getLocale() {
		  if (!options || !options.i18n) {
			  return 'en';
		  }
		  return options.i18n.locale;
	  }

    Vue.prototype.$getLocale = getLocale;

    Vue.prototype.$getLocaleBCPTag = () => {
      if (!options || !options.i18n || !langToBCP47[options.i18n.locale]) {
        return "en-US";
      }
      return langToBCP47[options.i18n.locale];
    };

	  Vue.prototype.$getValueTranslated = (config) => {
		  if(typeof config === 'object') {
			  return config[getLocale()] || Object.keys(config)[0]
		  }
		  return config
	  }

    Vue.prototype.$vaffT = (...keys) => {
      if (!options || !options.i18n) {
      	return objectPath.get(EnMessage, keys[0])
        //return keys[0];
      }
      return options.i18n.t(...keys);
    };

    Vue.use(Vuetify);
    Object.values(VaffComponents).forEach(component => {
      Vue.use(component);
    });
  },
  version: "0.1"
};

export default VueAutoFormField;
export {VueAutoFormField, vaffStore };
