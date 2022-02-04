const template = document.createElement('template');

template.innerHTML = `
  <style>
    /*span {*/
    /*color: purple;*/
    /*}*/
    /*span.aa {*/
    /*color: blue;*/
    /*}*/
    /*.button-toggle {*/
    /*background-color: black;*/
    /*color: yellow;*/
    /*}*/
    /*.fixture-container {*/
    /*display: flex;*/
    /*}*/
    /*.fixture {*/
    /*display: flex;*/
    /*}*/

  .fixture-flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fff111;
}

.teams-flex-container {
  display: flex;
  flex-direction: row;
  /*flex-wrap: nowrap;*/
  justify-content: normal;
  background-color: lightgrey;
}

.fixture {
  border: 1px solid black;
  color: black;
  width: 16rem;
  margin: 0.2rem;
  padding: 0.2rem;
  background-color: lightgray;
  display: flow;
}
.fixture-headings, .fixture-footer{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 95%;
}
.fixture-footer-status {
  color: black;
}
.fixture-expand {
  color: darkcyan;
}
span.fixture-expand:hover{
  display: block;
  color: red;
  font-size: large;
  font-weight: bolder;
  background-color: white;
  text-shadow: -1px 1px 0 #000,
  1px 1px 0 #000,
  1px -1px 0 #000,
  -1px -1px 0 #000;
}
.extra {
  position: relative;
}
.fixture-status {
  color: magenta;
  font-weight: bold;
  font-style: italic;
}
.fixture-head {
  text-decoration: underline;
  font-size: 95%;
}

.fixture-date {
  /*padding-left: 0.5em;*/
  /*padding-right: 0.1em;*/
  color: black;
}

.fixture-time {
  color: black;
}

.teams {
  height: 6rem;
  color: black;
  text-align: center;
}

.teams-home {
  /*padding: 0.0rem;*/
  /*margin: 0.0rem;*/
  width: 8rem;
  border: 1px solid lime;
  display: flex;
  flex-direction: column;
}

.teams-away {
  /*padding: 0.0rem;*/
  /*margin: 0.0rem;*/
  width: 8rem;
  border: 1px solid brown;
  display: flex;
  flex-direction: column;
}

.scores-home {
  font-size: 2rem;
  border: 2px dashed black;
  margin-top: auto;
  color: pink;
}

.scores-away {
  font-size: 2rem;
  border: 2px dashed cyan;
  margin-top: auto;
  color: yellow;

}

.scores-shadow {
  text-shadow: -1px 1px 0 #000,
  1px 1px 0 #000,
  1px -1px 0 #000,
  -1px -1px 0 #000;
}

.hidden,
[hidden] {
  display: none !important;
}
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
    <div id="extra-4" class="extra">hi
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
