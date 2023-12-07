import * as fs from 'fs';
import * as path from "node:path";
import { configs } from './configs.cjs';
import { makeAngularComponent } from '../stubs/angular/make-angular-component.mjs';

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




enum vueApi  {
	Composition = "composition",
	Option = "option"
}




function advancedVueBuilder(data: string, componentType: vueApi,  advancedOpts: string[]|undefined) : string{
	if(typeof advancedOpts === 'undefined') return ''
	let start = 0;
	let end = 0;
	let endString = '';
	if(componentType === vueApi.Composition ){
		
		const replacable = {
			props: "const props = defineProps(['foo'])",
			emits: "const emit = defineEmits(['inFocus', 'submit'])",
			refs : "const element = ref(null)",
			mounted: `onMounted(() => {
				console.log("the component is now mounted.")
			  })`,
			data: '',
			components: ''
		}

		
		const importsFunctions : string[] = [] 
		advancedOpts.forEach((o)=>{
			const replacePattern = `__${o}__`
			data = data.replaceAll(replacePattern,replacable[o as keyof typeof replacable])
			if(o === 'refs'){
				importsFunctions.push('ref');
			}else if(o === 'mounted'){
				importsFunctions.push('onMounted');
			}
		})
		let imports = '';
		if(importsFunctions.length > 0){
			imports = "import { "+ importsFunctions.join(', ') + " } from 'vue'"
		}

		data = data
				.replace('__refimport__',imports)
				.replace('__compositionstart__','')
				.replace('__compositionend__','')

		start = data.indexOf('__optionsstart__')
		endString = '__optionsend__'
		end = data.indexOf(endString)

	}else if(componentType === vueApi.Option){

		const replacable = {
			props: "props: ['foo'],",
			emits: "emits: ['inFocus', 'submit']," ,
			data: "data:{},",
			mounted: "mounted(){},",
			refs: "",
			components: 'components: {},'
		}

		
		advancedOpts.forEach((o)=>{
			const replacePattern = `__${o}__`			
			data = data.replaceAll(replacePattern,replacable[o as keyof typeof replacable])
		})

		data = data
				.replace('__optionsstart__','')
				.replace('__optionsend__','')


		start = data.indexOf('__compositionstart__')
		endString = '__compositionend__'
		end = data.indexOf(endString)

	}

	data = data.slice(0,start) + data.slice(end+endString.length)


	return data
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