const replaceDynamicParts = (firstString, secondString) => {
  // Split both strings by '/' and filter out any empty segments
  const firstParts = firstString.split("/").filter(Boolean);
  const secondParts = secondString
    .split("/")
    .filter(Boolean);

  console.log(firstParts, secondParts);
  // Initialize resultString as an array to store the transformed parts
  let resultParts = [];

  // Index to track the second string (dynamic values)
  let secondPartIndex = 0;

  // Loop over firstParts and replace dynamic placeholders
  for (const part of firstParts) {
    // If this part contains a dynamic segment (i.e., starts with ':')
    if (
      part.startsWith(":") &&
      secondPartIndex < secondParts.length
    ) {
      console.log(secondPartIndex, part);
      // Replace the dynamic part with the corresponding value from secondParts
      resultParts.push(secondParts[secondPartIndex]);
    } else {
      // Otherwise, just add the static part as-is
      resultParts.push(part);
    }
    secondPartIndex++; // Move to the next value in secondParts
  }

  // Join the resultParts back into a string
  const resultString = "/" + resultParts.join("/");

  // Return the final transformed string
  return resultString;
};

const r = "/:channelName/videos/inner/:id";
const o = "/WebdevSimplified/videos/inner/someId";

console.log(replaceDynamicParts(r, o));
