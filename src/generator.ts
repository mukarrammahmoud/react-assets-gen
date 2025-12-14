// import fs from "fs";
// import path from "path";

// const ASSETS_DIR = "assets";
// const OUTPUT_FILE = "src/generated/assets.ts";

// function walk(dir: string, filelist: string[] = []) {
//   fs.readdirSync(dir).forEach(file => {
//     const fullPath = path.join(dir, file);
//     if (fs.statSync(fullPath).isDirectory()) {
//       walk(fullPath, filelist);
//     } else {
//       filelist.push(fullPath);
//     }
//   });
//   return filelist;
// }

// const files = walk(ASSETS_DIR);

// let content = `export const Assets = {\n`;

// files.forEach(file => {
//   const relative = file.replace(`${ASSETS_DIR}/`, "");
//   const [folder, name] = relative.split("/");
//   const key = path.parse(name).name;

//   content += `  ${folder}: {\n`;
//   content += `    ${key}: "/${file}",\n`;
//   content += `  },\n`;
// });

// content += `} as const;\n`;

// fs.writeFileSync(OUTPUT_FILE, content);
// console.log("✅ Assets generated");
