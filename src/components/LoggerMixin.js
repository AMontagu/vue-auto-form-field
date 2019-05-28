const defaultLogLevel = 30;
const LOGDEBUGLEVEL = 10;
const LOGINFOLEVEL = 20;
const LOGWARNINGLEVEL = 30;
const LOGERRORLEVEL = 40;

export default {
	computed: {
		logLevel() {
			return this.$vaffOptions && this.$vaffOptions.logLevel
				? this.$vaffOptions.logLevel
				: defaultLogLevel;
		},
		logger() {
			return this.$vaffOptions && this.$vaffOptions.logLevel
				? this.$vaffOptions.logLevel
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
				// eslint-disable-next-line
				console.log('vaffWEBTOOLS: ', ...arg);
			}
		},
		LOGINFO(...arg) {
			if (this.logLevel <= LOGINFOLEVEL) {
				// eslint-disable-next-line
				console.log('vaffWEBTOOLS: ', ...arg);
			}
		},
		LOGWARNING(...arg) {
			if (this.logLevel <= LOGWARNINGLEVEL) {
				// eslint-disable-next-line
				console.warn('vaffWEBTOOLS: ', ...arg);
			}
		},
		LOGERROR(...arg) {
			if (this.logLevel <= LOGERRORLEVEL) {
				// eslint-disable-next-line
				console.error('vaffWEBTOOLS: ', ...arg);
			}
		},
	},
};
