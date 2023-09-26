import { evaluate, simplify, complex, isComplex } from "mathjs";

const check = (expression: string): boolean => {
  if (expression === undefined) return false;
  if (expression === null) return false;
  if (expression === "") return false;
  if (expression === "Error") return false;
  if (expression === "Infinity") return false;
  if (expression === "-Infinity") return false;
  if (expression.length > 100) return false;
  if (expression.includes("Error")) return false;
  if (expression.includes("Infinity")) return false;
  if (expression.includes("-Infinity")) return false;

  //if (!/^[\d+\-*/.() ]+$/.test(expression)) {
  //  console.debug("Invalid characters in the input.");
  //  return false;
  // }

  // Check for unbalanced parentheses
  if (/[(]/.test(expression) !== /[)]/.test(expression)) {
    console.debug(new Error("Unbalanced parentheses."));
    return false;
  }

  return true;
};

/**
 * Calculate the result of the expression
 * @param expression
 * @returns
 */
export function calculate(expression: string): string {
  // make some checks for the expression
  if (!check(expression)) {
    return "";
  }

  try {
    const result = evaluate(expression);

    return result.toString();
  } catch (error) {
    console.debug(error);
    return "";
  }
}

/**
 * Simplify the expression
 * @param expression
 * @returns
 */
export function simplifyExpression(expression: string): string {
  if (!check(expression)) {
    return "";
  }

  const result = simplify(expression);

  return result.toString();
}

/**
 * Calculate the complex result of the expression
 * @param expression
 * @returns
 */
export function complexExpression(expression: string): string {
  if (!check(expression)) {
    return "";
  }

  const result = complex(expression);

  return result.toString();
}

/**
 * Check if the expression is complex
 * @param expression
 * @returns
 */
export function isComplexExpression(expression: string): boolean {
  if (!check(expression)) {
    return false;
  }

  return isComplex(expression);
}
