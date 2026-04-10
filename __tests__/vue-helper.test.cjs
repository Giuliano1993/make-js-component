const fs = require("node:fs");
const { resolve } = require("node:path");
const { pathToFileURL } = require("node:url");

const repoRoot = resolve(__dirname, "..");
const advancedTemplate = fs.readFileSync(resolve(repoRoot, "src/stubs/vue/advanced-component.vue"), "utf8");

function importModule(relativePath) {
	return import(pathToFileURL(resolve(repoRoot, relativePath)).href);
}

test("advancedVueBuilder injects composition helpers and removes the options block", async () => {
	const { default: advancedVueBuilder, vueApi } = await importModule("src/utils/frameworks/vue/helper.mjs");

	const output = advancedVueBuilder(advancedTemplate, vueApi.Composition, ["props", "emits", "refs", "mounted"]);

	expect(output).toContain("defineProps(['foo'])");
	expect(output).toContain("defineEmits(['inFocus', 'submit'])");
	expect(output).toContain("const element = ref(null)");
	expect(output).toContain("import { ref, onMounted } from 'vue'");
	expect(output).not.toContain("export default{");
	expect(output).not.toContain("__optionsstart__");
});

test("advancedVueBuilder injects options helpers and removes the composition block", async () => {
	const { default: advancedVueBuilder, vueApi } = await importModule("src/utils/frameworks/vue/helper.mjs");

	const output = advancedVueBuilder(advancedTemplate, vueApi.Option, ["props", "components", "data", "mounted"]);

	expect(output).toContain("props: ['foo'],");
	expect(output).toContain("components: {},");
	expect(output).toContain("data:{},");
	expect(output).toContain("mounted(){},");
	expect(output).not.toContain("defineProps(['foo'])");
	expect(output).not.toContain("__compositionstart__");
});
