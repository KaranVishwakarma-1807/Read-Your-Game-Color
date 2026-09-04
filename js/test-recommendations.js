/* =========================================================
   PLAY YOUR COLOR
   Recommendation Test Suite

   Development-only file.

   Tests:
   - Personality-heavy profiles
   - Preference-heavy profiles
   - Must-have constraints
   - Dislikes
   - Ranking behavior
========================================================= */


/* =========================================================
   HELPER — CREATE EMPTY PROFILE
========================================================= */

function createEmptyTestProfile() {

    return {

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

}


/* =========================================================
   FIND GAME
========================================================= */

function findTestGame(
    id
) {

    return GAMES.find(
        game =>
            game.id === id
    );

}


/* =========================================================
   RUN ONE RECOMMENDATION TEST
========================================================= */

function runRecommendationTest(
    name,
    player,
    expectations
) {

    const results =
        recommendGames(
            player,
            GAMES
        );


    const topGame =
        results[0]?.game?.id || null;


    let passed = true;


    /*
     * Check expected top game.
     */

    if (
        expectations.topGame &&
        topGame !== expectations.topGame
    ) {

        passed = false;

    }


    /*
     * Check that a game exists in results.
     */

    if (
        expectations.mustInclude
    ) {

        expectations.mustInclude.forEach(
            gameId => {

                const exists =
                    results.some(
                        result =>
                            result.game.id ===
                            gameId
                    );


                if (!exists) {

                    passed = false;

                }

            }
        );

    }


    /*
     * Check excluded games.
     */

    if (
        expectations.mustExclude
    ) {

        expectations.mustExclude.forEach(
            gameId => {

                const exists =
                    results.some(
                        result =>
                            result.game.id ===
                            gameId
                    );


                if (exists) {

                    passed = false;

                }

            }
        );

    }


    console.log(
        `${passed ? "✅" : "❌"} ${name}`
    );


    /*
     * Show actual ranking for failed tests.
     */

    if (!passed) {

        console.log(
            "Expected:",
            expectations
        );


        console.table(
            results
                .slice(0, 5)
                .map(
                    result => ({

                        game:
                            result.game.title,

                        score:
                            result.score

                    })
                )
        );

    }


    return passed;

}


/* =========================================================
   TEST 1 — CHALLENGE PLAYER
========================================================= */

function testChallengePlayer() {

    const player =
        createEmptyTestProfile();


    player.traits = {

        challenge: 100,
        mastery: 95,
        competition: 80,
        strategy: 50,
        exploration: 40,
        discovery: 30,
        creativity: 10,
        freedom: 20,
        story: 10,
        social: 10,
        progression: 90

    };


    player.preferences.experience = {

        pace: 90,
        intensity: 95,
        difficulty: 95,
        narrative: 20

    };


    player.preferences.gameplay = {

        combat: 95,
        melee: 90,
        shooting: 80,
        exploration: 40

    };


    player.preferences.dimensions = {

        "3d": 90

    };


    player.preferences.cameras = {

        firstPerson: 50,
        thirdPerson: 80

    };


    return runRecommendationTest(
        "Challenge-heavy player",

        player,

        {

            /*
             * We don't require exactly one game yet.
             * These are the kinds of games we expect
             * near the top.
             */

            mustInclude: [

                "elden-ring",
                "doom-eternal",
                "hades"

            ]

        }
    );

}


/* =========================================================
   TEST 2 — EXPLORATION PLAYER
========================================================= */

function testExplorerPlayer() {

    const player =
        createEmptyTestProfile();


    player.traits = {

        challenge: 30,
        mastery: 35,
        competition: 5,
        strategy: 25,
        exploration: 100,
        discovery: 100,
        creativity: 55,
        freedom: 100,
        story: 75,
        social: 10,
        progression: 30

    };


    player.preferences.dimensions = {

        "3d": 90,
        "2d": 20

    };


    player.preferences.cameras = {

        firstPerson: 80,
        thirdPerson: 60

    };


    player.preferences.worldStructures = {

        openWorld: 100,
        sandbox: 60

    };


    player.preferences.gameplay = {

        exploration: 100,
        puzzle: 70

    };


    player.preferences.experience = {

        pace: 40,
        intensity: 40,
        difficulty: 35,
        narrative: 85

    };


    return runRecommendationTest(
        "Exploration-heavy player",

        player,

        {

            mustInclude: [

                "outer-wilds",
                "elden-ring"

            ]

        }
    );

}


/* =========================================================
   TEST 3 — STORY PLAYER
========================================================= */

function testStoryPlayer() {

    const player =
        createEmptyTestProfile();


    player.traits = {

        challenge: 10,
        mastery: 15,
        competition: 5,
        strategy: 20,
        exploration: 70,
        discovery: 90,
        creativity: 30,
        freedom: 65,
        story: 100,
        social: 15,
        progression: 30

    };


    player.preferences.experience = {

        pace: 30,
        intensity: 30,
        difficulty: 25,
        narrative: 100

    };


    player.preferences.worldStructures = {

        branching: 100,
        openWorld: 55

    };


    player.preferences.gameplay = {

        exploration: 65,
        puzzle: 50

    };


    player.preferences.dimensions = {

        "2.5d": 75,
        "3d": 70

    };


    return runRecommendationTest(
        "Story-heavy player",

        player,

        {

            mustInclude: [

                "disco-elysium",
                "outer-wilds"

            ]

        }
    );

}


/* =========================================================
   TEST 4 — CREATIVE PLAYER
========================================================= */

function testCreativePlayer() {

    const player =
        createEmptyTestProfile();


    player.traits = {

        challenge: 20,
        mastery: 35,
        competition: 5,
        strategy: 40,
        exploration: 65,
        discovery: 60,
        creativity: 100,
        freedom: 100,
        story: 20,
        social: 65,
        progression: 30

    };


    player.preferences.gameplay = {

        building: 100,
        crafting: 90,
        customization: 95,
        simulation: 80,
        exploration: 70

    };


    player.preferences.worldStructures = {

        sandbox: 100,
        openWorld: 80

    };


    player.preferences.visualStyles = {

        voxel: 100,
        stylized3D: 90

    };


    player.preferences.dimensions = {

        "3d": 90

    };


    return runRecommendationTest(
        "Creativity-heavy player",

        player,

        {

            mustInclude: [

                "minecraft",
                "stardew-valley"

            ]

        }
    );

}


/* =========================================================
   TEST 5 — SOCIAL PLAYER
========================================================= */

function testSocialPlayer() {

    const player =
        createEmptyTestProfile();


    player.traits = {

        challenge: 35,
        mastery: 25,
        competition: 60,
        strategy: 25,
        exploration: 25,
        discovery: 20,
        creativity: 75,
        freedom: 65,
        story: 25,
        social: 100,
        progression: 20

    };


    player.preferences.gameplay = {

        customization: 60,
        building: 55,
        exploration: 45

    };


    player.preferences.dimensions = {

        "3d": 80

    };


    player.preferences.worldStructures = {

        sandbox: 70

    };


    player.preferences.socialModes = {

        onlineCoop: 100,
        localCoop: 80

    };


    return runRecommendationTest(
        "Social-heavy player",

        player,

        {

            mustInclude: [

                "it-takes-two",
                "minecraft",
                "stardew-valley"

            ]

        }
    );

}


/* =========================================================
   TEST 6 — THIRD-PERSON MUST-HAVE
========================================================= */

function testThirdPersonMustHave() {

    const player =
        createEmptyTestProfile();


    player.traits = {

        challenge: 75,
        mastery: 75,
        competition: 30,
        strategy: 40,
        exploration: 70,
        discovery: 60,
        creativity: 30,
        freedom: 60,
        story: 35,
        social: 20,
        progression: 70

    };


    player.preferences.dimensions = {

        "3d": 80

    };


    player.preferences.cameras = {

        thirdPerson: 100

    };


    player.constraints.mustHave.cameras = {

        thirdPerson: 100

    };


    return runRecommendationTest(
        "Third-person must-have",

        player,

        {

            mustExclude: [

                "doom-eternal",
                "outer-wilds"

            ]

        }
    );

}


/* =========================================================
   TEST 7 — FIRST-PERSON DISLIKE
========================================================= */

function testFirstPersonDislike() {

    const player =
        createEmptyTestProfile();


    player.traits = {

        challenge: 85,
        mastery: 85,
        competition: 20,
        strategy: 40,
        exploration: 80,
        discovery: 70,
        creativity: 20,
        freedom: 70,
        story: 25,
        social: 5,
        progression: 75

    };


    player.preferences.dimensions = {

        "3d": 90

    };


    player.preferences.cameras = {

        thirdPerson: 90,
        firstPerson: 15

    };


    player.constraints.dislikes.cameras = {

        firstPerson: 100

    };


    const results =
        recommendGames(
            player,
            GAMES
        );


    const doom =
        results.find(
            result =>
                result.game.id ===
                "doom-eternal"
        );


    /*
     * Doom should still exist if the dislike
     * isn't a must-have.
     *
     * But it should receive a penalty.
     */

    const passed =
        doom &&
        doom.penalty > 0;


    console.log(
        `${passed ? "✅" : "❌"} First-person dislike`
    );


    if (!passed) {

        console.table(
            results.slice(0, 5)
                .map(
                    result => ({

                        game:
                            result.game.title,

                        score:
                            result.score,

                        penalty:
                            result.penalty

                    })
                )
        );

    }


    return passed;

}


/* =========================================================
   TEST 8 — OPEN WORLD MUST-HAVE
========================================================= */

function testOpenWorldMustHave() {

    const player =
        createEmptyTestProfile();


    player.traits.exploration = 100;

    player.traits.discovery = 85;

    player.traits.freedom = 100;


    player.preferences.worldStructures = {

        openWorld: 100

    };


    player.constraints.mustHave
        .worldStructures = {

            openWorld: 100

        };


    const results =
        recommendGames(
            player,
            GAMES
        );


    const linearGameExists =
        results.some(
            result =>

                result.game.id ===
                "it-takes-two"

        );


    const passed =
        !linearGameExists;


    console.log(
        `${passed ? "✅" : "❌"} Open-world must-have`
    );


    return passed;

}


/* =========================================================
   TEST 9 — COMBAT DISLIKE
========================================================= */

function testCombatDislike() {

    const player =
        createEmptyTestProfile();


    player.traits.story = 80;

    player.traits.exploration = 75;


    player.preferences.gameplay = {

        exploration: 80,
        puzzle: 70

    };


    player.constraints.dislikes.gameplay = {

        combat: 100

    };


    const results =
        recommendGames(
            player,
            GAMES
        );


    const doom =
        results.find(
            result =>
                result.game.id ===
                "doom-eternal"
        );


    const passed =
        doom &&
        doom.penalty > 0;


    console.log(
        `${passed ? "✅" : "❌"} Combat dislike`
    );


    return passed;

}


/* =========================================================
   RUN ALL TESTS
========================================================= */

function runRecommendationTests() {

    console.clear();


    console.log(
        "=========================================="
    );

    console.log(
        "PLAY YOUR COLOR"
    );

    console.log(
        "RECOMMENDATION TEST SUITE"
    );

    console.log(
        "=========================================="
    );


    const tests = [

        testChallengePlayer,

        testExplorerPlayer,

        testStoryPlayer,

        testCreativePlayer,

        testSocialPlayer,

        testThirdPersonMustHave,

        testFirstPersonDislike,

        testOpenWorldMustHave,

        testCombatDislike

    ];


    let passed = 0;


    tests.forEach(
        test => {

            try {

                if (
                    test()
                ) {

                    passed++;

                }

            }
            catch (error) {

                console.error(
                    "❌ Test crashed:",
                    error
                );

            }

        }
    );


    console.log(
        "\n=========================================="
    );


    console.log(
        `RESULT: ${passed}/${tests.length} tests passed`
    );


    console.log(
        "=========================================="
    );


    return {

        passed,

        total:
            tests.length,

        success:
            passed === tests.length

    };

}


/* =========================================================
   SHOW RANKING
========================================================= */

function showRecommendationRanking(
    player,
    limit = 10
) {

    const results =
        recommendGames(
            player,
            GAMES
        );


    console.table(

        results
            .slice(
                0,
                limit
            )
            .map(
                (result, index) => ({

                    rank:
                        index + 1,

                    game:
                        result.game.title,

                    match:
                        result.score,

                    motivation:
                        result.breakdown
                            .motivation,

                    preferences:
                        result.breakdown
                            .preferences,

                    penalty:
                        result.penalty

                })
            )

    );


    return results;

}

function testMustHaveExclusion() {

    const player =
        createEmptyTestProfile();


    player.constraints.mustHave.cameras = {

        thirdPerson: 100

    };


    const game =
        findTestGame(
            "doom-eternal"
        );


    const result =
        calculateGameMatch(
            player,
            game
        );


    const passed =
        result.excluded === true;


    console.log(
        `${passed ? "✅" : "❌"} Must-have exclusion`
    );


    return passed;

}


function testMustHavePass() {

    const player =
        createEmptyTestProfile();


    player.constraints.mustHave.cameras = {

        thirdPerson: 100

    };


    const game =
        findTestGame(
            "elden-ring"
        );


    const result =
        calculateGameMatch(
            player,
            game
        );


    const passed =
        result.excluded === false;


    console.log(
        `${passed ? "✅" : "❌"} Must-have pass`
    );


    return passed;

}


function testNoConstraints() {

    const player =
        createEmptyTestProfile();


    const result =
        calculateGameMatch(
            player,
            findTestGame(
                "elden-ring"
            )
        );


    const passed =
        result.excluded === false &&
        result.penalty === 0;


    console.log(
        `${passed ? "✅" : "❌"} No constraints`
    );


    return passed;

}


function testDislikeDoesNotExclude() {

    const player =
        createEmptyTestProfile();


    player.constraints.dislikes.cameras = {

        firstPerson: 100

    };


    const game =
        findTestGame(
            "doom-eternal"
        );


    const result =
        calculateGameMatch(
            player,
            game
        );


    const passed =
        result.excluded === false &&
        result.penalty > 0;


    console.log(
        `${passed ? "✅" : "❌"} Dislike vs exclusion`
    );


    return passed;

}