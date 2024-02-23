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

/*
TASK:
develop debouncePromise/debounceRequest/debounceFetcher+ function
that takes in a url/fetcher+ fn that returns Promise and:
~ resolves if immediate call or timeout and no further calls
~ rejects if timeout hasn't passed, and new fn call has been made
*/

export function debounceFetcher(
  fetcher: (...args: any[]) => Promise<any>,
  delay = 300,
) {
  let timeout: NodeJS.Timeout | undefined;
  let callCbOnTimeoutEnd = false;
  let didCallOnTimeoutEnd = false;

  let controller = new AbortController();

  let prevReject: Function | null = null;

  return (...args: any[]) =>
    new Promise((res, rej): any => {
      callCbOnTimeoutEnd = !!timeout || didCallOnTimeoutEnd;
      if (!timeout && !didCallOnTimeoutEnd) {
        fetcher(...args, controller.signal).then((data) => res(data));
      } else {
        controller.abort();
        controller = new AbortController();
        prevReject && prevReject();
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = undefined;
        if (callCbOnTimeoutEnd)
          fetcher(...args, controller.signal).then((data) => res(data));

        didCallOnTimeoutEnd = true;
        setTimeout(() => {
          didCallOnTimeoutEnd = false;
        }, delay);
      }, delay);

      prevReject = rej;
    });
}
