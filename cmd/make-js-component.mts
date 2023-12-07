#! /usr/bin/env node


import wizard, { Answers } from "../utils/wizard.mjs";
import createComponent, {createComponentAdvanced} from "../src/utils/utils.mjs";

enum vueApi  {
	Composition = "composition",
	Option = "option"
}
wizard().then((answers: Answers) => {
	const { componentName, framework, template, folder, advancedOpts, advanced } = answers;
	
	if(advanced){
		console.log("replace advanced")
		const templateAdv = "advanced-component.vue"
		const api = template.indexOf('composition') !== -1 ? vueApi.Composition : vueApi.Option;
		createComponentAdvanced(componentName, framework, templateAdv, folder, api, advancedOpts)
	}else{
		console.log("replace normal")
		createComponent(componentName, framework, template, folder)
	}
}).catch((e: Error) => {
	console.error(e.message)
})