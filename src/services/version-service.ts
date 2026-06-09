import type { VersionInfo } from "@/types/version";

const VERSION_API_URL = "https://api.codingthailand.com/api/version";

export async function getVersion(): Promise<VersionInfo> {
  const response = await fetch(VERSION_API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch API version: ${response.status}`);
  }

  const result: { data: VersionInfo } = await response.json();
  return result.data;
}
