import VaffMediaField from './VaffMediaField';
import VaffMedia from './VaffMedia';
import VaffMediaDisplay from './VaffMediaDisplay';
import VaffMediaUpload from './VaffMediaUpload';

VaffMediaField.install = function install(Vue) {
	Vue.component(VaffMediaField.name, VaffMediaField);
	Vue.component(VaffMedia.name, VaffMedia);
	Vue.component(VaffMediaDisplay.name, VaffMediaDisplay);
	Vue.component(VaffMediaUpload.name, VaffMediaUpload);
};

export { VaffMediaField, VaffMedia, VaffMediaDisplay, VaffMediaUpload };
export default VaffMediaField;
