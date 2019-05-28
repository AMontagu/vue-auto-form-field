import {mount, createLocalVue} from '@vue/test-utils';
import VaffDateTimeField from '@/components/VaffField/VaffDateTimeField.vue';
import Vuetify from 'vuetify';
import Moment from 'moment';
import Vue from 'vue';
import setupi18n from '../helper/i18n';
import fixVuetifyDataAppWarnings from '../fixVuetifyDataAppWarnings';

const localVue = createLocalVue();
Vue.use(Vuetify);
fixVuetifyDataAppWarnings();
setupi18n(Vue);

describe('VaffDateTimeField.vue', () => {
	let propsData;
	let wrapper;

	beforeEach(() => {
		propsData = {
			value: '2019/01/01'
		}

		wrapper = mount(VaffDateTimeField, {
			localVue,
			propsData
		});
	});

	describe('component: props', () => {

		describe(':label', () => {

			it('Set datetimeText label to empty string if props are transmitted by default', () => {
				expect(wrapper.find('.datetimeText').props('label')).toBe('');
			});

			it('Update data correctly when props change', () => {
				wrapper.setProps({
					label: 'test'
				});
				expect(wrapper.find('.datetimeText').props('label')).toBe('test');
			});
		});

		describe(':type', () => {

			beforeEach(() => {
				wrapper.find('.datetimeText').trigger('click');
			})

			it('Display the \'v-date-picker\' with default value', () => {
				expect(wrapper.find('.dateInput').exists()).toBe(true);
			});

			it('Display the \'v-date-picker\' if type prop is \'date\'', () => {
				wrapper.setProps({
					type: 'date'
				});
				expect(wrapper.find('.dateInput').exists()).toBe(true);
			});

			it('Not display the \'v-date-picker\' if type prop is \'other\' ', () => {
				wrapper.setProps({
					type: 'other'
				});
				expect(wrapper.find('.dateInput').exists()).toBe(false);
			});

			it('Display the \'v-date-picker\' with default value', () => {
				expect(wrapper.find('.timeInput').exists()).toBe(true);
			});

			it('Display the \'v-date-picker\' if type prop is \'time\'', () => {
				wrapper.setProps({
					type: 'time'
				});
				expect(wrapper.find('.timeInput').exists()).toBe(true);
			});

			it('Not display the \'v-date-picker\' if type prop value is \'other\'', () => {
				wrapper.setProps({
					type: 'other'
				});
				expect(wrapper.find('.timeInput').exists()).toBe(false);
			});
		});
	});


	describe('component: computed', () => {

		describe('valueFormated', () => {

			it('Use timestamp 0 date when prop \'value\' not a string', () => {
				wrapper.setProps({
					value: 123
				})
				expect(Moment(wrapper.vm.valueFormated).isSame('1970-01-01', 'day')).toBe(true);
			});

			it('Verify that \'value\' props day number is the same that the value formated', () => {
				expect(Moment(wrapper.vm.value).isSame(wrapper.vm.valueFormated, 'day')).toBe(true);
			});
		});


		describe('datetime', () => {

			beforeEach(() => {
				wrapper.setData({
					date: '2019/01/02',
					hours: 2,
					minutes: 53
				})
			})

			it('Set correctly dateTime data with default value for props \'type\'', () => {
				expect(wrapper.vm.dateTime).toBe('2019-01-02 2:53');
			});

			it('Set correctly dateTime data with \'date\' value for props \'type\'', () => {
				wrapper.setProps({
					type: 'date'
				});
				expect(wrapper.vm.dateTime).toBe('2019-01-02');
			});

			it('Set correctly dateTime data with \'time\' value for props \'type\'', () => {
				wrapper.setProps({
					type: 'time'
				});
				expect(wrapper.vm.dateTime).toBe('2:53');
			});

			it('Set correctly dateTime data with other value for props \'type\'', () => {
				wrapper.setProps({
					type: 'other'
				});
				expect(wrapper.vm.dateTime).toBe('');
			});
		});


		describe('hoursArray', () => {

			it('Return data', () => {
				expect(wrapper.vm.hoursArray).toEqual(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'])
			});
		});


		describe('minutesArray', () => {

			it('Return data', () => {
				expect(wrapper.vm.minutesArray).toEqual(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'])
			});
		});
	});


	describe('component: methods', () => {

		describe('constructDateAndEmit', () => {

			it('Emit input event when constructDateAndEmit method is called', () => {
				wrapper.vm.constructDateAndEmit();
				expect(wrapper.emitted('input')).toBeTruthy();
			});

			/*it('Emit input event with correctly formatted dates when constructDateAndEmit method is called', (done) => {
				expect.assertions(2);
				wrapper.vm.constructDateAndEmit();
				wrapper.vm.$nextTick(() => {
					expect(Moment(wrapper.emitted('input')[0][0]).isSame('2018-12-31T23:00:00.000Z', 'day')).toBe(true);
					expect(Moment(wrapper.emitted('input')[0][1]).isSame('2019-01-01T00:00:00+01:00', 'day')).toBe(true);
					done();
				});
			});*/
		});
	});
});
