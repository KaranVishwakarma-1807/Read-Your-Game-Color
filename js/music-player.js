const PAGE_MUSIC = {
    "index.html": [
        { title: "Memories", src: "assets/music/memories.mp3" },
        { title: "New Dawn", src: "assets/music/newdawn.mp3" }
    ],
    "assessment.html": [
        { title: "New Dawn", src: "assets/music/newdawn.mp3" },
        { title: "Funky Element", src: "assets/music/funkyelement.mp3" },
        { title: "SCI FI", src: "assets/music/scifi.mp3" }
    ],
    "discovery.html": [
        { title: "The Lounge", src: "assets/music/thelounge.mp3" }
    ],
    "game.html": [
        { title: "Slow Life", src: "assets/music/slowlife.mp3" },
        { title: "New Dawn", src: "assets/music/newdawn.mp3" }
    ],
    "result.html": [
        { title: "Scream Villain", src: "assets/music/screamvillain.mp3" }
    ],
    "my-games.html": [
        { title: "Moonlight Drive", src: "assets/music/moonlightdrive.mp3" }
    ]
};

function initializeMusicPlayer() {
    const pageName = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
    const tracks = PAGE_MUSIC[pageName];

    if (!tracks || tracks.length === 0) {
        return;
    }

    const track = tracks[Math.floor(Math.random() * tracks.length)];
    const playIconSrc = "assets/icons/music_button.png";
    const pauseIconSrc = "assets/icons/music_pause_button.png";
    [playIconSrc, pauseIconSrc].forEach(src => {
        const preloadIcon = new Image();
        preloadIcon.src = src;
    });

    const audio = new Audio(track.src);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.35;

    const button = document.createElement("button");
    button.className = "music-toggle";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `Play ${track.title}`);
    button.innerHTML = `
        <span class="music-toggle-icons" aria-hidden="true">
            <img class="music-toggle-icon music-toggle-play-icon" src="${playIconSrc}" alt="">
            <img class="music-toggle-icon music-toggle-pause-icon" src="${pauseIconSrc}" alt="">
        </span>
        <span class="music-toggle-label">${track.title}</span>
    `;
    document.body.appendChild(button);

    const label = button.querySelector(".music-toggle-label");

    function updateButton(isPlaying) {
        button.classList.toggle("is-playing", isPlaying);
        button.setAttribute("aria-pressed", String(isPlaying));
        button.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} ${track.title}`);
        label.textContent = track.title;
    }

    button.addEventListener("click", async () => {
        if (!audio.paused) {
            audio.pause();
            updateButton(false);
            return;
        }

        updateButton(true);

        try {
            await audio.play();
        }
        catch (error) {
            console.warn(`Could not play ${track.title}:`, error);
            updateButton(false);
            const message = window.location.protocol === "file:"
                ? "Open via local server to play music"
                : "Music unavailable";
            label.textContent = message;
            button.setAttribute("aria-label", message);
            button.classList.add("has-error");
        }
    });

    audio.addEventListener("ended", () => updateButton(false));
}

initializeMusicPlayer();