import VaffUpload from './VaffUpload';

VaffUpload.install = function install(Vue) {
	Vue.component(VaffUpload.name, VaffUpload);
};

export { VaffUpload };
export default VaffUpload;
