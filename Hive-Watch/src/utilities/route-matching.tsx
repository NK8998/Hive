export const matchDynamicPath = (path: string): { channel: string; subRoute: string } => {
  // Regular expression to match "/channelName/subRoute" or "/channelName"
  const match = path.match(/^\/([^/]+)(?:\/([^/]+))?$/);

  if (match) {
    const channel = match[1]; // The channel name is the first capture group
    const subRoute = match[2] || ""; // The subRoute is the second capture group or null if not present
    return { channel, subRoute };
  }

  // If path doesn't match the expected format, return null or an empty object
  return { channel: "", subRoute: "" };
};
