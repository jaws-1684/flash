import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="theme-switch"
export default class extends Controller {
  static targets = ["page", "buttonLight", "buttonDark"]
  state = {
      page: "dark",
      buttonLight: "inline-flex",
      buttonDark: "hidden"
  }
  connect() {
    try {
      const theme = localStorage.getItem("theme")
      console.log(theme)
      theme == "light" ? this.switchLight() : this.switchDark()
    } catch (err) {

    }
  }
  switchLight() {
    this.constructor.targets.forEach(t => this[t + "Target"].classList.remove(this.state[t]))
    this.save("light")
  }
  switchDark() {
    this.constructor.targets.forEach(t => this[t + "Target"].classList.add(this.state[t]))
    this.save("dark")
  }
  save(theme) {
    localStorage.setItem("theme", theme)
  }
}
