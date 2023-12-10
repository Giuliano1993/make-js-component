export enum vueApi {
	Composition = "composition",
	Option = "option",
}

export default function advancedVueBuilder(
	data: string,
	componentType: vueApi,
	advancedOpts: string[] | undefined
): string {
	if (typeof advancedOpts === "undefined") return "";
	let output = data;
	if (componentType === vueApi.Composition) {
		const replacable = {
			props: "const props = defineProps(['foo'])",
			emits: "const emit = defineEmits(['inFocus', 'submit'])",
			refs: "const element = ref(null)",
			mounted: `onMounted(() => {
				console.log("the component is now mounted.")
			  })`,
			data: "",
			components: "",
		};
		const importsFunctions: string[] = [];
		for (const key in replacable) {
			const codeInject = advancedOpts.indexOf(key) !== -1 ? replacable[key as keyof typeof replacable] : "";
			const replacePattern = `__${key}__`;
			output = output.replaceAll(replacePattern, codeInject);
			if (key === "refs" && advancedOpts.indexOf(key) !== -1) {
				importsFunctions.push("ref");
			} else if (key === "mounted" && advancedOpts.indexOf(key) !== -1) {
				importsFunctions.push("onMounted");
			}
		}

		let imports = "";
		if (importsFunctions.length > 0) {
			imports = `import { ${importsFunctions.join(", ")} } from 'vue'`;
		}
		output = output.replace("__refimport__", imports);
	} else if (componentType === vueApi.Option) {
		const replacable = {
			props: "props: ['foo'],",
			emits: "emits: ['inFocus', 'submit'],",
			data: "data:{},",
			mounted: "mounted(){},",
			refs: "",
			components: "components: {},",
		};
		for (const key in replacable) {
			const codeInject = advancedOpts.indexOf(key) !== -1 ? replacable[key as keyof typeof replacable] : "";
			const replacePattern = `__${key}__`;
			output = output.replaceAll(replacePattern, codeInject);
		}
	}
	output = cleanVueData(output, componentType);

	return output;
}

function cleanVueData(data: string, api: vueApi): string {
	const apiStart = api === vueApi.Composition ? "__compositionstart__" : "__optionsstart__";
	const apiEnd = api === vueApi.Composition ? "__compositionend__" : "__optionsend__";
	const deleteStart = api === vueApi.Composition ? "__optionsstart__" : "__compositionstart__";
	const deleteEnd = api === vueApi.Composition ? "__optionsend__" : "__compositionend__";

	const output = data.replace(apiStart, "").replace(apiEnd, "");

	const start = output.indexOf(deleteStart);
	const end = output.indexOf(deleteEnd);
	return output.slice(0, start) + output.slice(end + deleteEnd.length);
}
