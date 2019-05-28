import { mount, createLocalVue } from '@vue/test-utils';
import VaffColorField from '@/components/VaffField/VaffColorField.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import setupi18n from '../helper/i18n';

const localVue = createLocalVue();
Vue.use(Vuetify);

setupi18n(Vue);

describe('VaffColorField', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(VaffColorField, {
            localVue,
            stubs: {
                'sketch-picker': '<div id=\'picker\' :value=\'value\'></div>'
            }
        });
    });

    describe('component: props', () => {

        describe(':value', () => {

            it('Set colorPickerBackgroundColor to empty string when props \'value\' by default', () => {
                expect(wrapper.find('#colorPicker').element.style.backgroundColor).toBe('');
            });

            it('Transmit correctly props to the color pciker', () => {
                wrapper.setData({
                    showColorPicker: true
                });
                expect(wrapper.find('#picker').props('value')).toBe('');
            });

            it('Apply correctly the background color with the props value', () => {
                wrapper.setProps({
                    value: 'green',
                });
                expect(wrapper.find('#colorPicker').element.style.backgroundColor).toBe('green');
            });

            it('Transmit correctly the props value', () => {
                wrapper.setData({
                    showColorPicker: true
                });
                wrapper.setProps({
                    value: 'green'
                });
                expect(wrapper.find('#picker').props('value')).toBe('green');
            });
        });
    });


    describe('component: actions', () => {

        describe('click on the element component', () => {

            it('Display colorPickerContainer when btnShowPicker is clicked', () => {
                wrapper.find('#btnShowPicker').trigger('click');
                expect(wrapper.find('.colorPickerContainer').exists()).toBe(true);
            });

            it('Hide colorPickerContainer when btnHiddenPicker is clicked', () => {
                wrapper.setData({
                    showColorPicker: true
                });
                wrapper.find('#btnHiddenPicker').trigger('click');
                expect(wrapper.find('.colorPickerContainer').exists()).toBe(false);
            });
        });
    });
});
