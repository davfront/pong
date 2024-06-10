import '@/components/layouts/auth-layout/auth-layout.ce.js';

class ViewNotFound extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <auth-layout>
        <h1 class="text-center">Not found</h1>
        <div class="text-center mt-4 ">
          <button class="btn btn-primary fw-semibold" data-link="/">Go to Home</button>
        </div>
      </auth-layout>
    `;
  }
}
customElements.define('view-not-found', ViewNotFound);
