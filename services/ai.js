/* Future remote AI connector.
   Do not store API secrets here. Swap implementation without changing views. */
export async function complete(messages, context) {
  if (typeof window !== "undefined" && window.AIProvider) {
    return window.AIProvider.complete(messages, context);
  }
  return { source: "unconfigured", text: "AI provider is not configured." };
}
