import { createClient } from "microcms-js-sdk";

// Check if the microCMS domain loads
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  console.log("MICROCMS_SERVICE_DOMAIN is required");
  throw new Error("Server misconfiguration.");
}

// Check if the microCMS secret loads
if (!process.env.MICROCMS_API_KEY) {
  console.log("MICROCMS_API_KEY is required");
  throw new Error("Server misconfiguration.");
}

// Instantiate a new microCMS client
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
