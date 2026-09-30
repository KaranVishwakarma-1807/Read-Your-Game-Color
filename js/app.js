

const startButton = document.getElementById("startButton");


startButton.addEventListener("click", function () {
    if (typeof window.navigateWithMusicFade === "function") {
        window.navigateWithMusicFade("assessment.html");
    } else {
        window.location.href = "assessment.html";
    }
});