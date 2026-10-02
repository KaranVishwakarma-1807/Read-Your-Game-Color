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
const MUSIC_TRACK_SESSION_PREFIX = "playYourColorMusicTrack:";
const MUSIC_TARGET_VOLUME = 0.35;

function initializeMusicPlayer() {
    const pageName = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
    const tracks = PAGE_MUSIC[pageName];

    if (!tracks || tracks.length === 0) {
        return;
    }

    const trackStorageKey = `${MUSIC_TRACK_SESSION_PREFIX}${pageName}`;
    const storedTrackSrc = sessionStorage.getItem(trackStorageKey);
    let track = tracks.find(item => item.src === storedTrackSrc)
        || tracks[Math.floor(Math.random() * tracks.length)];
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

    const controls = document.createElement("div");
    controls.className = "music-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Music controls");
    controls.appendChild(button);

    const menuToggle = document.createElement("button");
    menuToggle.className = "music-menu-toggle";
    menuToggle.type = "button";
    menuToggle.setAttribute("aria-label", "Choose music");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "musicTrackMenu");
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    const menu = document.createElement("section");
    menu.className = "music-track-menu";
    menu.id = "musicTrackMenu";
    menu.hidden = true;
    menu.setAttribute("aria-label", "Choose a track");

    const menuHeading = document.createElement("h2");
    menuHeading.className = "music-track-menu-heading";
    menuHeading.textContent = "Choose a track";
    menu.appendChild(menuHeading);

    const trackList = document.createElement("div");
    trackList.className = "music-track-list";
    trackList.setAttribute("role", "group");
    trackList.setAttribute("aria-label", "Tracks for this page");

    const trackButtons = tracks.map(item => {
        const trackButton = document.createElement("button");
        trackButton.className = "music-track-option";
        trackButton.type = "button";
        trackButton.dataset.trackSrc = item.src;
        trackButton.setAttribute("aria-pressed", String(item.src === track.src));
        trackButton.innerHTML = `<span class="music-track-option-title"></span><span class="music-track-option-check" aria-hidden="true">&#10003;</span>`;
        trackButton.querySelector(".music-track-option-title").textContent = item.title;
        trackList.appendChild(trackButton);
        return trackButton;
    });

    menu.appendChild(trackList);
    controls.append(menuToggle, menu);
    document.body.appendChild(controls);

    const label = button.querySelector(".music-toggle-label");
    let interactionRetryAttached = false;

    function updateTrackChoices() {
        trackButtons.forEach(trackButton => {
            trackButton.setAttribute("aria-pressed", String(trackButton.dataset.trackSrc === track.src));
        });
    }

    function setTrackMenuOpen(isOpen) {
        menu.hidden = !isOpen;
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        controls.classList.toggle("menu-open", isOpen);
        controls.classList.toggle("is-expanded", isOpen);

        if (isOpen) {
            const selectedButton = trackButtons.find(trackButton => trackButton.dataset.trackSrc === track.src);
            selectedButton?.focus();
        }
    }

    menuToggle.addEventListener("click", () => {
        setTrackMenuOpen(menu.hidden);
    });

    trackButtons.forEach(trackButton => {
        trackButton.addEventListener("click", async () => {
            const selectedTrack = tracks.find(item => item.src === trackButton.dataset.trackSrc);
            if (!selectedTrack) {
                return;
            }

            track = selectedTrack;
            sessionStorage.setItem(trackStorageKey, track.src);
            sessionStorage.setItem(MUSIC_SESSION_STATE_KEY, "playing");
            audio.pause();
            audio.src = track.src;
            audio.load();
            updateButton(true);
            updateTrackChoices();
            setTrackMenuOpen(false);
            menuToggle.focus();
            await startPlayback(true);
        });
    });

    document.addEventListener("pointerdown", event => {
        if (!controls.contains(event.target)) {
            setTrackMenuOpen(false);
            controls.classList.remove("is-expanded");
            if (controls.contains(document.activeElement)) {
                document.activeElement.blur();
            }
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !menu.hidden) {
            setTrackMenuOpen(false);
            menuToggle.focus();
        }
    });

    function updateButton(isPlaying, idleAction = "play") {
        button.classList.toggle("is-playing", isPlaying);
        button.classList.remove("has-error");
        controls.classList.remove("has-error");
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
        controls.classList.add("has-error");

        if (error.name === "NotAllowedError") {
            waitForUserInteraction();
        }
    }

    function retryAfterUserInteraction(event) {
        document.removeEventListener("pointerdown", retryAfterUserInteraction);
        document.removeEventListener("keydown", retryAfterUserInteraction);
        interactionRetryAttached = false;

        if (controls.contains(event.target) || sessionStorage.getItem(MUSIC_SESSION_STATE_KEY) === "paused") {
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
        if (!window.matchMedia("(hover: hover)").matches) {
            controls.classList.add("is-expanded");
        }

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