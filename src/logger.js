import fs from "fs/promises";
import path from "path";

const LOG_DIR = "logs";
const LOG_FILE = "app.log";

async function ensureLogDirectory() {
  try {
    await fs.access(LOG_DIR);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(LOG_DIR);
    } else {
      throw error;
    }
  }
}

async function appendToLog(message) {
  await ensureLogDirectory();
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  await fs.appendFile(path.join(LOG_DIR, LOG_FILE), logMessage);
}

export function log(message) {
  console.log(message);
  appendToLog(message).catch((error) => {
    console.error("Error writing to log file:", error);
  });
}

export function warn(message) {
  console.warn(message);
  appendToLog(`WARN: ${message}`).catch((error) => {
    console.error("Error writing to log file:", error);
  });
}

export function error(message) {
  console.error(message);
  appendToLog(`ERROR: ${message}`).catch((error) => {
    console.error("Error writing to log file:", error);
  });
}
