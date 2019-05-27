<template>
	<div>
		<v-app light>
			<vaff-props-form identifier="conditionalFormProps" :show-props-for-complex="false" v-model="propsValues"/>
			<h3>Conditional form: </h3>
			<Vaff
				identifier="conditionalForm"
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
				chiefField: {
					"@label": "Chief Field",
					"@hint": "Change the chief value to change the other field display",
					"@options": {
						displayAs: "select",
						data: [
							{ label: "Display Nothing", value: 1 },
							{ label: "Display Something", value: 2 },
							{ label: "Display Something else", value: 3 }
						]
					}
				},
				something: {
					"@label": "Something",
					"@options": {
						displayIf: {
							and: [
								{
									comparison: "equal",
									value: 2,
									path: "chiefField"
								}
							]
						}
					}
				},
				somethingElse: {
					"@label": "Something else",
					"@options": {
						displayIf: {
							and: [
								{
									comparison: "equal",
									value: 3,
									path: "chiefField"
								}
							]
						}
					}
				},
				specificCondition: {
					"@label": "Specific Condition",
					"@hint": "Display an other field with a number between 10 and 20 expect 15",
					"@options": {displayAs: "number"}
				},
				specificConditionTarget: {
					"@label": "Specific Condition Target",
					"@options": {
						displayIf: {
							and: [
								{
									comparison: "greater",
									value: 9,
									path: "specificCondition"
								},
								{
									comparison: "less",
									value: 21,
									path: "specificCondition"
								},
								{
									comparison: "notEqual",
									value: 15,
									path: "specificCondition"
								}
							]
						}
					}
				},
			},
			values: {
				chiefField: 2,
				something: "Yeah see me",
				somethingElse: "This is the best choice",
				specificCondition: 12,
				specificConditionTarget: "Yeah good number"
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
