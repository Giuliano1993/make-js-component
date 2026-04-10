const { resolve } = require("node:path");
const { pathToFileURL } = require("node:url");

const repoRoot = resolve(__dirname, "..");

function importModule(relativePath) {
	return import(pathToFileURL(resolve(repoRoot, relativePath)).href);
}

afterEach(() => {
	jest.restoreAllMocks();
});

test("resolveFrameworkFromFlags prefers the explicit framework option", async () => {
	const { resolveFrameworkFromFlags } = await importModule("src/utils/wizard.mjs");

	expect(resolveFrameworkFromFlags({ framework: "react" })).toBe("react");
	expect(resolveFrameworkFromFlags({ vue: true })).toBe("vue");
});

test("wizard keeps the selected framework when --framework is provided", async () => {
	const { default: wizard } = await importModule("src/utils/wizard.mjs");
	const inquirer = (await import("inquirer")).default;

	jest
		.spyOn(inquirer, "prompt")
		.mockResolvedValueOnce({ folder: "" })
		.mockResolvedValueOnce({ typescript: true, css: "No" })
		.mockResolvedValueOnce({ anotherComponent: false });

	const result = await wizard(["node", "make-js-component", "--framework", "react", "--name", "card"]);

	expect(result).toMatchObject({
		anotherComponent: false,
		componentName: "card",
		folder: "",
		framework: "react",
		template: "function-component.tsx",
	});
});
