// Assessment Engine
let currentQuestionIndex = 0;

let answerHistory = [];

// Player Profile
const playerProfile = {

    // Personality
    traits: {
        challenge: 0,
        mastery: 0,
        competition: 0,
        strategy: 0,
        exploration: 0,
        discovery: 0,
        creativity: 0,
        freedom: 0,
        story: 0,
        social: 0,
        progression: 0
    },


    // Normal Preferences
    preferences: {
        visualStyles: {},
        visualTones: {},
        dimensions: {},
        cameras: {},
        worldStructures: {},
        gameplay: {},
        experience: {},
        socialModes: {}
    },
    
    
    // Harder Preferences
    constraints: {
        dislikes: {
            visualStyles: {},
            visualTones: {},
            dimensions: {},
            cameras: {},
            worldStructures: {},
            gameplay: {},
            experience: {},
            socialModes: {}
        },
        mustHave: {
            visualStyles: {},
            visualTones: {},
            dimensions: {},
            cameras: {},
            worldStructures: {},
            gameplay: {},
            experience: {},
            socialModes: {}
        }
    }
};


// Maximum Score
const traitMaximums = {
    challenge: 0,
    mastery: 0,
    competition: 0,
    strategy: 0,
    exploration: 0,
    discovery: 0,
    creativity: 0,
    freedom: 0,
    story: 0,
    social: 0,
    progression: 0
};


const preferenceMaximums = {
    visualStyles: {},
    visualTones: {},
    dimensions: {},
    cameras: {},
    worldStructures: {},
    gameplay: {},
    experience: {}
};


// Initialize Preferences
function initializePreferences() {
    Object.entries(PREFERENCE_CATEGORIES).forEach(([category, values]) => {
            /* Create the corresponding object if it doesn't already exist.*/
            if (!playerProfile.preferences[category]) {
                playerProfile.preferences[category] = {};
            }

            if (!preferenceMaximums[category]) {
                preferenceMaximums[category] = {};
            }

            /* Initialize every known preference to zero.*/
            values.forEach(value => {
                playerProfile.preferences[category][value] = 0;
                preferenceMaximums[category][value] = 0;
            });
        }
    );
}


// Prepare Questions
const preparedQuestions = ALL_QUESTIONS.map(question => {
        return {
            ...question,
            answers:
                shuffleArray(question.answers)
        };
});


// Calculate Personality Trait Maximun 
function calculateTraitMaximums() {
    preparedQuestions.filter(question => question.section === "personality").forEach(question => {
            const questionMaximums = {};

            question.answers.forEach(answer => {
                if (!answer.traits) {
                    return;
                }

                Object.entries(answer.traits).forEach(([trait, points]) => {
                        const current = questionMaximums[trait] || 0;

                        questionMaximums[trait] = Math.max(current, points);
                    }
                );
            });

            Object.entries(questionMaximums).forEach(([trait, maximum]) => {
                    traitMaximums[trait] += maximum;
                }
            );
        });
}


// Calculate Preference Maximun Trait
function calculatePreferenceMaximums() {
    preparedQuestions.filter(question => question.section === "preferences").forEach(question => {
            const questionMaximums = {};

            question.answers.forEach(answer => {
                if (!answer.preferences) {
                    return;
                }

                Object.entries(answer.preferences).forEach(([category, values]) => {
                        if (!questionMaximums[category]) {
                            questionMaximums[category] = {};
                        }

                        Object.entries(values).forEach(([preference, points]) => {
                                    const current = questionMaximums[category][preference] || 0;
                                    questionMaximums[category][preference] = Math.max(current,points);
                                }
                            );
                    }
                );

            });

            Object.entries(questionMaximums).forEach(([category, values]) => {
                    Object.entries(values).forEach(([preference, maximum]) => {
                                preferenceMaximums[category][preference] += maximum;
                            }
                        );
                }
            );

        });
}


// Initialization
initializePreferences();

initializeConstraints();

calculateTraitMaximums();

calculatePreferenceMaximums();


// Elements
const questionText = document.getElementById("questionText");

const answersContainer = document.getElementById("answersContainer");

const currentQuestion = document.getElementById("currentQuestion");

const totalQuestions = document.getElementById("totalQuestions");

const progressBar = document.getElementById("progressBar");

const questionSection = document.getElementById("questionSection");

const backButton = document.getElementById("backButton");

const questionSectionLabel = document.getElementById("questionSectionLabel");


// Initialization
restoreAssessmentState();

totalQuestions.textContent = preparedQuestions.length;
showQuestion("forward");


// Show Question
function showQuestion(direction = "forward") {
    const question = preparedQuestions[currentQuestionIndex];

    if (!question) {
        return;
    }

    // Question Coutner
    currentQuestion.textContent = currentQuestionIndex + 1;

    totalQuestions.textContent = preparedQuestions.length;


    // Section Label
    questionSectionLabel.textContent = question.sectionTitle;


    // Question Text
    questionText.textContent = question.question;


    // Clear Answer
    answersContainer.innerHTML = "";


    // Clear Answer Button
    question.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";

            button.classList.add("answer-button");

            button.setAttribute("aria-label", `Answer ${
                    String.fromCharCode(65 + index)
                }`
            );

            button.innerHTML = `
                <span class="answer-content">
                    <span class="answer-number">
                        ${
                            String.fromCharCode(65 + index)
                        }
                    </span>
                    <span>
                        ${answer.text}
                    </span>
                </span>
            `;


            /* Restore visual selection if this question was previously answered.*/
            const previousSelection = answerHistory[currentQuestionIndex];

            if (previousSelection && previousSelection.answerIndex === index) {
                button.classList.add("selected");
            }

            /* Click event */
            button.addEventListener(
                "click",
                function () {
                    selectAnswer(answer, index, button);
                }
            );

            answersContainer.appendChild(button);
        }
    );


    // Progress
    const progress = ((currentQuestionIndex + 1) / preparedQuestions.length) * 100;

    progressBar.style.width = `${progress}%`;


    // Back Button
    backButton.disabled = currentQuestionIndex === 0;


    // Animation
    questionSection.classList.remove(
        "question-enter",
        "question-back",
        "section-change"
    );

    void questionSection.offsetWidth;

    /* Detect whether this is the first question of Part 2.*/
    const previousQuestion = preparedQuestions[currentQuestionIndex - 1];

    const enteredPreferences = question.section === "preferences" && (!previousQuestion || previousQuestion.section !== "preferences");

    if (enteredPreferences) {
        questionSection.classList.add("section-change");
    }
    else if (direction === "back") {
        questionSection.classList.add("question-back");
    }
    else {
        questionSection.classList.add("question-enter");
    }
}


// Select Answer
function selectAnswer(answer, answerIndex, answerButton) {
    /* Prevent double-clicks.*/
    const allButtons = document.querySelectorAll(".answer-button");

    allButtons.forEach(button => {
            button.disabled = true;
        }
    );

    // Remove Old Answer if Neccessary
    const previousSelection = answerHistory[currentQuestionIndex];

    if (previousSelection) {
        if (previousSelection.answer.traits) {
            removeTraitScores(previousSelection.answer.traits);
        }

        if (previousSelection.answer.preferences) {
            removePreferenceScores(previousSelection.answer.preferences);
        }
    }


    // Store New Answer
    answerHistory[currentQuestionIndex] = {answerIndex, answer};

    // Add Trait Points
    if (answer.traits) {
        addTraitScores(answer.traits);
    }

    // Add Preference Points
    if (answer.preferences) {
        addPreferenceScores(answer.preferences);
    }

    if (answer.constraints) {
        addConstraintScores(answer.constraints);
    }

    if (answer.constraints?.preferenceBoost) {
        addPreferenceBoosts(answer.constraints.preferenceBoost);
    }

    // Save Progress
    saveAssessmentState();


    // Selection Animation
    answerButton.classList.add("selected");


    // Move Forward
    setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex >= preparedQuestions.length) {
                finishAssessment();
                return;
            }
            showQuestion("forward");
        },
        250
    );
}


// Add Trait Score
function addTraitScores(traits) {
    Object.entries(traits).forEach(([trait, points]) => {
                playerProfile.traits[trait] += points;
            }
        );
}


// Remove Trait Score
function removeTraitScores(traits) {Object.entries(traits).forEach(([trait, points]) => {
                playerProfile.traits[trait] -= points;
            }
        );
}

// Add Preference Scores
function addPreferenceScores(preferences) {Object.entries(preferences).forEach(([category, values]) => {
            Object.entries(values).forEach(([preference, points]) => {
                        if (typeof playerProfile.preferences[category][preference] !== "number") {
                            console.warn(`Unknown preference: ${category}.${preference}`);
                            return;
                        }

                        playerProfile.preferences[category][preference] += points;
                    }
                );
        }
    );
}

// Remove Preference Score
function removePreferenceScores(preferences) {
    Object.entries(preferences).forEach(([category, values]) => {
        Object.entries(values).forEach(([preference, points]) => {
            playerProfile.preferences[category][preference] -= points;
                }
            );
        }
    );

}


// Normalize Trait Score
function normalizeTraitScores() {Object.keys(playerProfile.traits).forEach(trait => {
        const raw = playerProfile.traits[trait];

        const maximum = traitMaximums[trait];

        if (maximum <= 0) {
            playerProfile.traits[trait] = 0;
            return;
        }

        playerProfile.traits[trait] = Math.round((raw / maximum) * 100);
    });
}


// Normalize Preference Score
function normalizePreferenceScores() {
    Object.entries(playerProfile.preferences).forEach(([category, values]) => {
            Object.keys(values).forEach(preference => {
                        const raw = playerProfile.preferences[category][preference];
                        const maximum = preferenceMaximums[category][preference];

                        if (maximum <= 0) {
                            playerProfile.preferences[category][preference] = 0;
                            return;
                        }

                        playerProfile.preferences[category][preference] = Math.round((raw / maximum) * 100);
                    }
                );
        }
    );
}


// Finish Assessment
function finishAssessment() {
    /* Normalize BOTH parts.*/
    normalizeTraitScores();

    normalizePreferenceScores();

    /* Generate color profile.*/
    const colorProfile = generateColorProfile(playerProfile.traits);

    /* Save complete Gaming DNA.*/
    const completeProfile = {
        traits: playerProfile.traits,
        preferences: playerProfile.preferences,
        constraints: playerProfile.constraints,
        colors: colorProfile
    };

    localStorage.setItem("playYourColorProfile", JSON.stringify(completeProfile));


    /* Remove unfinished assessment state.*/
    localStorage.removeItem("playYourColorAssessmentState");

    /* Go to result page.*/
    window.location.href = "result.html";
}


// Save Assessment State
function saveAssessmentState() {
    localStorage.setItem("playYourColorAssessmentState", JSON.stringify({
        currentQuestionIndex,
        answerHistory
        })
    );
}


// Restore Assessment State
function restoreAssessmentState() {
    const savedState = localStorage.getItem("playYourColorAssessmentState");

    if (!savedState) {
        return false;
    }

    try {
        const state = JSON.parse(savedState);

        currentQuestionIndex = Number(state.currentQuestionIndex) || 0;

        answerHistory = state.answerHistory || [];

        /* Rebuild all raw scores.*/
        answerHistory.forEach(selection => {
                if (!selection || !selection.answer) {
                    return;
                }

                if (selection.answer.traits) {
                    addTraitScores(selection.answer.traits);
                }

                if (selection.answer.preferences) {
                    addPreferenceScores(selection.answer.preferences);
                }

                if (selection.answer.constraints) {
                    addConstraintScores(selection.answer.constraints);
                }

                if (selection.answer.constraints?.preferenceBoost) {
                    addPreferenceBoosts(selection.answer.constraints.preferenceBoost);
                }
            }
        );
        return true;
    }
    catch (error) {
        console.error("Could not restore assessment:",error);

        localStorage.removeItem("playYourColorAssessmentState");

        return false;
    }
}


// Back Button
backButton.addEventListener(
    "click",
    function () {
        if (currentQuestionIndex === 0) {
            return;
        }

        /* Move backward first.*/
        currentQuestionIndex--;

        /* Find answer stored for the question we're returning to.*/
        const previousSelection = answerHistory[currentQuestionIndex];

        if (previousSelection) {
            if (previousSelection.answer.traits) {
                removeTraitScores(previousSelection.answer.traits);
            }
            if (previousSelection.answer.preferences) {
                removePreferenceScores(previousSelection.answer.preferences);
            }
        }

        if (previousSelection.answer.constraints) {
            removeConstraintScores(previousSelection.answer.constraints);
            if (previousSelection.answer.constraints.preferenceBoost) {
                removePreferenceBoosts(previousSelection.answer.constraints.preferenceBoost);
            }
        }

        /* Clear stored selection.*/
        answerHistory[currentQuestionIndex] = null;

        saveAssessmentState();

        showQuestion("back");
    }
);


// Keyboard Controls
document.addEventListener(
    "keydown",
    function (event) {

        /* Ignore controls while typing.*/
        const activeElement = document.activeElement;

        if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
            return;
        }

        /* A-F selects answers.*/
        const key = event.key.toUpperCase();

        if (key >= "A" && key <= "F" ) {
            const index = key.charCodeAt(0) - "A".charCodeAt(0);

            const buttons = document.querySelectorAll(".answer-button");

            if (buttons[index] && !buttons[index].disabled) {
                buttons[index].click();
            }
        }

        /* Left arrow = previous question.*/
        if (event.key === "ArrowLeft" && !backButton.disabled) {
            backButton.click();
        }
    }
);


// Shuffle Array
function shuffleArray(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}


// Initialize Constraints
function initializeConstraints() {
    Object.entries(PREFERENCE_CATEGORIES).forEach(([category, values]) => {
            values.forEach(value => {
                playerProfile.constraints.dislikes[category][value] = 0;
                playerProfile.constraints.mustHave[category][value] = 0;
            });
        }
    );
}



// Add Constraint Scores
function addConstraintScores(constraints) {
    if (!constraints) {
        return;
    }


    /* Dislikes*/
    if (constraints.dislikes) {
        Object.entries(constraints.dislikes).forEach(([category, values]) => {
                Object.entries(values).forEach(([preference, points]) => {
                            if (playerProfile.constraints.dislikes[category]?.[preference] === undefined) {
                                console.warn(`Unknown dislike: ${category}.${preference}`);
                                return;
                            }

                            playerProfile.constraints.dislikes[category][preference] += points;
                        }
                    );
            }
        );
    }

    /* Must-haves*/
    if (constraints.mustHave) {
        Object.entries(constraints.mustHave).forEach(([category, values]) => {
                Object.entries(values).forEach(([preference, points]) => {
                            if (playerProfile.constraints.mustHave[category]?.[preference] === undefined) {
                                console.warn(`Unknown must-have: ${category}.${preference}`);
                                return;
                            }

                            playerProfile.constraints.mustHave[category][preference] += points;
                        }
                    );
            }
        );
    }
}


// Apply Preference Boosts
function addPreferenceBoosts(boosts) {
    if (!boosts) {
        return;
    }

    Object.entries(boosts).forEach(([category, values]) => {
            Object.entries(values).forEach(([preference, points]) => {
                        if (playerProfile.preferences[category]?.[preference] === undefined) {
                            console.warn(`Unknown preference boost: ${category}.${preference}`);
                            return;
                        }

                        playerProfile.preferences[category][preference] += points;
                    }
                );
        }
    );
}



// Remove Constraint Scores
function removeConstraintScores(constraints) {
    if (!constraints) {
        return;
    }
    if (constraints.dislikes) {
        Object.entries(constraints.dislikes).forEach(([category, values]) => {
                Object.entries(values).forEach(([preference, points]) => {
                            playerProfile.constraints.dislikes[category][preference] -= points;
                        }
                    );
            }
        );
    }

    if (constraints.mustHave) {
        Object.entries(constraints.mustHave).forEach(([category, values]) => {
                Object.entries(values).forEach(([preference, points]) => {
                            playerProfile.constraints.mustHave[category][preference] -= points;
                        }
                    );
            }
        );
    }
}



// Remove Preference Boosts
function removePreferenceBoosts(boosts) {
    if (!boosts) {
        return;
    }

    Object.entries(boosts).forEach(([category, values]) => {
            Object.entries(values).forEach(([preference, points]) => {
                        playerProfile.preferences[category][preference] -= points;
                    }
                );
        }
    );
}

