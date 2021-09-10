const DATA_FOR_WEBRING = `https://raw.githubusercontent.com/kevinabouhanna/batata-harra-webring/master/webring.json`;

const template = document.createElement("template");
template.innerHTML = `
<style>
.webring {
  padding: 1rem; 
  text-align: center;
  font: 100% system-ui, sans-serif;
}
.icon {
  font-size: 100px;
}
a {
    color: #bf8348;
    padding: 0 4px
}
a:hover {
    color: #ffda56;
    transition: .3s
}
</style>

<div class="webring">
  <div id="copy">
    
  </div>
</div>`;

class WebRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // e.g. https://batataharra.com
    const thisSite = this.getAttribute("site");
    const current_url = window.location.href;
    const current_domain = new URL(current_url).hostname
      .replace("www.", "")
      .replace("/", "");

    // current_domain = domain.hostname;

    fetch(DATA_FOR_WEBRING)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites
          .filter((site) => {
            console.log(site);
            const site_url = site.url;
            let site_url_domain = new URL(site_url).hostname
              .replace("www.", "")
              .replace("/", "");

            return !(site_url_domain === current_domain);
          })
          .findIndex((site) => site.url === thisSite);

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length) nextSiteIndex = 0;

        let randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `       
          <p>
            <a href="${sites[prevSiteIndex].url}">Prev</a>
            <a href="${sites[nextSiteIndex].url}">Next</a>
            <a href="${sites[randomSiteIndex].url}">Random</a>
          </p>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("webring-css", WebRing);
