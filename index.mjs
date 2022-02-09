#!/usr/bin/env node
import fs from "fs/promises";

const { log } = console;

const die = (...args) => {
  log(...args);
  process.exit(1);
};

const [nodePath, scriptPath, inputFilePath, outputFilePath] = process.argv;

if (!inputFilePath || !outputFilePath) {
  die("Usage: npx hex-string-to-binary <input-file> <output-file>");
}

const inputFileContent = await fs.readFile(inputFilePath, "utf8");
const parsedInputFileContent = inputFileContent.startsWith("0x") ? inputFileContent.slice(2) : inputFileContent;
const inputBuffer = Buffer.from(parsedInputFileContent, "hex");
await fs.writeFile(outputFilePath, inputBuffer);

log(`Done`);
