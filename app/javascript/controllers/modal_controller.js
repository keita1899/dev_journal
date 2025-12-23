import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['modal', 'backdrop']

  connect() {
    this.handleEscape = this.handleEscape.bind(this)
    this.element.addEventListener('turbo:close-modal', this.close.bind(this))
  }

  open() {
    this.modalTarget.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', this.handleEscape)
  }

  close() {
    this.modalTarget.classList.add('hidden')
    document.body.style.overflow = ''
    document.removeEventListener('keydown', this.handleEscape)
  }

  handleEscape(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  closeOnBackdrop(event) {
    if (event.target === this.backdropTarget) {
      this.close()
    }
  }
}
