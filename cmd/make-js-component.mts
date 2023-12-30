#! /usr/bin/env node

import createComponent from "../src/utils/utils.mjs";
import wizard, { Answers } from "../src/utils/wizard.mjs";

enum vueApi {
	Composition = "composition",
	Option = "option",
}

wizard()
	.then((answers: Answers) => {
		const { componentName, framework, template, folder, advancedOpts, advanced, nuxt } = answers;

		const destinationFolder: string =
			nuxt === "yes" ? (folder === "" ? "../../components" : `../../components/${folder}`) : folder;

		const api = template.indexOf("composition") !== -1 ? vueApi.Composition : vueApi.Option;
		const t = advanced ? "advanced-component.vue" : template;
		createComponent(componentName, framework, t, destinationFolder, api, advancedOpts);
	})
	.catch((e: Error) => {
		console.error(e.message);
	});
