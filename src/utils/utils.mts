import * as fs from 'fs';
import * as path from "node:path";
import { configs } from './configs.cjs';
import { makeAngularComponent } from '../stubs/angular/make-angular-component.mjs';

import advancedVueBuilder, { vueApi } from './frameworks/vue/helper.mjs'

export interface ErrnoException extends Error {
	errno?: number | undefined;
	code?: string | undefined;
	path?: string | undefined;
	syscall?: string | undefined;
}

const createComponent = (componentName: string, framework: string, template: string, customFolder: string = '', api:vueApi, advancedOpts: string[]|undefined ) => {

	const destinationFolder: string = `${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`;

	if (!fs.existsSync(destinationFolder)) {
		fs.mkdirSync(destinationFolder);
	}

	const templateFilePath: string = path.join(configs.INIT_PATH, 'src', configs.STUBS_DIR, framework, template);
	fs.readFile(templateFilePath, 'utf8', (err: ErrnoException | null, data: string) => {

		const customDestinationFolder: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder);
		const extension = template.substring(template.indexOf('.'));
		const compFileName = `${componentName}${extension}`;

		if (!fs.existsSync(customDestinationFolder)) {
			fs.mkdirSync(customDestinationFolder);
		}

		const filePathDestination: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName);

		if (framework === 'angular') {
			makeAngularComponent(filePathDestination, data, componentName);
		} else {
			if(template.indexOf('advanced') !== -1){
				switch (framework) {
					case 'vue':
						data = advancedVueBuilder(data,api,advancedOpts);
						break;
					default:
						break;
				}
			}
			data = data.replaceAll("ComponentName", capitalizeFirstLetter(componentName));
			writeFile(filePathDestination, data);
		}
		if (path.parse(template).name === 'function-component-css-module' ) {
            const styleFileName: string = `${componentName}.module.css`;
            const styleFilePathDestination: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, styleFileName);
            writeFile(styleFilePathDestination, `.${componentName} {\n\tfont-size: 1.125rem; /* 18px */\n\tline-height: 1.75rem; /* 28px */\n\tfont-weight: bold;\n}\n`);
        }
	});
}


export default createComponent;

export function writeFile(filePathDestination: string, data: string): void {
	fs.writeFile(filePathDestination, data, (err: ErrnoException | null) => {
		if (err) {
			console.error(err);
		} else {
			console.log('✅ CREATE Component: ' + filePathDestination);
		}
	});
}

export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


export function prepareAdvanced (options: string[]){
  const arr = [
      {
          type:"confirm",
          name:"advanced",
          message:"Do you want to check for advanced otpions?",
          default:false
      },{
          type:"checkbox",
          name:"advancedOpts",
          message:"Pick the parts you want in your component?",
          choices: options,
          when: (answers: {api:string, advanced:boolean})=>{
              return answers.advanced;
          },
          default:false
      }
  ]

  return [...arr];
}