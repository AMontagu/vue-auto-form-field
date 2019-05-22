<template>
	<div>
		<Vaff
			identifier="firstForm"
			:field="fields"
			v-model="data"
		/>
	</div>
</template>

<script>

export default {
	name: "vaffExample",
	data() {
		return {
			fields: {
				field1: {
					"@label": "Text input",
				},
				field2: {
					"@label": "Text input",
				},
			},
			data: {
				field1: "first",
				field2: "second"
			}
		};
	}
};
</script>
