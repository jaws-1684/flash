export class Api {
    constructor () {this.abortController = new AbortController()}
    async get(path) {
        const response = await fetch(path, {
            signal: this.abortController.signal,
        })
        return this.#errorGetHandle(response)
    }
    async post({path, authenticityToken, body}) {
        const response = await fetch(path, {
            method: "POST",
            headers: {
                "X-CSRF-Token": authenticityToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        return this.#errorGetHandle(response)    
    }
    async #errorGetHandle(response) {
        try {
            if (response.ok) {
                return await response.json();
            }
            throw new Error("Network response was not ok.")
        } catch (err) {
            console.log(response)
            console.log(err)
        }
    }
    abort() {
        this.abortController.abort()
    }
    aborted() {
        return this.abortController.signal.aborted
    }
    
}