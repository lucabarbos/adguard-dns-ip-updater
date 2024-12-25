import fetch from "node-fetch";
import { log, warn, error } from "./logger.js";

const URL_TO_PING = process.env.URL_TO_PING;
const INTERVAL_MS = parseInt(process.env.INTERVAL_MS) || 60 * 60 * 1000; // Default: 1 hour in milliseconds

async function updateDnsIp() {
  try {
    log(`Updating IP in AdGuard DNS at ${new Date().toISOString()}`);
    const response = await fetch(URL_TO_PING);
    const body = await response.text();

    log(`Response from AdGuard DNS: ${body}`);
    log(`Status: ${response.status} ${response.statusText}`);

    // Check if the update was successful
    if (response.ok && body.includes("has been linked")) {
      log("IP successfully updated!");
    } else {
      warn("IP update might have failed. Please check the response.");
    }
  } catch (err) {
    error(`Error updating IP in AdGuard DNS: ${err.message}`);
  }
}

// Function to execute the update and schedule the next run
function runAndSchedule() {
  updateDnsIp();

  // Schedule the next execution
  const nextRun = new Date(Date.now() + INTERVAL_MS);
  log(`Next update scheduled for: ${nextRun.toISOString()}`);

  setTimeout(runAndSchedule, INTERVAL_MS);
}

// Start the process
log("Starting the AdGuard DNS IP update service");
runAndSchedule();
