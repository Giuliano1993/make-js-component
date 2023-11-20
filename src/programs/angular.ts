import { Command } from '@commander-js/extra-typings';
import createComponent from '../utils/utils';


const prepareAngularProgram = (program: Command)=>{
    program
    .command("ng")
    .argument('<component name>','the component name')
    .option("-f, --folder <path>", "a custom folder inside components to save the component")
    .action((name:string, opts:{
        folder?: string|undefined,
    })=>{
        const componentTemplate : string = 'component.component.js'
        const customFolder: string = opts.folder || "";

        try {
            createComponent(name,'angular',componentTemplate,customFolder);
        } catch (error) {
            console.error(error)
        }
    })

}

export default prepareAngularProgram;