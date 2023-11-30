import * as fs from "fs";
import * as path from "node:path";
import { configs } from "./configs.cjs";

interface ErrnoException extends Error {
	errno?: number | undefined;
	code?: string | undefined;
	path?: string | undefined;
	syscall?: string | undefined;
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const createComponent = (componentName: string, framework: string, template: string, customFolder: string = "") => {
	if (!fs.existsSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`)) {
		fs.mkdirSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`);
	}
	fs.readFile(
		path.join(configs.INIT_PATH, "src", configs.STUBS_DIR, framework, template),
		"utf8",
		(err: ErrnoException | null, data: string) => {
			data = data.replaceAll("ComponentName", capitalizeFirstLetter(componentName));
			if (!fs.existsSync(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder))) {
				fs.mkdirSync(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder));
			}
			const extension = template.substring(template.indexOf("."));
			const compFileName = `${componentName}${extension}`;
			fs.writeFile(
				path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName),
				data,
				(err: ErrnoException | null) => {
					if (err) {
						console.error(err);
					} else {
						console.log("Done ✅");
					}
				},
			);
		},
	);
};

export default createComponent;
