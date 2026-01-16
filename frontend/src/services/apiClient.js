import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://fusion-ecommerce.onrender.com/api',
  timeout: 10000,
});

export async function withRetry(request, { retries = 2, delay = 400 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await request();
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw lastError;
}
