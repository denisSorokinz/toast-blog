import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(fn: (...args: any[]) => any, delay = 300): any {
  let timeout: NodeJS.Timeout | undefined;
  let callCbOnTimeoutEnd = false;
  let didCallOnTimeoutEnd = false;

  return (...args: any[]) => {
    callCbOnTimeoutEnd = !!timeout || didCallOnTimeoutEnd;
    if (!timeout && !didCallOnTimeoutEnd) {
      fn(...args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      if (callCbOnTimeoutEnd) fn(...args);

      didCallOnTimeoutEnd = true;
      setTimeout(() => {
        didCallOnTimeoutEnd = false;
      }, delay);
    }, delay);
  };
}
