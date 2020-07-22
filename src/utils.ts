export function debounce(callback: Function, wait: number) {
  let timeout: number;
  return (...args: any) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

// wrapper for fetch to retry n times with incrementing delays
// throws Error if n = 1
export async function get(url: string, n = 4, wait = 1000) {
  try {
    const response = await fetch(url, { signal: this.controller.signal });
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    return response.json();
  } catch (e) {
    if (n === 1) {
      const error = new Error(`Failed to GET from ${url}`);
      error.name = 'NetworkError';
      throw error;
    }
    setTimeout(async () => {
      return await this.get(url, n - 1, wait * 2);
    }, wait)
  }
}
