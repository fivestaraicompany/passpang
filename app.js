const supportedLangs = [
  "en", "uk", "ar", "ca", "zh-Hans", "zh-Hant", "hr", "cs", "da", "nl", "fi",
  "fr", "de", "el", "fr-CA", "he", "hi", "hu", "id", "it", "ja", "ko", "ms",
  "nb", "pl", "pt-BR", "pt-PT", "ro", "ru", "sk", "es-MX", "es", "sv", "th", "tr", "vi",
];

let currentLang = "en";
let translations = {};

/** Maps index.html data-i18n attribute values to dot paths in i18n JSON */
const DATA_I18N_MAP = {
  app_title: "app.name",
  app_subtitle: "app.tagline",
  download_btn: "cta.download",
  feature1_title: "features.items.0.title",
  feature1_desc: "features.items.0.desc",
  feature2_title: "features.items.1.title",
  feature2_desc: "features.items.1.desc",
  feature3_title: "features.items.2.title",
  feature3_desc: "features.items.2.desc",
  feature4_title: "features.items.3.title",
  feature4_desc: "features.items.3.desc",
  step1_title: "howItWorks.steps.0.title",
  step1_desc: "howItWorks.steps.0.desc",
  step2_title: "howItWorks.steps.1.title",
  step2_desc: "howItWorks.steps.1.desc",
  step3_title: "howItWorks.steps.2.title",
  step3_desc: "howItWorks.steps.2.desc",
  footer_text: "footer.copyright",
};

function t(path) {
  return path.split(".").reduce((o, i) => o?.[i], translations) ?? path;
}

function render() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const jsonPath = DATA_I18N_MAP[key];
    if (jsonPath) {
      el.textContent = t(jsonPath);
    }
  });
  document.title = t("app.name");
  document.documentElement.lang = currentLang;
}

async function loadLanguage(lang) {
  try {
    const res = await fetch(`i18n/${lang}.json`);
    if (!res.ok) throw new Error(String(res.status));
    translations = await res.json();
    currentLang = lang;
    render();
  } catch {
    if (lang !== "en") loadLanguage("en");
  }
}

function initLanguageSwitcher() {
  const select = document.getElementById("languageSwitcher");
  if (!select) return;

  select.value = currentLang;
  select.addEventListener("change", (e) => {
    const lang = e.target.value;
    if (supportedLangs.includes(lang)) loadLanguage(lang);
  });
}

initLanguageSwitcher();
loadLanguage("en");
