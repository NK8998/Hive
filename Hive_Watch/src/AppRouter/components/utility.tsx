export const replaceDynamicParts = (
  firstString: string,
  secondString: string,
  params: { [key: string]: string }
) => {
  const firstParts = firstString.split("/").filter(Boolean);
  const secondParts = secondString.split("/").filter(Boolean);

  let resultParts: string[] = [];

  let secondPartIndex = 0;

  for (const part of firstParts) {
    if (part.startsWith(":")) {
      const paramName = part.slice(1); // Extract the parameter name from ":param"

      if (secondPartIndex < secondParts.length) {
        params[paramName] = secondParts[secondPartIndex];
      }

      // Replace the dynamic part with the corresponding value from secondParts
      resultParts.push(secondParts[secondPartIndex]);
    } else {
      resultParts.push(part);
    }
    secondPartIndex++;
  }

  const resultString = "/" + resultParts.join("/");

  // Return the final transformed string
  const replacedUrl =
    resultString === "/" ? "/" : resultString.replace(/\/$/, "");

  return { replacedUrl, urlParams: params };
};
