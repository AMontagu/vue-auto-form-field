import { mapGetters, mapMutations } from 'vuex';
import pluralize from 'pluralize';
import cloneDeep from 'lodash/cloneDeep';

export default {
	filters: {
		singularize(value) {
			return pluralize.singular(value);
		},
		article(value, locale = 'en') {
			let article = null;

			if (locale === 'fr') {
				return `un élément ${value}`;
			}

			switch (value.charAt(0)) {
				case 'a':
				case 'e':
				case 'i':
				case 'o':
				case 'u':
					article = 'an';
					break;
				default:
					article = 'a';
			}

			return `${article} ${value}`;
		},
	},
	props: {
		identifier: { type: String, required: true },
		value: {
			type: [String, Number, Boolean, Array, Object, Date],
			required: true,
		},
		field: { type: [Object, Array], required: true },
		path: { type: String, default: '' },
		showDownload: { type: Boolean, default: false },
		showAdd: { type: Boolean, default: true },
		useDivider: { type: Boolean, default: true },
		// separate, inline, solo, outline
		visualStyle: { type: String, default: 'separate' },
		showHeader: { type: Boolean, default: true },
		itemsPerRow: { type: Number, default: 1 },
		headername: { type: String, default: '' },
	},
	data() {
		return {
			data: null,
			displayIfValue: true,
		};
	},
	computed: {
		...mapGetters('vaffStore/', ['getDataByPath']),
		fieldName() {
			let pathSplit = this.pathWithId.replace(/_/g, '.').split('.');
			return pathSplit[pathSplit.length - 1];
		},
		columnNumber() {
			let size = Math.floor(12 / this.itemsPerRow);
			if (size < 1) {
				size = 1;
			} else if (size > 12) {
				size = 12;
			}
			return size;
		},
		widthOfItem() {
			let attribute = {};
			attribute[`xs${this.columnNumber}`] = true;
			return attribute;
		},
		pathWithId() {
			return this.path ? `${this.identifier}.${this.path}` : this.identifier;
		},
		displayIfOption() {
			if (
				typeof this.field !== 'undefined' &&
				typeof this.field['@options'] !== 'undefined' &&
				typeof this.field['@options'].displayIf !== 'undefined'
			) {
				return this.field['@options'].displayIf;
			}
			return null;
		},
	},
	watch: {
		value(newValue) {
			// Set twice if multi field parent and vaff array, vaff array of object or vaff object as children. Can't find how to do without adding inner props or reformat code.
			// If remove watch need to eject vuex. But performance will decrease.
			if (!this.path) {
				this.setElement({
					identifier: this.identifier,
					data: cloneDeep(newValue),
					fields: this.field,
				});
			}
			this.data = this.getDataByPath(this.pathWithId);
		},
	},
	created() {
		if (typeof this.value !== 'undefined' && !this.path) {
			this.setElement({
				identifier: this.identifier,
				data: cloneDeep(this.value),
				fields: this.field,
			});
		} else if (!this.path) {
			console.error(
				`vaff-WEB-TOOLS: You need to pass some data to ${this.$options.name}`
			);
		}

		this.data = this.getDataByPath(this.pathWithId);
	},
	methods: {
		...mapMutations('vaffStore/', ['setElement']),
		checkCondition(valueInCondition, valueToCheck, comparison) {
			switch (comparison) {
				case 'equal':
					return valueInCondition.toString() === valueToCheck.toString();
				case 'greater':
					return parseInt(valueInCondition) < parseInt(valueToCheck);
				case 'less':
					return parseInt(valueInCondition) > parseInt(valueToCheck);
				case 'notEqual':
					return valueInCondition.toString() !== valueToCheck.toString();
			}
		},
		displayAs(type) {
			return (
				typeof this.field !== 'undefined' &&
				typeof this.field['@options'] !== 'undefined' &&
				typeof this.field['@options'].displayAs !== 'undefined' &&
				this.field['@options'].displayAs.toLowerCase() === type
			);
		},
		replacePlaceholderByCurrentItemPath(
			controllerPath,
			placeholder = '[PLACEHOLDER]'
		) {
			controllerPath.split('.').forEach((val, index) => {
				if (val === placeholder) {
					let array = this.pathWithId.split('.');
					controllerPath = controllerPath.replace(placeholder, array[index]);
				}
			});
			return controllerPath;
		},
		refreshIfCondition() {
			if (this.displayIfOption) {
				let display = { and: true, or: false };

				Object.keys(this.displayIfOption).forEach(logicalOperator => {
					this.displayIfOption[logicalOperator].forEach(displayIfElement => {
						const fullPath = this.replacePlaceholderByCurrentItemPath(
							`${this.identifier}.${displayIfElement.path}`
						);

						switch (logicalOperator) {
							case 'and':
								if (
									!this.checkCondition(
										displayIfElement.value,
										this.getDataByPath(fullPath),
										displayIfElement.comparaison
									)
								) {
									display.and = false;
								}
								break;
							case 'or':
								if (
									this.checkCondition(
										displayIfElement.value,
										this.getDataByPath(fullPath),
										displayIfElement.comparaison
									)
								) {
									display.or = true;
								}
								break;
						}
					});
				});

				this.displayIfValue = display.or ? display.or : display.and;
			}
		},
		emitInputObjectWhenOnlySubDataChanged(subFieldName, subFieldNameValue) {
			this.$emit('input', {
				...this.getDataByPath(this.pathWithId),
				[subFieldName]: subFieldNameValue,
			});
		},
	},
};
