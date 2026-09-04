/* =========================================================
   PLAY YOUR COLOR
   REAL ASSESSMENT

   24 questions
   6 answer choices per question
   11 underlying player traits

   IMPORTANT:
   The answer text and scoring are intentionally separated.
   The UI only displays the text; the scoring engine reads
   the traits object.
========================================================= */


const QUESTIONS = [

    /* =====================================================
       1. CHALLENGE
    ====================================================== */

    {
        id: 1,

        category: "challenge",

        question:
            "You keep failing the same difficult section of a game. What makes you want to keep going?",

        answers: [

            {
                text:
                    "I want to prove that I can beat it.",

                traits: {
                    challenge: 3,
                    mastery: 3
                }
            },

            {
                text:
                    "I want to understand exactly what I'm doing wrong.",

                traits: {
                    strategy: 3,
                    mastery: 2
                }
            },

            {
                text:
                    "There might be another way through that I haven't discovered.",

                traits: {
                    exploration: 2,
                    discovery: 3,
                    freedom: 1
                }
            },

            {
                text:
                    "I want to experiment with unusual approaches.",

                traits: {
                    creativity: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "I'm invested because I want to see where the story goes.",

                traits: {
                    story: 3,
                    discovery: 1
                }
            },

            {
                text:
                    "It would be more fun to figure it out with friends.",

                traits: {
                    social: 3,
                    challenge: 1
                }
            }

        ]
    },


    /* =====================================================
       2. CHALLENGE
    ====================================================== */

    {
        id: 2,

        category: "challenge",

        question:
            "Which victory would feel the most satisfying?",

        answers: [

            {
                text:
                    "Defeating something that took me dozens of attempts.",

                traits: {
                    challenge: 3,
                    mastery: 3
                }
            },

            {
                text:
                    "Solving a complicated problem nobody else had figured out.",

                traits: {
                    strategy: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Reaching a place that took a lot of effort to uncover.",

                traits: {
                    exploration: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Creating something impressive from very limited tools.",

                traits: {
                    creativity: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "Making a difficult choice that changes the story.",

                traits: {
                    story: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "Winning an intense match against other players.",

                traits: {
                    competition: 3,
                    social: 2
                }
            }

        ]
    },


    /* =====================================================
       3. MASTERY
    ====================================================== */

    {
        id: 3,

        category: "mastery",

        question:
            "After finishing a game, what would most likely make you start another playthrough?",

        answers: [

            {
                text:
                    "Trying to become even better at its mechanics.",

                traits: {
                    mastery: 3,
                    challenge: 2
                }
            },

            {
                text:
                    "Trying a completely different build or strategy.",

                traits: {
                    strategy: 3,
                    mastery: 2,
                    progression: 1
                }
            },

            {
                text:
                    "Looking for places and secrets I missed.",

                traits: {
                    exploration: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "Trying to play in a completely different way.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "Seeing how different choices change the story.",

                traits: {
                    story: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "Playing it again with friends.",

                traits: {
                    social: 3
                }
            }

        ]
    },


    /* =====================================================
       4. COMPETITION
    ====================================================== */

    {
        id: 4,

        category: "competition",

        question:
            "Which leaderboard result would make you proudest?",

        answers: [

            {
                text:
                    "Being near the top because I mastered the game's mechanics.",

                traits: {
                    competition: 3,
                    mastery: 3
                }
            },

            {
                text:
                    "Ranking highly because I found the most efficient strategy.",

                traits: {
                    competition: 2,
                    strategy: 3
                }
            },

            {
                text:
                    "Finding a route or shortcut others overlooked.",

                traits: {
                    competition: 2,
                    discovery: 3,
                    exploration: 2
                }
            },

            {
                text:
                    "Achieving something through a bizarre or unconventional method.",

                traits: {
                    creativity: 3,
                    competition: 2
                }
            },

            {
                text:
                    "Unlocking something rare before most other players.",

                traits: {
                    discovery: 3,
                    progression: 2
                }
            },

            {
                text:
                    "Beating people I know in a close match.",

                traits: {
                    competition: 3,
                    social: 3
                }
            }

        ]
    },


    /* =====================================================
       5. STRATEGY
    ====================================================== */

    {
        id: 5,

        category: "strategy",

        question:
            "A game gives you a complicated system with little explanation. Your reaction is:",

        answers: [

            {
                text:
                    "Let's see how difficult this can get.",

                traits: {
                    challenge: 2,
                    mastery: 2
                }
            },

            {
                text:
                    "Perfect. I want to understand every part of it.",

                traits: {
                    strategy: 3,
                    mastery: 3
                }
            },

            {
                text:
                    "I'll experiment and see what I can discover.",

                traits: {
                    discovery: 3,
                    exploration: 2
                }
            },

            {
                text:
                    "I'll use it in ways the designers probably didn't expect.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "I'll learn it if it helps me understand the world or story.",

                traits: {
                    story: 2,
                    discovery: 2
                }
            },

            {
                text:
                    "I'll learn it together with friends.",

                traits: {
                    social: 3,
                    strategy: 1
                }
            }

        ]
    },


    /* =====================================================
       6. STRATEGY / PROGRESSION
    ====================================================== */

    {
        id: 6,

        category: "strategy",

        question:
            "When building your character, what sounds most satisfying?",

        answers: [

            {
                text:
                    "Making a build that lets me handle extremely difficult fights.",

                traits: {
                    challenge: 3,
                    mastery: 2,
                    progression: 2
                }
            },

            {
                text:
                    "Finding the most efficient combination of abilities.",

                traits: {
                    strategy: 3,
                    mastery: 3
                }
            },

            {
                text:
                    "Creating a build that helps me interact with the world in unusual ways.",

                traits: {
                    exploration: 2,
                    creativity: 2,
                    freedom: 3
                }
            },

            {
                text:
                    "Building something completely unconventional.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "Choosing abilities that fit the character and their story.",

                traits: {
                    story: 3,
                    progression: 2
                }
            },

            {
                text:
                    "Creating a build that works especially well with my friends.",

                traits: {
                    social: 3,
                    strategy: 2
                }
            }

        ]
    },


    /* =====================================================
       7. OPTIMIZATION
    ====================================================== */

    {
        id: 7,

        category: "strategy",

        question:
            "You discover a resource is limited. What is your instinct?",

        answers: [

            {
                text:
                    "Save it for the hardest challenge ahead.",

                traits: {
                    challenge: 2,
                    progression: 2
                }
            },

            {
                text:
                    "Calculate the most efficient way to use it.",

                traits: {
                    strategy: 3,
                    progression: 2
                }
            },

            {
                text:
                    "Explore until I find another source of it.",

                traits: {
                    exploration: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Try to find a creative substitute.",

                traits: {
                    creativity: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "Use it if it helps me progress the story.",

                traits: {
                    story: 2,
                    progression: 3
                }
            },

            {
                text:
                    "Ask friends what they think I should do.",

                traits: {
                    social: 3,
                    strategy: 1
                }
            }

        ]
    },


    /* =====================================================
       8. SYSTEMS
    ====================================================== */

    {
        id: 8,

        category: "systems",

        question:
            "Which game mechanic could keep you interested for hours?",

        answers: [

            {
                text:
                    "A combat system with an extremely high skill ceiling.",

                traits: {
                    challenge: 2,
                    mastery: 3
                }
            },

            {
                text:
                    "A deep system where every decision affects something else.",

                traits: {
                    strategy: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "A huge world filled with things I don't understand yet.",

                traits: {
                    exploration: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "A sandbox with endless ways to experiment.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "A world where mechanics reveal more of the story.",

                traits: {
                    story: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "A system that becomes hilarious when played with friends.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       9. EXPLORATION
    ====================================================== */

    {
        id: 9,

        category: "exploration",

        question:
            "You notice a path that the game never asks you to take. What do you do?",

        answers: [

            {
                text:
                    "Take it. There might be a difficult optional challenge.",

                traits: {
                    challenge: 2,
                    exploration: 2
                }
            },

            {
                text:
                    "Check whether it leads to something mechanically useful.",

                traits: {
                    strategy: 2,
                    discovery: 2
                }
            },

            {
                text:
                    "Obviously follow it. I need to know where it goes.",

                traits: {
                    exploration: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "See whether I can reach it in a way the game didn't intend.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "There could be some hidden piece of the story there.",

                traits: {
                    story: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "That sounds like something worth exploring with friends.",

                traits: {
                    social: 2,
                    exploration: 2
                }
            }

        ]
    },


    /* =====================================================
       10. DISCOVERY
    ====================================================== */

    {
        id: 10,

        category: "discovery",

        question:
            "What kind of secret would excite you the most?",

        answers: [

            {
                text:
                    "A hidden boss with an extremely difficult fight.",

                traits: {
                    challenge: 3,
                    mastery: 2
                }
            },

            {
                text:
                    "A hidden mechanic that changes how the game can be played.",

                traits: {
                    strategy: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "An entire location that most players never find.",

                traits: {
                    exploration: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "A weird interaction that produces unexpected results.",

                traits: {
                    creativity: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "A secret revealing something important about the story.",

                traits: {
                    story: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "A hidden activity that becomes hilarious with friends.",

                traits: {
                    social: 3,
                    discovery: 2
                }
            }

        ]
    },


    /* =====================================================
       11. WORLD
    ====================================================== */

    {
        id: 11,

        category: "exploration",

        question:
            "What makes an open world feel alive to you?",

        answers: [

            {
                text:
                    "Dangerous areas that constantly test my abilities.",

                traits: {
                    challenge: 3,
                    mastery: 2
                }
            },

            {
                text:
                    "Systems that interact in interesting and unpredictable ways.",

                traits: {
                    strategy: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Hidden places, paths and secrets everywhere.",

                traits: {
                    exploration: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "Being able to approach things however I want.",

                traits: {
                    creativity: 2,
                    freedom: 3
                }
            },

            {
                text:
                    "A world with history, characters and stories to uncover.",

                traits: {
                    story: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Funny or unexpected things happening with other players.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       12. FREEDOM
    ====================================================== */

    {
        id: 12,

        category: "freedom",

        question:
            "A game gives you several ways to complete the same objective. Which sounds best?",

        answers: [

            {
                text:
                    "The hardest option with the biggest payoff.",

                traits: {
                    challenge: 3,
                    progression: 1
                }
            },

            {
                text:
                    "The option that is strategically the most efficient.",

                traits: {
                    strategy: 3,
                    mastery: 2
                }
            },

            {
                text:
                    "The option that takes me somewhere unexpected.",

                traits: {
                    exploration: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "The option I invent myself.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "The option that best fits the character or story.",

                traits: {
                    story: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "The option that lets my group do something ridiculous together.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       13. CREATIVITY
    ====================================================== */

    {
        id: 13,

        category: "creativity",

        question:
            "A game gives you a set of tools but no obvious instructions. What sounds fun?",

        answers: [

            {
                text:
                    "Trying to use them to overcome difficult obstacles.",

                traits: {
                    challenge: 2,
                    mastery: 2
                }
            },

            {
                text:
                    "Figuring out the combinations that work best.",

                traits: {
                    strategy: 3,
                    mastery: 2
                }
            },

            {
                text:
                    "Testing them everywhere to see what happens.",

                traits: {
                    exploration: 2,
                    discovery: 3
                }
            },

            {
                text:
                    "Building something nobody told me to build.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "Using them to interact with characters or the story.",

                traits: {
                    story: 2,
                    creativity: 2
                }
            },

            {
                text:
                    "Finding silly combinations to use with friends.",

                traits: {
                    social: 3,
                    creativity: 3
                }
            }

        ]
    },


    /* =====================================================
       14. CREATION
    ====================================================== */

    {
        id: 14,

        category: "creativity",

        question:
            "Which activity would you happily spend an entire session doing?",

        answers: [

            {
                text:
                    "Practicing until I can perform something perfectly.",

                traits: {
                    mastery: 3,
                    challenge: 2
                }
            },

            {
                text:
                    "Optimizing a system until everything works efficiently.",

                traits: {
                    strategy: 3,
                    progression: 2
                }
            },

            {
                text:
                    "Exploring and collecting unusual materials.",

                traits: {
                    exploration: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Designing or building something from scratch.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "Having conversations and discovering more about characters.",

                traits: {
                    story: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Building something ridiculous with friends.",

                traits: {
                    social: 3,
                    creativity: 3
                }
            }

        ]
    },


    /* =====================================================
       15. CUSTOMIZATION
    ====================================================== */

    {
        id: 15,

        category: "creativity",

        question:
            "How important is character or world customization to you?",

        answers: [

            {
                text:
                    "Not very important, unless it affects performance.",

                traits: {
                    mastery: 2,
                    progression: 2
                }
            },

            {
                text:
                    "Very important if customization changes the way I play.",

                traits: {
                    strategy: 2,
                    progression: 3
                }
            },

            {
                text:
                    "I love customizing things so I can explore differently.",

                traits: {
                    exploration: 2,
                    freedom: 3
                }
            },

            {
                text:
                    "It's one of my favorite parts of games.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "I care when customization helps express a character or story.",

                traits: {
                    story: 3,
                    creativity: 2
                }
            },

            {
                text:
                    "It's more fun when I can show my choices to friends.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       16. EXPERIMENTATION
    ====================================================== */

    {
        id: 16,

        category: "creativity",

        question:
            "You discover a game mechanic that seems unintended. What is your reaction?",

        answers: [

            {
                text:
                    "Can I turn this into an advantage against difficult challenges?",

                traits: {
                    challenge: 2,
                    mastery: 2
                }
            },

            {
                text:
                    "I need to understand exactly why it works.",

                traits: {
                    strategy: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "What else can I discover by pushing it further?",

                traits: {
                    exploration: 2,
                    discovery: 3
                }
            },

            {
                text:
                    "This is exactly the kind of thing I want to experiment with.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "I wonder whether it changes anything about the game's world or story.",

                traits: {
                    story: 2,
                    discovery: 3
                }
            },

            {
                text:
                    "Let's see how chaotic this gets with friends.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       17. STORY
    ====================================================== */

    {
        id: 17,

        category: "story",

        question:
            "What makes you care about a game's story?",

        answers: [

            {
                text:
                    "Seeing a character overcome impossible odds.",

                traits: {
                    challenge: 2,
                    story: 2
                }
            },

            {
                text:
                    "Understanding a world with complex motives and systems.",

                traits: {
                    strategy: 2,
                    discovery: 2,
                    story: 2
                }
            },

            {
                text:
                    "Uncovering the story through exploration.",

                traits: {
                    exploration: 2,
                    discovery: 3,
                    story: 3
                }
            },

            {
                text:
                    "Having freedom to shape how the story unfolds.",

                traits: {
                    creativity: 2,
                    freedom: 3,
                    story: 3
                }
            },

            {
                text:
                    "Characters and emotional moments that stay with me.",

                traits: {
                    story: 3
                }
            },

            {
                text:
                    "Shared stories and memorable moments with people I know.",

                traits: {
                    social: 3,
                    story: 2
                }
            }

        ]
    },


    /* =====================================================
       18. EMOTION
    ====================================================== */

    {
        id: 18,

        category: "story",

        question:
            "Which moment is most likely to stay with you after finishing a game?",

        answers: [

            {
                text:
                    "The moment I finally conquered something extremely difficult.",

                traits: {
                    challenge: 3,
                    mastery: 3
                }
            },

            {
                text:
                    "The moment everything about the game's systems suddenly clicked.",

                traits: {
                    strategy: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "The moment I discovered something I never expected.",

                traits: {
                    exploration: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "The ridiculous thing I managed to create or pull off.",

                traits: {
                    creativity: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "A character or story moment that genuinely affected me.",

                traits: {
                    story: 3
                }
            },

            {
                text:
                    "A completely ridiculous moment that happened with friends.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       19. WORLD BUILDING
    ====================================================== */

    {
        id: 19,

        category: "story",

        question:
            "How do you prefer a game to reveal its world to you?",

        answers: [

            {
                text:
                    "Through challenges that make me earn every piece of progress.",

                traits: {
                    challenge: 2,
                    progression: 2
                }
            },

            {
                text:
                    "Through systems that make the world feel believable.",

                traits: {
                    strategy: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "By letting me find things naturally while exploring.",

                traits: {
                    exploration: 3,
                    discovery: 3
                }
            },

            {
                text:
                    "By letting me interact with the world however I want.",

                traits: {
                    creativity: 2,
                    freedom: 3
                }
            },

            {
                text:
                    "Through characters, dialogue and carefully written moments.",

                traits: {
                    story: 3
                }
            },

            {
                text:
                    "Through things that become funnier or more interesting with friends.",

                traits: {
                    social: 3,
                    discovery: 1
                }
            }

        ]
    },


    /* =====================================================
       20. CHOICE
    ====================================================== */

    {
        id: 20,

        category: "story",

        question:
            "A major decision could permanently change your playthrough. How do you feel?",

        answers: [

            {
                text:
                    "Make the difficult choice and deal with the consequences.",

                traits: {
                    challenge: 2,
                    freedom: 2
                }
            },

            {
                text:
                    "Study all the possible outcomes before deciding.",

                traits: {
                    strategy: 3,
                    discovery: 2
                }
            },

            {
                text:
                    "Choose the option that opens the most unexplored possibilities.",

                traits: {
                    exploration: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "Choose whatever feels most interesting in the moment.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "Choose based on what feels right for the story and characters.",

                traits: {
                    story: 3
                }
            },

            {
                text:
                    "Discuss it with my friends and make the decision together.",

                traits: {
                    social: 3,
                    freedom: 2
                }
            }

        ]
    },


    /* =====================================================
       21. SOCIAL
    ====================================================== */

    {
        id: 21,

        category: "social",

        question:
            "What makes a multiplayer session memorable?",

        answers: [

            {
                text:
                    "The intensity of trying to beat everyone else.",

                traits: {
                    competition: 3,
                    challenge: 2
                }
            },

            {
                text:
                    "Learning how our team can play more effectively.",

                traits: {
                    strategy: 3,
                    mastery: 2
                }
            },

            {
                text:
                    "Going somewhere unexpected together.",

                traits: {
                    exploration: 3,
                    social: 2
                }
            },

            {
                text:
                    "Doing something ridiculous that nobody planned.",

                traits: {
                    creativity: 3,
                    social: 3
                }
            },

            {
                text:
                    "Making memories around the game rather than just winning.",

                traits: {
                    story: 2,
                    social: 3
                }
            },

            {
                text:
                    "Laughing so much that we barely accomplish anything.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       22. COOP
    ====================================================== */

    {
        id: 22,

        category: "social",

        question:
            "In a cooperative game, what role feels most natural to you?",

        answers: [

            {
                text:
                    "The person who takes on the hardest task.",

                traits: {
                    challenge: 3,
                    mastery: 2,
                    social: 1
                }
            },

            {
                text:
                    "The person who figures out the plan.",

                traits: {
                    strategy: 3,
                    social: 2
                }
            },

            {
                text:
                    "The person who scouts ahead and finds things.",

                traits: {
                    exploration: 3,
                    discovery: 2,
                    social: 1
                }
            },

            {
                text:
                    "The person who experiments with weird solutions.",

                traits: {
                    creativity: 3,
                    freedom: 2,
                    social: 2
                }
            },

            {
                text:
                    "The person who keeps everyone invested in what we're doing.",

                traits: {
                    story: 2,
                    social: 3
                }
            },

            {
                text:
                    "The person who keeps the group entertained.",

                traits: {
                    social: 3,
                    creativity: 3
                }
            }

        ]
    },


    /* =====================================================
       23. COMPETITIVE / SOCIAL
    ====================================================== */

    {
        id: 23,

        category: "social",

        question:
            "Which multiplayer situation sounds most appealing?",

        answers: [

            {
                text:
                    "A brutally difficult competitive match.",

                traits: {
                    challenge: 3,
                    competition: 3
                }
            },

            {
                text:
                    "A coordinated team where clever decisions matter.",

                traits: {
                    strategy: 3,
                    social: 2
                }
            },

            {
                text:
                    "A shared world where everyone can wander and discover.",

                traits: {
                    exploration: 3,
                    freedom: 2,
                    social: 2
                }
            },

            {
                text:
                    "A sandbox where players can create ridiculous situations.",

                traits: {
                    creativity: 3,
                    freedom: 3,
                    social: 2
                }
            },

            {
                text:
                    "A narrative experience everyone can discuss afterward.",

                traits: {
                    story: 3,
                    social: 2
                }
            },

            {
                text:
                    "A chaotic party game where winning barely matters.",

                traits: {
                    social: 3,
                    creativity: 2
                }
            }

        ]
    },


    /* =====================================================
       24. FINAL IDENTITY
    ====================================================== */

    {
        id: 24,

        category: "identity",

        question:
            "Complete this sentence: The best games give me...",

        answers: [

            {
                text:
                    "...something difficult enough to make me proud when I finally win.",

                traits: {
                    challenge: 3,
                    mastery: 3
                }
            },

            {
                text:
                    "...systems deep enough that I can keep getting better at them.",

                traits: {
                    strategy: 3,
                    mastery: 3,
                    progression: 1
                }
            },

            {
                text:
                    "...a world I can wander through and keep discovering.",

                traits: {
                    exploration: 3,
                    discovery: 3,
                    freedom: 2
                }
            },

            {
                text:
                    "...the freedom to experiment and make the experience my own.",

                traits: {
                    creativity: 3,
                    freedom: 3
                }
            },

            {
                text:
                    "...a story and characters I won't forget.",

                traits: {
                    story: 3,
                    discovery: 1
                }
            },

            {
                text:
                    "...people to share unforgettable moments with.",

                traits: {
                    social: 3,
                    creativity: 1
                }
            }

        ]
    }

];