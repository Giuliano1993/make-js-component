import { Command } from '@commander-js/extra-typings';
import createComponent from '../utils/utils';


const prepareVueProgram = (program: Command)=>{
    program
    .command("vue")
    .argument('<component name>','the component name')
    .option("-f, --folder <path>", "a custom folder inside components to save the component")
    .option("-c, --composition","creates a vue component using composition API: use options API instea")
    .action((name:string, opts:{
        folder?: string|undefined,
        composition?: boolean|undefined
    })=>{
        const componentTemplate : string = opts.composition ? 'component-composition.vue' : 'component-options.vue'
        const customFolder: string = opts.folder || "";

        try {
            createComponent(name,'vue',componentTemplate,customFolder);
        } catch (error) {
            console.error(error)
        }
    })

}

export default prepareVueProgram;