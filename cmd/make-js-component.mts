#! /usr/bin/env node

import createComponent from "../src/utils/utils.mjs";
import wizard, { Answers } from "../src/utils/wizard.mjs";

enum vueApi {
	Composition = "composition",
	Option = "option",
}
wizard()
	.then((answers: Answers) => {
		const { componentName, framework, template, folder, advancedOpts, advanced } = answers;
		const api = template.indexOf("composition") !== -1 ? vueApi.Composition : vueApi.Option;
		const t = advanced ? "advanced-component.vue" : template;
		createComponent(componentName, framework, t, folder, api, advancedOpts);
	})
	.catch((e: Error) => {
		console.error(e.message);
	});
