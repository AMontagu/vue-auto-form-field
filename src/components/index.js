import { default as VaffField, VaffMediaField } from './VaffField';
import { default as VaffUpload } from './VaffUpload';
import VaffArrayField from './VaffArrayField';
import VaffArrayOfObjectField from './VaffArrayOfObjectField';
import Vaff from './Vaff';
import VaffObjectField from './VaffObjectField';

Vaff.install = function install(Vue) {
	Vue.component(VaffArrayField.name, VaffArrayField);
	Vue.component(VaffArrayOfObjectField.name, VaffArrayOfObjectField);
	Vue.component(VaffField.name, VaffField);
	Vue.component(VaffMediaField.name, VaffMediaField);
	Vue.component(Vaff.name, Vaff);
	Vue.component(VaffObjectField.name, VaffObjectField);
	Vue.component(VaffUpload.name, VaffUpload);
};

export {
	VaffField,
	Vaff,
	VaffArrayField,
	VaffArrayOfObjectField,
	VaffMediaField,
	VaffObjectField,
	VaffUpload,
};
export default Vaff;
