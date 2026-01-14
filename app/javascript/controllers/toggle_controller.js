import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="password-toggle"
export default class extends Controller {
  static targets = ["input", "icon"]

  mouseOver = this.#overListener.bind(this)
  mouseLeave = this.#leaveListener.bind(this)

  connect() {
     this.iconTarget.addEventListener("mouseover", this.mouseOver)
     this.iconTarget.addEventListener("mouseleave", this.mouseLeave)
  }
  toggle() {
    let { attr, path, htmlClass } = this.#swapAtrributtes()
    this.inputTarget.setAttribute("type", attr)

    this.iconTarget.textContent = ""
    this.iconTarget.setAttribute("class", htmlClass)
    this.iconTarget.insertAdjacentHTML("afterbegin", path)
  }
  #overListener(e) {
   e.preventDefault()
   if (this.inputTarget.getAttribute("type") == "text" && e.target.id == "eye") {
      e.target.children[0].setAttribute("fill", "blue")
   }
  }
  #leaveListener(e) {
    e.preventDefault()
    if (this.inputTarget.getAttribute("type") == "text" && e.target.id == "eye") {
      e.target.children[0].setAttribute("fill", "#000000")
    }
  }
  #swapAtrributtes() {
    const attr = this.inputTarget.getAttribute("type") == "password" ? "text" : "password"
    const icons = {
      password: {
        path: `<path fill="#000000" d="M3.26 11.602C3.942 8.327 6.793 6 10 6c3.206 0 6.057 2.327 6.74 5.602a.5.5 0 0 0 .98-.204C16.943 7.673 13.693 5 10 5c-3.693 0-6.943 2.673-7.72 6.398a.5.5 0 0 0 .98.204ZM10 8a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm-2.5 3.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0Z"/>`,
        htmlClass: "size-10 absolute inset-y-0 end-0 flex items-center hover:stroke-blue-700 z-20 px-3 cursor-pointer"
      },
      text: {
        path: `<path fill="#000000" d="M12 9.005a4 4 0 1 1 0 8a4 4 0 0 1 0-8ZM12 5.5c4.613 0 8.596 3.15 9.701 7.564a.75.75 0 1 1-1.455.365a8.504 8.504 0 0 0-16.493.004a.75.75 0 0 1-1.456-.363A10.003 10.003 0 0 1 12 5.5Z"/>`,
        htmlClass: "size-10 absolute inset-y-0 end-0 flex items-center fill-blue-700 z-20 px-3 cursor-pointer"
      }
      
    }
    const { path, htmlClass } = icons[attr]
    return { attr, path, htmlClass }
  }
  disconnect() {
     this.iconTarget.removeEventListener("mouseover", this.mouseOver)
     this.iconTarget.removeEventListener("mouseleave", this.mouseLeave)
  }

}
