export const THEME_KEY = "ceynx-theme";

/** Inline, render-blocking script: applies the visitor's saved theme before first paint; light is the default. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="dark"){t="light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
