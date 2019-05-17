import VaffColorField from './VaffColorField';
import VaffDateTimeField from './VaffDateTimeField';
import VaffDurationField from './VaffDurationField';
import VaffField from './VaffField';
import VaffMediaField from './VaffMediaField';
import VaffPasswordField from './VaffPasswordField';

VaffField.install = function install(Vue) {
	Vue.component(VaffColorField.name, VaffColorField);
	Vue.component(VaffDateTimeField.name, VaffDateTimeField);
	Vue.component(VaffDurationField.name, VaffDurationField);
	Vue.component(VaffField.name, VaffField);
	Vue.component(VaffMediaField.name, VaffMediaField);
	Vue.component(VaffPasswordField.name, VaffPasswordField);
};

export {
	VaffColorField,
	VaffDateTimeField,
	VaffDurationField,
	VaffField,
	VaffMediaField,
	VaffPasswordField,
};
export default VaffField;
