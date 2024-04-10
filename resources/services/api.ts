export class Api {
  readonly #xsrf: string

  constructor() {
    this.#xsrf = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
      ? document.cookie.match(/XSRF-TOKEN=([^;]+)/)[1]
      : ''
  }

  async get<T>(url: string): Promise<T> {
    return fetch(url).then((res) => res.json())
  }

  async put<T>(url: string, body?: any): Promise<T> {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': this.#xsrf,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())
  }

  async delete<T>(url: string, body?: any): Promise<T> {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': this.#xsrf,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())
  }

  async post<T>(url: string, body?: any): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': this.#xsrf,
      },
      body: JSON.stringify(body),
    })
    return await res.json()
  }
}
