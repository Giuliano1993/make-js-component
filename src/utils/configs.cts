import * as path from "node:path";

const mainFilename = path.dirname(module?.filename || "");
const dir = path.join(mainFilename, "../..");

export const configs = {
	INIT_PATH: dir,
	BASE_DIR: "./src",
	STUBS_DIR: "stubs",
	COMPONENT_FOLDER: "/components",
};
