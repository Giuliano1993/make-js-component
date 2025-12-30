import fs from "fs";
import path from "path";

export default function solidWizard(componentName, folder) {
  const basePath = folder || "src/components";
  const componentDir = path.join(process.cwd(), basePath, componentName);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const content =
`import { Component } from "solid-js";

const ${componentName} = () => {
  return <div>${componentName} works!</div>;
};

export default ${componentName};
`;

  fs.writeFileSync(
    path.join(componentDir, componentName + ".tsx"),
    content
  );

  console.log("✅ Solid component created");
}
