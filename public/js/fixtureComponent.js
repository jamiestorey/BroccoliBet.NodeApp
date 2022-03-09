const template = document.createElement('template');

template.innerHTML = `
  <style>
  
  </style>
<!--  <div class="fixture">-->
<!--  <div class="fixture-container">-->
<!--  <span>Span 1</span>-->
<!--  <span class="aa"></span>-->
<!--  <span><slot name="example1" /></span>-->
<!--  </div>-->
<!--  <button class="button-toggle" id="toggle-info">Hide Fixture</button>-->
<!--    </div>-->

<!--<div class="fixture">-->
<!--    <div class="fixture-headings">-->
<!--      <span class="fixture-head">Game: <slot name="game-letter" /></span>-->
<!--      <span class="fixture-date"> <slot name="game-date" /></span>-->
<!--      <span class="fixture-time"><slot name="game-time" /></span>-->
<!--    </div>-->

<!--    <div class="teams teams-flex-container">-->
<!--      <div class="teams-home"><slot name="game-home-team" />-->
<!--        <div class="scores-home"><slot name="scores-home-number" /></div>-->
<!--      </div>-->
<!--      <div class="teams-away">-->
<!--      <slot name="game-away-team"/>-->
<!--      <div class="scores-away"><slot name="scores-away-number" /></div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="fixture-footer">-->
<!--      <span class="fixture-footer-status">Status: <span class="fixture-status"><slot name="fixture-status" /></span></span>-->
<!--      <span class="fixture-time">Bet Result: <span><slot name="fixture-bet-result" /></span></span>-->
<!--      <span class="fixture-expand">-</span>-->
<!--    </div>-->
<!--    <div id="extra-4" class="extra">hi-->
<!--      <span class="one">One</span><br>-->
<!--      <span class="two">Two</span><br>-->
<!--      <span class="three">Three</span>-->
<!--    </div>-->
<!-- </div>-->


 <div class="fixture">
    <div class="fixture-headings">
      <span class="fixture-head">Game: <slot name="game-letter" /></span>
      <span class="fixture-date"><slot name="game-date" /></span>
      <span class="fixture-time"><slot name="game-time" /></span>
    </div>

    <div class="teams teams-flex-container">
      <div class="teams-home">
        <span><slot name="game-home-name"/></span>
        <div class="scores-home">
        <span class="score">
        <slot name="scores-home-number" />
        </span>
        </div>
      </div>

      <div class="teams-away">
        <span><slot name="game-away-name"/></span>
        <div class="scores-away"><span class="score"><slot name="scores-away-number" /></span></div>
      </div>
    </div>

    <div class="fixture-footer">
      <span class="fixture-footer-status">Status: <span class="fixture-status"><slot name="fixture-status" /></span></span>
      <span class="fixture-time">Bet Result: <span><slot name="fixture-bet-result" /></span></span>
      <span class="fixture-expand">-</span>
    </div>
    <div id="extra-4" class="extra">
      <span class="one">One</span><br>
      <span class="two">Two</span><br>
      <span class="three">Three</span>
    </div>
  </div>


`;

class FixtureFootball extends HTMLElement {
  constructor() {
    super();
    this.showInfo = true;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // this.shadowRoot.querySelector('.button-toggle').innerText =
    //   `Hide Fixture ID: [${this.getAttribute('fixture-id')}]`;
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    const theFixture = this.shadowRoot.querySelector('.extra');
    const toggleButton = this.shadowRoot.querySelector('.fixture-expand');

    if (this.showInfo) {
      theFixture.style.display = 'block';
      // toggleButton.innerText = `Hide Fixture ID: [${this.getAttribute('fixture-id')}]`;
      toggleButton.innerText = '-';
    } else {
      theFixture.style.display = 'none';
      // toggleButton.innerText = `Show Fixture ID: [${this.getAttribute('fixture-id')}]`;
      toggleButton.innerText = '+';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.fixture-expand')
      .addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.fixture-expand')
      .removeEventListener();
  }
}

window.customElements.define('fixture-football', FixtureFootball);
