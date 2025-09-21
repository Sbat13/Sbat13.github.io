window.addEventListener("DOMContentLoaded", () => {
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      theme: "base",
      themeVariables: {
        primaryColor: getComputedStyle(document.documentElement).getPropertyValue("--bs-primary").trim(),
        primaryTextColor: "#fff",
        secondaryColor: getComputedStyle(document.documentElement).getPropertyValue("--bs-secondary").trim(),
        fontFamily: getComputedStyle(document.documentElement).getPropertyValue("--bs-body-font-family").trim(),
        fontSize: getComputedStyle(document.documentElement).getPropertyValue("--bs-body-font-size").trim() || "14px"
      }
    });
  }
});
