import { default as VaffField, VaffMediaField } from './VaffField';
import { default as VaffUpload } from './VaffUpload';
import VaffArrayField from './VaffArrayField';
import VaffArrayOfObjectField from './VaffArrayOfObjectField';
import VaffMultiField from './VaffMultiField';
import VaffObjectField from './VaffObjectField';

VaffMultiField.install = function install(Vue) {
	Vue.component(VaffArrayField.name, VaffArrayField);
	Vue.component(VaffArrayOfObjectField.name, VaffArrayOfObjectField);
	Vue.component(VaffField.name, VaffField);
	Vue.component(VaffMediaField.name, VaffMediaField);
	Vue.component(VaffMultiField.name, VaffMultiField);
	Vue.component(VaffObjectField.name, VaffObjectField);
	Vue.component(VaffUpload.name, VaffUpload);
};

export {
	VaffField,
	VaffMultiField,
	VaffArrayField,
	VaffArrayOfObjectField,
	VaffMediaField,
	VaffObjectField,
	VaffUpload,
};
export default VaffMultiField;
