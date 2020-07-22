// basic debounce
export function debounce(callback: Function, wait: number) {
  let timeout: number;
  return (...args: any) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

// wrapper for fetch to retry n times with incrementing delays
// throws Error if n = 0
export async function get(url: string, signal: AbortSignal, n = 4, wait = 1000,) {
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    return response.json();
  } catch (e) {
    if (e.name === 'AbortError') {
      console.log('aborted fetch');
      return;
    }
    if (n === 0) {
      const error = new Error(`Failed to GET from ${url}`);
      error.name = 'NetworkError';
      throw error;
    }
    setTimeout(async () => {
      return await get(url, signal, n - 1, wait * 2,);
    }, wait)
  }
}

// wrap around modulo
export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
