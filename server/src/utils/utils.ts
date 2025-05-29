import "dotenv/config";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error("Missing environment variable: " + key);
  }
  return value;
}
