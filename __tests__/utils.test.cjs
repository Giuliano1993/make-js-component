const fs = require("node:fs");
const os = require("node:os");
const { join, resolve } = require("node:path");
const { pathToFileURL } = require("node:url");

const repoRoot = resolve(__dirname, "..");

function importModule(relativePath) {
	return import(pathToFileURL(resolve(repoRoot, relativePath)).href);
}

afterEach(() => {
	jest.restoreAllMocks();
});

test("capitalizeFirstLetter normalizes kebab-case to PascalCase", async () => {
	const { capitalizeFirstLetter, prepareAdvanced, toPascalCase } = await importModule("src/utils/utils.mjs");

	expect(capitalizeFirstLetter("hello-world")).toBe("HelloWorld");
	expect(toPascalCase("multi word-component")).toBe("MultiWordComponent");
	expect(prepareAdvanced(["props", "refs"])).toHaveLength(2);
});

test("checkFileExists keeps the original file when overwrite is declined", async () => {
	const { checkFileExists } = await importModule("src/utils/utils.mjs");
	const inquirer = (await import("inquirer")).default;
	const tmpDir = fs.mkdtempSync(join(os.tmpdir(), "mjc-utils-"));
	const targetFile = join(tmpDir, "component.tsx");

	try {
		fs.writeFileSync(targetFile, "original");
		jest.spyOn(inquirer, "prompt").mockResolvedValue({ duplicateFile: false });

		const didWrite = await checkFileExists(targetFile, "updated");

		expect(didWrite).toBe(false);
		expect(fs.readFileSync(targetFile, "utf8")).toBe("original");
	} finally {
		fs.rmSync(tmpDir, { force: true, recursive: true });
	}
});
