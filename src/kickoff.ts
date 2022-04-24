export function kickoff(message?: string) {
  const fullMsg = `${message || "Let's go."}`;
  console.log(fullMsg);
  return fullMsg;
}
