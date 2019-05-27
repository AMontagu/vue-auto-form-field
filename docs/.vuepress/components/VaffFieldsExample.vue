<template>
	<div>
		<v-app light>
			<Vaff
				:identifier="identifier"
				:field="fields[type]"
				v-model="values[type]"
			/>
		</v-app>

	</div>
</template>

<script>

export default {
	name: "vaffExample",
	props: {
		type: {
			type: String,
			default: 'primitive'
		},
		identifier: {
			type: String,
			default: 'identifier'
		}
	},
	data() {
		return {
			fields: {
				primitive: {
					"@label": "Primitive Visualization",
					"@hint": "optional",
				},
				array: {
					"@label": "Array Visualization",
					"@default": ["stringAdded"]
				},
				object: {
					"@label": "Object Visualization",
					"@data": {
						key1: {
							"@label": "key1 Visualization"
						},
						key2: {
							"@label": "key2 Visualization"
						}
					}
				},
				arrayObject: {
					"@label": "Array of Object",
					"@data": [
						{
							"key1Item": {
								"@label": "key1 of item",
								"@default": "string"
							},
							"key2Item": {
								"@label": "key2 of item",
								"@default": "string"
							}
						}
					]
				},
				checkbox: {
					"@label": "Chekbox Visualization",
					"@options": {"displayAs": "checkbox"}
				},
				selectObject: {
					"@label": "Select Object Visualization",
					"@options": {"displayAs": "select", "data": [
						{"label": "Choice 1", "value": 1},
						{"label": "Choice 2", "value": 2},
						{"label": "Choice 3", "value": 3}
					]}
				},
				selectArray: {
					"@label": "Select Array Visualization",
					"@options": {"displayAs": "select", "data": [1,2,3]}
				},
				multipleCheckbox: {
					"@label": "Multiple Checkbox Visualization",
					"@options": {"displayAs": "multiplecheckbox", "data": ["check1", "check2", "check3", "check4"]}
				},
				number: {
					"@label": "Number Visualization",
					"@options": {"displayAs": "number"}
				},
				durationDays: {
					"@label": "Duration Days Visualization",
					"@options": {
						"displayAs": "duration",
						"data": {
							"periods": ["years", "months", "days"],
							"min": 5,
							"max": 50
						}
					}
				},
				durationMinutes: {
					"@label": "Duration Minutes Visualization",
					"@options": {
						"displayAs": "duration",
						"data": {
							"periods" : ["hours", "minutes"],
						}
					}
				},
				readOnly: {
					"@label": "readOnly",
					"@hint": "",
					"@options": {"displayAs": "readonly"}
				},
				hidden: {
					"@label": "hidden",
					"@options": {"displayAs": "hidden"}
				},
				password: {
					"@label": "password",
					"@options": {"displayAs": "password"}
				},
				date: {
					"@label": "date",
					"@options": {"displayAs": "datetime", "data": {"type": "date", "format": "DD-MM-YYYY", "dateFormat": "YYYY-MM-DD"}}
				},
				slider: {
					"@label": "slider",
					"@options": {"displayAs": "slider", "data": {"min": 100, "max": 1000, "step": 5}}
				},
				textarea: {
					"@label": "textarea",
					"@options": {"displayAs": "textarea"}
				},
				color: {
					"@label": "color",
					"@options": {"displayAs": "color"}
				}
			},
			values: {
				primitive: "first",
				array: ["string1", "string2", "string3"],
				object: {
					key1: "key1Value",
					key2: "key2Value"
				},
				arrayObject: [
					{
						key1Item: "string",
						key2Item: "string"
					},
					{
						key1Item: "string",
						key2Item: "string"
					}
				],
				checkbox: true,
				selectObject: 2,
				selectArray: 1,
				multipleCheckbox: ["check1", "check4"],
				number: 42,
				durationDays: 455,
				durationMinutes: 90,
				readOnly: "foo",
				hidden: "bar",
				password: "mySecretPassword",
				date: "01-07-2016",
				slider: 300,
				textarea: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				color: "#6A1BBD",
			}
		};
	}
};
</script>

<style lang="scss">
@import "./vuetifyNeeded.css";
</style>