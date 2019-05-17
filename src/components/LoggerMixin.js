const defaultLogLevel = 30;
const LOGDEBUGLEVEL = 10;
const LOGINFOLEVEL = 20;
const LOGWARNINGLEVEL = 30;
const LOGERRORLEVEL = 40;

export default {
	computed: {
		logLevel() {
			return this.$vaffWebToolsOptions && this.$vaffWebToolsOptions.logLevel
				? this.$vaffWebToolsOptions.logLevel
				: defaultLogLevel;
		},
		logger() {
			return this.$vaffWebToolsOptions && this.$vaffWebToolsOptions.logLevel
				? this.$vaffWebToolsOptions.logLevel
				: {
						LOGDEBUG: this.LOGDEBUG,
						LOGINFO: this.LOGINFO,
						LOGWARNING: this.LOGWARNING,
						LOGERROR: this.LOGERROR,
				  };
		},
	},
	methods: {
		LOGDEBUG(...arg) {
			if (this.logLevel <= LOGDEBUGLEVEL) {
				console.log('vaffWEBTOOLS: ', ...arg);
			}
		},
		LOGINFO(...arg) {
			if (this.logLevel <= LOGINFOLEVEL) {
				console.log('vaffWEBTOOLS: ', ...arg);
			}
		},
		LOGWARNING(...arg) {
			if (this.logLevel <= LOGWARNINGLEVEL) {
				console.warn('vaffWEBTOOLS: ', ...arg);
			}
		},
		LOGERROR(...arg) {
			if (this.logLevel <= LOGERRORLEVEL) {
				console.error('vaffWEBTOOLS: ', ...arg);
			}
		},
	},
};
