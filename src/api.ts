import fetch from 'cross-fetch';

export async function request(
  url: string,
  type: string,
  data: any
): Promise<string> {
  if (type === 'POST') {
    const response = await fetch('/api' + url, {
      method: type,
      body: data,
      headers: {
        'content-type': 'application/json'
      }
    });
    return await response.json();
  } else {
    const response = await fetch('/api' + url, { method: type, body: data });
    return await response.json();
  }
}

/**
 * 登陆
 */
export function handleLogin(param: {
  username: string;
  password: string;
}): any {
  const data = JSON.stringify(param);
  return request('/login', 'POST', data);
}
