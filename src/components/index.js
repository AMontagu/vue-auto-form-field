import { default as VaffField, VaffMediaField } from './VaffField';
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
};

export {
	VaffField,
	Vaff,
	VaffArrayField,
	VaffArrayOfObjectField,
	VaffMediaField,
	VaffObjectField,
};
export default Vaff;
