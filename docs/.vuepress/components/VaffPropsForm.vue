<template>
	<div>
		<h3>Props:</h3>
		<Vaff
			:identifier="identifier"
			:field="fields"
			:value="value"
			:itemsPerRow="2"
			@input="$emit('input', $event)"
		/>
	</div>
</template>

<script>
export default {
	name: 'VaffPropsForm',
	props: {
		identifier: {
			type: String,
			required: true,
		},
		showPropsForComplex: {
			type: Boolean,
			default: true,
		},
		value: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			fieldsSimple: {
				useDivider: {
					"@label": "useDivider",
					"@options": {"displayAs": "checkbox"}
				},
				visualStyle: {
					"@label": "visualStyle",
					"@options": {"displayAs": "select", "data": ["separate","inline","solo", "outline"]}
				},
				itemsPerRow: {
					"@label": "itemsPerRow",
					"@options": {"displayAs": "number"}
				}
			},
			fieldsComplex: {
				showDownload: {
					"@label": "showDownload",
					"@options": {"displayAs": "checkbox"}
				},
				showAdd: {
					"@label": "showAdd",
					"@options": {"displayAs": "checkbox"}
				},
				showHeader: {
					"@label": "showHeader",
					"@options": {"displayAs": "checkbox"}
				},
				headername: {
					"@label": "headername",
				},
			}
		};
	},
	computed: {
		fields() {
			if(this.showPropsForComplex) {
				return {...this.fieldsSimple, ...this.fieldsComplex}
			} else {
				return this.fieldsSimple
			}
		}
	}
};
</script>
