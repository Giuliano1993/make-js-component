const fs = require("node:fs");
const os = require("node:os");
const { join, resolve } = require("node:path");
const { pathToFileURL } = require("node:url");
const { configs } = require("../src/utils/configs.cjs");

const repoRoot = resolve(__dirname, "..");
const originalConfigs = { ...configs };

function importModule(relativePath) {
	return import(pathToFileURL(resolve(repoRoot, relativePath)).href);
}

describe("createComponent", () => {
	let tempDir;

	beforeEach(() => {
		tempDir = fs.mkdtempSync(join(os.tmpdir(), "mjc-create-"));
		configs.BASE_DIR = tempDir;
		configs.INIT_PATH = repoRoot;
	});

	afterEach(() => {
		Object.assign(configs, originalConfigs);
		fs.rmSync(tempDir, { force: true, recursive: true });
		jest.restoreAllMocks();
	});

	test("creates a React CSS module component with matching identifiers and stylesheet", async () => {
		const { default: createComponent } = await importModule("src/utils/utils.mjs");

		const createdPath = await createComponent(
			"hello-world",
			"react",
			"function-component-css-module.tsx",
			"ui",
			"option",
			[]
		);

		const componentPath = join(tempDir, "components", "ui", "hello-world.tsx");
		const stylesheetPath = join(tempDir, "components", "ui", "hello-world.module.css");
		const componentContent = fs.readFileSync(componentPath, "utf8");
		const stylesheetContent = fs.readFileSync(stylesheetPath, "utf8");

		expect(createdPath).toBe(componentPath);
		expect(componentContent).toContain('import styles from "./hello-world.module.css";');
		expect(componentContent).toContain("export default function HelloWorld");
		expect(componentContent).toContain("styles.HelloWorld");
		expect(stylesheetContent).toContain(".HelloWorld");
	});

	test("creates Angular component and spec files in the requested custom folder", async () => {
		const { default: createComponent } = await importModule("src/utils/utils.mjs");

		const createdPath = await createComponent("hello-world", "angular", "component.component.ts", "admin", "option", []);

		const componentPath = join(tempDir, "components", "admin", "hello-world.component.ts");
		const specPath = join(tempDir, "components", "admin", "hello-world.component.spec.ts");
		const componentContent = fs.readFileSync(componentPath, "utf8");
		const specContent = fs.readFileSync(specPath, "utf8");

		expect(createdPath).toBe(componentPath);
		expect(fs.existsSync(specPath)).toBe(true);
		expect(componentContent).toContain('selector: "app-hello-world"');
		expect(componentContent).toContain("export class HelloWorldComponent");
		expect(componentContent).toContain('public title: string = "HelloWorldComponent"');
		expect(specContent).toContain('describe("HelloWorldComponent"');
		expect(specContent).toContain('from "./component.component"');
	});
});
