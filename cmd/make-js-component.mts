#! /usr/bin/env node

import createComponent, { createAnotherComponent } from "../src/utils/utils.mjs";
import wizard, { Answers } from "../src/utils/wizard.mjs";

enum vueApi {
	Composition = "composition",
	Option = "option",
}

wizard()
	.then((answers: Answers) => {
		const { componentName, framework, template, folder, anotherComponent, advancedOpts, advanced } = answers;
		const api = template.indexOf("composition") !== -1 ? vueApi.Composition : vueApi.Option;
		const t = advanced ? "advanced-component.vue" : template;
		if (anotherComponent) {
			createComponent(componentName, framework, t, folder, api, advancedOpts).then(() => {
				console.log("✅ Component created");
				createAnotherComponent();
			});
		} else
			createComponent(componentName, framework, t, folder, api, advancedOpts).then(() =>
				console.log("✅ Component created")
			);
	})
	.catch((e: Error) => {
		console.error(e.message);
	});
