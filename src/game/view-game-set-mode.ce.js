import { redirectTo } from '@/router.js';

class ViewGameSetMode extends HTMLElement {
  async connectedCallback() {
    const backUrl = '/';

    this.innerHTML = `
      <div class="min-vh-100 halo-bicolor d-flex flex-column p-2">
        <div class="d-flex">
          <a href="#" data-link="${backUrl}" class="d-inline-block link-body-emphasis link-opacity-75 link-opacity-100-hover fs-4 m-3" title="back">
            <ui-icon name="arrow-up" rotate="-90" class="me-2"></ui-icon>
          </a>
        </div>
        <div class="flex-shrink-0 container-fluid my-auto" style="max-width: 60rem;">
          <h1 class="fw-bold text-center mb-5">Choose a Game Mode</h1>
          
          <!-- Select mode -->
          <div class="row g-4 text-center">

          
            <div class="col-0 col-md-2"></div>
            
            <!-- Solo -->
            <div class="col-12 col-sm-6 col-md-4">
              <a
                href="#"
                data-game-mode="solo"
                class="card card-hoverable overflow-hidden flex-row flex-md-column"
              >
                <div class="h2 bg-bicolor-diagonal m-0 p-3 flex-shrink-0">
                  <ui-icon name="user" scale="2.5" class="text-black opacity-75"></ui-icon>
                </div>
                <div class="card-body d-flex flex-column justify-content-center">
                  <h5 class="card-title fw-bold text-bicolor">Solo</h5>
                  <p class="card-text opacity-50">Human vs AI</p>
                </div>
              </a>
            </div>

            <!-- Duo -->
            <div class="col-12 col-sm-6 col-md-4">
              <a
                href="#"
                data-game-mode="duo"
                class="card card-hoverable overflow-hidden flex-row flex-md-column"
              >
                <div class="h2 bg-bicolor-diagonal m-0 p-3 flex-shrink-0">
                  <ui-icon name="users" scale="2.5" class="text-black opacity-75" style="transform: scale(1.2);"></ui-icon>
                </div>
                <div class="card-body d-flex flex-column justify-content-center">
                  <h5 class="card-title fw-bold text-bicolor">Duo</h5>
                  <p class="card-text opacity-50">1v1 offline</p>
                </div>
              </a>
            </div>
            
          </div>
        </div>
        <div class="flex-shrink-0 py-4 mb-2"></div>
      </div>
    `;

    this.querySelectorAll('[data-game-mode]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        if (el.hasAttribute('disabled')) return;

        const gameMode = el.getAttribute('data-game-mode');
        switch (gameMode) {
          case 'solo':
            redirectTo('/game/solo');
            break;
          case 'duo':
            redirectTo('/game/duo');
            break;
        }
      });
    });
  }
}
customElements.define('view-game-set-mode', ViewGameSetMode);
