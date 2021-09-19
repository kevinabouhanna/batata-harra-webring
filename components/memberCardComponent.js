class MemberCard extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    const templateContent = this.getTemplateContent()
    const template = document.createElement('template')
    template.innerHTML = templateContent
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  
  getTemplateContent () {
    const memberUrl = this.getAttribute('portfolio-url')
    const memberImageSrc = this.getAttribute('member-image-src')
    const memberName = this.getAttribute('member-name')
    const memberRole = this.getAttribute('member-role')
    return `
    <style>
    /* Featured Batata Harra */
    .feat__batataHarra__card {
      padding: 6px;
      border-radius: 4px;
      background-color: var(--accent-bg);
      width: fit-content;
    }
    
    .feat__batataHarra__card > figcaption {
      display: flex;
      flex-direction: column;
    }
    
    .feat__batataHarra__card img {
      max-width: 200px;
      max-height: 200px;
      border-radius: 4px;
      aspect-ratio: 1/1;
      border-radius: 4px;
      width: 100%;
    }
    
    .feat__batataHarra__member {
      color: var(--accent-light);
      font-size: 1.15em;
    }
    
    .feat__batataHarra__title {
      font: var(--secondary-font);
    }
    </style>
    
    <a href="${memberUrl}">
      <figure class="card__container__figure">
        <div class="card__container__figure__img__container">
          <img src="${memberImageSrc}" alt="${memberName}" />
        </div>
        <figcaption class="card__container__figure__figcaption">
          <span class="card__container__figure__figcaption__member"
            >${memberName}</span
          ><span class="card__container__figure__figcaption__title"
            >${memberRole}</span
          >
        </figcaption>
      </figure>
    </a>`
  }
}

window.customElements.define('member-card', MemberCard)
