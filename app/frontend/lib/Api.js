class Api {
  constructor() {
    this.cache = new Map();
    this.abortControllers = new Map();
    this.promiseMemo = new Map();
  }

  get({ key, path, aggressive = true }) {
    if (this.promiseMemo.has(key)) {
      return this.promiseMemo.get(key);
    }
    if (aggressive && this.cache.has(key)) {
      return Promise.resolve(this.cache.get(key));
    }
    const controller = new AbortController();

    this.abortControllers.set(key, controller);

    const promise = fetch(path, { signal: controller.signal })
      .then((response) => {
        if (response.ok) {
          return response.json() ?? [];
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        this.cache.set(key, data);
        return data;
      })
      .finally(() => {
        this.abortControllers.delete(key);
        this.promiseMemo.delete(key);
      });

    this.promiseMemo.set(key, promise);
    return promise;
  }
  async delete ({
    path,
    authenticityToken,
  }) {
    const headers = {
      "X-CSRF-Token": authenticityToken,
    };
    const response = await fetch(path, {
      method: "DELETE",
      headers: headers,
    });

    try {
      if (response.ok) {
        return
      }
      throw new Error("Could not save your data");
    } catch (err) {
      console.log(err);
    }
  }
  async post({
    path,
    authenticityToken,
    body = "",
    contentType = "application/json",
    formData = false,
  }) {
    const headers = {
      "X-CSRF-Token": authenticityToken,
    };
    if (!formData) {
      headers["Content-Type"] = contentType;
    }
    const rBody = formData ? body : JSON.stringify(body);

    const response = await fetch(path, {
      method: "POST",
      headers: headers,
      body: rBody,
    });
    try {
      if (response.ok) {
        const data = response.json();
        return data;
      }
      throw new Error("Could not save your data");
    } catch (err) {
      console.log(err);
    }
  }

  abort(key) {
    const controller = this.abortControllers.get(key);
    return controller?.signal.aborted ?? false;
  }
  isAborted(key) {
    if (this.abortControllers.has(key)) {
      const controller = this.abortControllers.get(key);
      return controller.signal.aborted;
    }
    return controller?.signal.aborted ?? false;
  }
  invalidate(key) {
    if (this.cache.has(key)) this.cache.delete(key);
  }
  invalidateAll() {
    this.cache.clear();
  }
 
}

let api = new Api();

export { api };
