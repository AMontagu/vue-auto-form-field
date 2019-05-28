import {mount, createLocalVue} from '@vue/test-utils';
import VaffPasswordField from '@/components/VaffField/VaffPasswordField.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import setupi18n from '../helper/i18n';

const localVue = createLocalVue();
Vue.use(Vuetify);

setupi18n(Vue);

describe('VaffPasswordField', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(VaffPasswordField, {
			localVue,
			propsData: {
				value: 'test'
			}
		});
	});

	describe('component: props', () => {

		describe(':label', () => {

			it('Set default props value to textField label', () => {
				expect(wrapper.find('.textField').props('label')).toBe('Password');
			});

			it('Transmit correctly props to the text field', () => {
				wrapper.setProps({
					label: 'test'
				});
				expect(wrapper.find('.textField').props('label')).toBe('test');
			});
		});
	});


	describe('component: data', () => {

		describe('visible', () => {

			it('Apply type input with visible by default', () => {
				expect(wrapper.find('input').attributes('type')).toBe('password');
			});

			it('Apply type input with visible to true', () => {
				wrapper.vm.visible = true;
				expect(wrapper.find('input').attributes('type')).toBe('text');
			});

			it('Apply type icon with visible by default', () => {
				expect(wrapper.find('.v-icon').text()).toBe('visibility');
			});

			it('Apply type icon with visible to true', () => {
				wrapper.vm.visible = true;
				expect(wrapper.find('.v-icon').text()).toBe('visibility_off');
			});
		});
	});


	describe('component: computed', () => {

		describe('password', () => {

			it('Return value in input', () => {
				expect(wrapper.props('value')).toBe('test');
			});

			it('Emit value if password value change', () => {
				wrapper.vm.password = 'blabla';
				expect(wrapper.emitted('input')[0]).toEqual(['blabla']);
			});
		});
	});


	describe('component: actions', () => {

		describe('click', () => {

			it('Change visibility value when v-text-field is clicked', () => {
				wrapper.find('.v-icon').trigger('click');
				expect(wrapper.vm.visible).toBe(true);
			});
		});
	});
});
