import fs from "fs";
import path from "path";

/**
 * This code is run in the npm run build script. It is required because the source code uses ESM imports
 * for example import { appRouter } from "./routers/index". However node js ESM does not auto-resolve extensions.
 * It looks for ./routers/index without .js and fails.
 *
 * One possibilty is to manually add the '.js' extensions to the source code, so the imports in compilied files in
 * /dist can be resolved. But this actually breaks drizzle-kit studio running locally, because it can't resolve the
 * '.js' extension imports in the source code!
 *
 * So this script iterates through /dist and adds '.js' extensions to all relative imports.
 *
 */
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Regex to find relative imports (e.g., `from "./routers/index"`)
  content = content.replace(/from\s+["'](\..*?)["']/g, (match, importPath) => {
    if (!importPath.endsWith(".js") && !importPath.includes("?")) {
      return `from "${importPath}.js"`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith(".js")) {
      fixImportsInFile(fullPath);
    }
  }
}

// Recursively update all `.js` files in the "dist" folder
const distDir = "./dist";

processDirectory(distDir);
console.log("✅ Fixed import paths in compiled JS files.");
