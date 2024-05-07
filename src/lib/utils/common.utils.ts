import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description
 * This function is a utility for conditionally applying Tailwind CSS classes.
 * It uses the clsx library to conditionally apply classes and the tailwind-merge library to merge them.
 *
 * @param inputs - An array of ClassValue types. Each ClassValue can be a string of Tailwind classes or an object.
 * In the case of an object, each key is a Tailwind class and the boolean value determines whether the class is applied.
 * Object interface: {[key: TailwindClass]: Boolean,}
 *
 * @returns A string of Tailwind classes to be applied.
 *
 * @example
 * cn(
 *   "tw-class1 tw-class2",   // this classes are always applied
 *   { 
 *     "tw-class3": true,     // this class is applied because the value is true
 *     "anotherClass": false, // this class is not applied because the value is false
 *   }
 * ) 
 * // returns "tw-class1 tw-class2 tw-class3"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
