import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input', 'counter', 'remaining']
  static values = { max: Number }

  connect() {
    this.updateCounter()
  }

  updateCounter() {
    const currentLength = this.inputTarget.value.length
    const remaining = this.maxValue - currentLength

    this.remainingTarget.textContent = remaining

    if (remaining < 0) {
      this.counterTarget.classList.add('text-red-500')
      this.counterTarget.classList.remove('text-gray-500')
    } else {
      this.counterTarget.classList.remove('text-red-500')
      this.counterTarget.classList.add('text-gray-500')
    }
  }
}
