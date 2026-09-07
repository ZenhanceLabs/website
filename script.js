const copy = {
  ja: {
    title: "Zenhance — 毎日を、少しだけよくする。",
    description: "Zenhanceは、毎日を少しよくするプロダクトをつくっています。",
    homeAria: "Zenhance ホーム",
    navAria: "メインナビゲーション",
    languageAria: "言語",
    navProducts: "プロダクト",
    navContact: "お問い合わせ",
    heroTitle: "毎日を、少しだけよくする。",
    heroCopy: "生活の中で続けたいことを、無理なく続けられるように。Zenhanceは、日々の小さな変化を支えるプロダクトをつくっています。",
    heroButton: "プロダクトを見る",
    productsTitle: "プロダクト",
    fitletTitle: "ちょっと動くを、習慣に。",
    fitletBody: "マップを進み、カメラで回数を数え、仲間と続けるトレーニングアプリです。",
    fitletLink: "Fitletのサイトを見る",
    fitletArt: "Fitletアプリの画面とキャラクター",
    fitletCharacterAlt: "Fitletのキャラクター",
    tatsuTitle: "がんばらなくていいデジタルデトックス。",
    tatsuBody: "スマートフォンとの距離を、意志の力だけに頼らず整えるアプリです。",
    tatsuLink: "TATSUのサイトを見る",
    tatsuArt: "TATSUアプリの画面と電子猫",
    tatsuCatAlt: "TATSUの白猫",
    contactTitle: "お問い合わせ",
    contactBody: "プロダクトについて、協業について。お気軽にご連絡ください。",
    mailLabel: "メールでお問い合わせ",
    mailHref: "mailto:zenhancelabs@gmail.com?subject=Zenhanceへのお問い合わせ",
  },
  en: {
    title: "Zenhance — Make every day a little better.",
    description: "Zenhance makes products that help make everyday life a little better.",
    homeAria: "Zenhance home",
    navAria: "Main navigation",
    languageAria: "Language",
    navProducts: "Products",
    navContact: "Contact",
    heroTitle: "Make every day a little better.",
    heroCopy: "We make products that help people keep doing the things they want to do, without forcing them to try harder.",
    heroButton: "See products",
    productsTitle: "Products",
    fitletTitle: "Make a little movement a habit.",
    fitletBody: "Move across a map, count your reps with the camera, and keep going with friends.",
    fitletLink: "Visit Fitlet",
    fitletArt: "Fitlet app screens and character",
    fitletCharacterAlt: "Fitlet character",
    tatsuTitle: "Digital detox without willpower.",
    tatsuBody: "An app that helps you create a little more distance from your phone, without relying on willpower alone.",
    tatsuLink: "Visit TATSU",
    tatsuArt: "TATSU app screens and electronic cat",
    tatsuCatAlt: "TATSU white cat",
    contactTitle: "Contact",
    contactBody: "Questions about our products or ideas for working together? We would love to hear from you.",
    mailLabel: "Email us",
    mailHref: "mailto:zenhancelabs@gmail.com?subject=Contact%20Zenhance",
  },
};

const media = {
  ja: {
    fitletHome: ["assets/fitlet-home-ja.png", "Fitletのホーム画面"],
    fitletSession: ["assets/fitlet-session-ja.png", "Fitletのトレーニング画面"],
    tatsuHome: ["assets/tatsu-home-ja.png", "TATSUのホーム画面"],
    tatsuAnalysis: ["assets/tatsu-analysis-1-ja.png", "TATSUの分析画面"],
  },
  en: {
    fitletHome: ["assets/fitlet-home-en.png", "Fitlet home screen"],
    fitletSession: ["assets/fitlet-session-en.png", "Fitlet training screen"],
    tatsuHome: ["assets/tatsu-home-en.png", "TATSU home screen"],
    tatsuAnalysis: ["assets/tatsu-analysis-1-en.png", "TATSU analysis screen"],
  },
};

function setAttributeCopy(locale) {
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.getAttribute("data-i18n-attr").split(",").forEach((declaration) => {
      const [attribute, key] = declaration.split(":");
      if (attribute && key && copy[locale][key]) element.setAttribute(attribute, copy[locale][key]);
    });
  });
}

function setLocale(locale) {
  const selected = copy[locale] ? locale : "ja";
  document.documentElement.lang = selected;
  document.title = copy[selected].title;
  document.querySelector('meta[name="description"]').setAttribute("content", copy[selected].description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", "Zenhance");
  document.querySelector('meta[property="og:description"]').setAttribute("content", copy[selected].heroTitle);
  document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = copy[selected][element.getAttribute("data-i18n")]; });
  document.querySelectorAll("[data-image-key]").forEach((image) => {
    const item = media[selected][image.getAttribute("data-image-key")];
    if (!item) return;
    image.src = item[0];
    image.alt = item[1];
  });
  setAttributeCopy(selected);
  document.querySelectorAll("[data-locale]").forEach((button) => button.classList.toggle("is-active", button.getAttribute("data-locale") === selected));
  try { localStorage.setItem("zenhance-locale", selected); } catch {}
}

document.querySelectorAll("[data-locale]").forEach((button) => button.addEventListener("click", () => setLocale(button.getAttribute("data-locale"))));
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
let initialLocale = "ja";
try { initialLocale = localStorage.getItem("zenhance-locale") || "ja"; } catch {}
setLocale(initialLocale);
