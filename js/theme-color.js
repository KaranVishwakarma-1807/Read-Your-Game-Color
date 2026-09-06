const DEFAULT_THEME_COLOR = "#09090b";

function updateThemeColor() {
    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (!themeColor) {
        return;
    }

    let color = DEFAULT_THEME_COLOR;
    const savedProfile = localStorage.getItem("playYourColorProfile");

    if (savedProfile) {
        try {
            const profile = JSON.parse(savedProfile);
            const primaryColor = profile?.colors?.primary?.hex;

            if (typeof primaryColor === "string" && /^#[0-9a-f]{6}$/i.test(primaryColor)) {
                color = primaryColor;
            }
        }
        catch (error) {
            console.warn("Could not load saved theme color:", error);
        }
    }

    themeColor.setAttribute("content", color);
}

updateThemeColor();
