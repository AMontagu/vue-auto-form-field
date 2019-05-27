<template>
	<div>
		<v-app light>
			<vaff-props-form identifier="registerFormProps" v-model="propsValues"/>
			<h3>Register form: </h3>
			<Vaff
				identifier="arrayForm"
				:field="fields"
				v-model="values"
				v-bind="propsValues"
			/>
		</v-app>
	</div>
</template>

<script>
import VaffPropsForm from './VaffPropsForm.vue';
export default {
	name: "vaffExample",
	components: {
		VaffPropsForm
	},
	data() {
		return {
			fields: {
				name: {
					"@label": "Company Name",
				},
				departments: {
					"@label": "Departments",
					"@data": [
						{
							name: {
								"@label": "Department Name",
								"@default": ""
							},
							employees: {
								"@label": "Employees",
								"@data": [
									{
										name: {
											"@label": "Employee Name",
											"@default": ""
										},
										position: {
											"@label": "Employee Position",
											"@default": ""
										}
									}
								],
							},
						}
					],
				},
			},
			values: {
				name: "Vaff & co",
				departments: [
					{
						name: "fields",
						employees: [
							{
								name: "checkbox",
								position: "Boolean helper"
							},
							{
								name: "password",
								position: "Privacy helper"
							}
						]
					},
					{
						name: "components",
						employees: [
							{
								name: "Multi",
								position: "Organize fields"
							},
							{
								name: "Single",
								position: "Display field"
							}
						]
					}
				]
			},
			propsValues: {
				useDivider: true,
				visualStyle: "inline",
				itemsPerRow: 1,
				showDownload: true,
				showAdd: true,
				showHeader: true,
				headername: '',
			},
		};
	}
};
</script>

<style lang="scss">
@import "./vuetifyNeeded.css";
</style>
