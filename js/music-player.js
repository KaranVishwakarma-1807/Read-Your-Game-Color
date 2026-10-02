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

const MUSIC_SESSION_STATE_KEY = "playYourColorMusicSessionState";
const MUSIC_TARGET_VOLUME = 0.35;

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
    audio.volume = MUSIC_TARGET_VOLUME;

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
    let interactionRetryAttached = false;

    function updateButton(isPlaying, idleAction = "play") {
        button.classList.toggle("is-playing", isPlaying);
        button.classList.remove("has-error");
        button.setAttribute("aria-pressed", String(isPlaying));
        const action = isPlaying ? "Pause" : idleAction === "resume" ? "Resume" : "Play";
        button.setAttribute("aria-label", `${action} ${track.title}`);
        label.textContent = track.title;
    }

    function showPlaybackError(error) {
        console.warn(`Could not play ${track.title}:`, error);
        updateButton(false);

        let message;
        if (window.location.protocol === "file:") {
            message = "Open via local server to play music";
        } else if (error.name === "NotAllowedError") {
            const action = sessionStorage.getItem(MUSIC_SESSION_STATE_KEY) === "playing" ? "resume" : "play";
            message = `Tap to ${action} ${track.title}`;
        } else {
            message = "Music unavailable";
        }

        label.textContent = message;
        button.setAttribute("aria-label", message);
        button.classList.add("has-error");

        if (error.name === "NotAllowedError") {
            waitForUserInteraction();
        }
    }

    function retryAfterUserInteraction(event) {
        document.removeEventListener("pointerdown", retryAfterUserInteraction);
        document.removeEventListener("keydown", retryAfterUserInteraction);
        interactionRetryAttached = false;

        if (button.contains(event.target) || sessionStorage.getItem(MUSIC_SESSION_STATE_KEY) === "paused") {
            return;
        }

        sessionStorage.setItem(MUSIC_SESSION_STATE_KEY, "playing");
        startPlayback(true);
    }

    function waitForUserInteraction() {
        if (interactionRetryAttached) {
            return;
        }

        interactionRetryAttached = true;
        document.addEventListener("pointerdown", retryAfterUserInteraction, { once: true });
        document.addEventListener("keydown", retryAfterUserInteraction, { once: true });
    }

    async function startPlayback(fromUserClick = false) {
        if (fromUserClick) {
            updateButton(true);
        }

        try {
            await audio.play();
            sessionStorage.setItem(MUSIC_SESSION_STATE_KEY, "playing");
            updateButton(true);
        }
        catch (error) {
            showPlaybackError(error);
        }
    }

    button.addEventListener("click", async () => {
        if (!audio.paused) {
            audio.pause();
            sessionStorage.setItem(MUSIC_SESSION_STATE_KEY, "paused");
            updateButton(false, "resume");
            return;
        }

        sessionStorage.setItem(MUSIC_SESSION_STATE_KEY, "playing");
        await startPlayback(true);
    });

    audio.addEventListener("ended", () => updateButton(false));

    if (sessionStorage.getItem(MUSIC_SESSION_STATE_KEY) !== "paused") {
        startPlayback();
    } else {
        updateButton(false, "resume");
    }
}

initializeMusicPlayer();