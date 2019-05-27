<template>
	<div>
		<v-app light>
			<vaff-props-form identifier="registerFormProps" :show-props-for-complex="false" v-model="propsValues"/>
			<h3>Register form: </h3>
			<Vaff
				identifier="registerForm"
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
					"@label": "Name",
				},
				birthDate: {
					"@label": "Birth Date",
					"@options": {"displayAs": "datetime", "data": {"type": "date", "format": "DD-MM-YYYY", "dateFormat": "DD-MM-YYYY"}}
				},
				email: {
					"@label": "Email",
				},
				password: {
					"@label": "Password",
					"@options": {"displayAs": "password"}
				},
				confirmPassword: {
					"@label": "Confirm Password",
					"@options": {"displayAs": "password"}
				}
			},
			values: {
				name: "",
				birthDate: new Date().toISOString(),
				email: "",
				password: "",
				confirmPassword: "",
			},
			propsValues: {
				useDivider: true,
				visualStyle: "inline",
				itemsPerRow: 1
			},
		};
	}
};
</script>

<style lang="scss">
@import "./vuetifyNeeded.css";
</style>
