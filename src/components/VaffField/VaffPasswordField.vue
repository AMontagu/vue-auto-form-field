<template>
  <v-text-field
    v-model="password"
    :label="label"
    :type="visible ? 'text' : 'password'"
    :append-icon="visible ? 'visibility_off' : 'visibility'"
    v-bind="$attrs"
    class="textField"
    data-app="true"
    @click:append="() => (visible = !visible)"
    v-on="$listeners"
  />
</template>

<script>
export default {
	name: 'VaffPasswordField',
	props: {
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: 'Password',
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	computed: {
		password: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit('input', value);
			},
		},
	},
};
</script>
