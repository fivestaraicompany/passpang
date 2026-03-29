const supportedLangs = [
    "en","uk","ar","ca","zh-Hans","zh-Hant","hr","cs","da","nl","fi",
    "fr","de","el","fr-CA","he","hi","hu","id","it","ja","ko","ms",
    "nb","pl","pt-BR","pt-PT","ro","ru","sk","es-MX","es","sv","th","tr","vi"
  ];
  
  let currentLang = "en";
  let translations = {};
  
  async function loadLanguage(lang) {
    try {
      const res = await fetch(`/i18n/${lang}.json`);
      translations = await res.json();
      currentLang = lang;
      render();
    } catch {
      if (lang !== "en") loadLanguage("en");
    }
  }
  
  function t(path) {
    return path.split('.').reduce((o, i) => o?.[i], translations) || path;
  }
  
  function render() {
    document.getElementById("title").innerText = t("app.name");
    document.getElementById("tagline").innerText = t("app.tagline");
  
    document.getElementById("downloadBtn").innerText = t("cta.download");
    document.getElementById("learnBtn").innerText = t("cta.learnMore");
  
    document.getElementById("featuresTitle").innerText = t("features.title");
    document.getElementById("howTitle").innerText = t("howItWorks.title");
  
    // Features
    const featureContainer = document.getElementById("featuresList");
    featureContainer.innerHTML = "";
    t("features.items").forEach(item => {
      featureContainer.innerHTML += `
        <div class="feature">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      `;
    });
  
    // Steps
    const stepContainer = document.getElementById("stepsList");
    stepContainer.innerHTML = "";
    t("howItWorks.steps").forEach(step => {
      stepContainer.innerHTML += `
        <div class="feature">
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </div>
      `;
    });
  }
  
  function initLanguageSelector() {
    const select = document.getElementById("langSelect");
  
    supportedLangs.forEach(lang => {
      const option = document.createElement("option");
      option.value = lang;
      option.textContent = lang;
      select.appendChild(option);
    });
  
    select.value = "en";
  
    select.addEventListener("change", (e) => {
      loadLanguage(e.target.value);
    });
  }
  
  // init
  initLanguageSelector();
  loadLanguage("en");