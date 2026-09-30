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
const MUSIC_FADE_DURATION = 500;
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
    audio.volume = 0;

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
    let navigationPending = false;

    function fadeAudioTo(targetVolume, duration) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || duration <= 0) {
            audio.volume = targetVolume;
            return Promise.resolve();
        }

        const startVolume = audio.volume;
        const startTime = performance.now();

        return new Promise(resolve => {
            function step(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                audio.volume = startVolume + (targetVolume - startVolume) * progress;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(step);
        });
    }

    async function navigateWithMusicFade(destination) {
        if (navigationPending) {
            return;
        }

        navigationPending = true;

        if (audio.paused || sessionStorage.getItem(MUSIC_SESSION_STATE_KEY) === "paused") {
            window.location.assign(destination);
            return;
        }

        await fadeAudioTo(0, MUSIC_FADE_DURATION);
        window.location.assign(destination);
    }

    window.navigateWithMusicFade = navigateWithMusicFade;

    document.addEventListener("click", event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        const anchor = event.target.closest?.("a[href]");
        if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) {
            return;
        }

        const destination = new URL(anchor.href, window.location.href);
        if (destination.origin !== window.location.origin) {
            return;
        }

        if (
            destination.pathname === window.location.pathname &&
            destination.search === window.location.search &&
            destination.hash
        ) {
            return;
        }

        event.preventDefault();
        navigateWithMusicFade(destination.href);
    }, true);

    function updateButton(isPlaying) {
        button.classList.toggle("is-playing", isPlaying);
        button.classList.remove("has-error");
        button.setAttribute("aria-pressed", String(isPlaying));
        button.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} ${track.title}`);
        label.textContent = track.title;
    }

    function showPlaybackError(error) {
        console.warn(`Could not play ${track.title}:`, error);
        updateButton(false);

        let message;
        if (window.location.protocol === "file:") {
            message = "Open via local server to play music";
        } else if (error.name === "NotAllowedError") {
            message = `Tap to play ${track.title}`;
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
            updateButton(true);
            await fadeAudioTo(MUSIC_TARGET_VOLUME, MUSIC_FADE_DURATION);
        }
        catch (error) {
            showPlaybackError(error);
        }
    }

    button.addEventListener("click", async () => {
        if (!audio.paused) {
            audio.pause();
            sessionStorage.setItem(MUSIC_SESSION_STATE_KEY, "paused");
            updateButton(false);
            return;
        }

        sessionStorage.setItem(MUSIC_SESSION_STATE_KEY, "playing");
        await startPlayback(true);
    });

    audio.addEventListener("ended", () => updateButton(false));

    if (sessionStorage.getItem(MUSIC_SESSION_STATE_KEY) !== "paused") {
        startPlayback();
    } else {
        updateButton(false);
    }
}

initializeMusicPlayer();