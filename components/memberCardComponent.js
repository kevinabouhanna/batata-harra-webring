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
        margin: 12px;
        width: fit-content;
    }
    
    .feat__batataHarra__card>figcaption {
        display: flex;
        flex-direction: column;
    }
    
    .feat__batataHarra__card img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 4px;
    }
    
    .feat__batataHarra__member {
        color: var(--accent-light);
        font-size: 1.15em;
    }
    
    .feat__batataHarra__title {
        font: var(--secondary-font);
    }
    </style>
    
    <figure class="feat__batataHarra__card">
      <a href="${memberUrl}">
          <img src="${memberImageSrc}" alt="${memberName}">
      </a>
      <figcaption><span class="feat__batataHarra__member">${memberName}</span><span
              class="feat__batataHarra__title">${memberRole}</span></figcaption>
    </figure>`
  }
}

window.customElements.define('member-card', MemberCard)
