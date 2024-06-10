import './game-demo.ce.scss';
import './game-renderer-3d.ce.js';
import GameWorker from '../utils/GameWorker.js?worker';
import calculateNextAiPosition from '../utils/calculateNextAiPosition.js';

class GameDemo extends HTMLElement {
  #gameState = null;
  #playerLeft = {};
  #playerRight = {};
  #aiInterval = null;

  constructor() {
    super();

    this.handleInitMessage = this.handleInitMessage.bind(this);
    this.handleUpdateMessage = this.handleUpdateMessage.bind(this);

    this.gameWorker = new GameWorker();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="gameDemo">
        <game-renderer-3d demo class="gameDemo-renderer"></game-renderer-3d>
      </div>
    `;

    // Players
    this.#playerLeft = {
      type: 'ai',
    };
    this.#playerRight = {
      type: 'ai',
    };

    // Renderer
    this.rendererEl = this.querySelector('.gameDemo-renderer');

    // Game events
    this.gameWorker.onmessage = function (e) {
      const data = e.data || {};

      if (data.type === 'init') {
        this.handleInitMessage(data);
      } else if (data.type === 'update') {
        this.handleUpdateMessage(data);
      }
    };
    this.gameWorker.onmessage = this.gameWorker.onmessage.bind(this);

    // Game error
    this.gameWorker.onerror = function () {
      this.gameWorker.terminate();
    };
    this.gameWorker.onerror = this.gameWorker.onerror.bind(this);
  }

  disconnectedCallback() {
    // stop renderer
    this.rendererEl.stop();

    // stop game
    this.gameWorker.postMessage({ type: 'reset' });
    this.gameWorker.terminate();

    // clear interval
    clearInterval(this.#aiInterval);
  }

  handleInitMessage(data) {
    // todo: validate data
    const dataState = data?.state;
    this.#gameState = {
      playerLeft: { ...this.#playerLeft },
      playerRight: { ...this.#playerRight },
      ...dataState,
    };
    this.rendererEl.init(this.#gameState);
    this.rendererEl.start();

    this.gameWorker.postMessage({ type: 'start' });

    // AI interval
    if (this.#playerLeft.type === 'ai' || this.#playerRight.type === 'ai') {
      const aiOptions = {
        waitForRebound: true,
        goToCenterOnWait: true,
        dirRandomness: 0.2,
      };
      this.#aiInterval = setInterval(() => {
        if (this.#playerLeft.type === 'ai') {
          const result = calculateNextAiPosition(this.#gameState, 'left', aiOptions);
          this.gameWorker.postMessage({ type: 'updatePaddleLeftMove', data: { targetY: result.targetY } });
        }
        if (this.#playerRight.type === 'ai') {
          const result = calculateNextAiPosition(this.#gameState, 'right', aiOptions);
          this.gameWorker.postMessage({ type: 'updatePaddleRightMove', data: { targetY: result.targetY } });
        }
      }, 1000);
    }
  }

  handleUpdateMessage(data) {
    // todo: validate data
    const updates = data?.state;
    this.#gameState = {
      ...this.#gameState,
      ...updates,
    };

    // renderer
    this.rendererEl.update(updates);
    if (updates.status === 'finished') {
      this.gameWorker.postMessage({ type: 'reset' });
      this.gameWorker.postMessage({ type: 'start' });
    }
  }
}

customElements.define('game-demo', GameDemo);
