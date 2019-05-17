import VaffMediaField from './VaffMediaField';
import VaffMedia from './VaffMedia';
//NOT WORKING ON ROBOT-WEB
/*const VaffMedia = () => import('./VaffMedia');*/
import VaffMediaDisplay from './VaffMediaDisplay';

VaffMediaField.install = function install(Vue) {
	Vue.component(VaffMediaField.name, VaffMediaField);
	Vue.component(VaffMedia.name, VaffMedia);
	Vue.component(VaffMediaDisplay.name, VaffMediaDisplay);
};

export { VaffMediaField, VaffMedia, VaffMediaDisplay };
export default VaffMediaField;
