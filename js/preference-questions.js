/* =========================================================
   PLAY YOUR COLOR
   Gaming Preference Questions — Part 2
========================================================= */


const PREFERENCE_QUESTIONS = [

    /* =====================================================
       VISUAL STYLE
    ====================================================== */

    {
        id: "visual-1",

        question:
            "Which visual style would you most enjoy spending hours in?",

        answers: [

            {
                text:
                    "A handcrafted pixel-art world.",

                preferences: {

                    visualStyles: {
                        pixelArt: 5,
                        retro: 2
                    }

                }

            },

            {
                text:
                    "A beautifully illustrated hand-drawn world.",

                preferences: {

                    visualStyles: {
                        handDrawn: 5
                    }

                }

            },

            {
                text:
                    "A highly polished, realistic world.",

                preferences: {

                    visualStyles: {
                        realistic: 5
                    }

                }

            },

            {
                text:
                    "A colorful, stylized 3D world.",

                preferences: {

                    visualStyles: {
                        stylized3D: 5
                    },

                    visualTones: {
                        colorful: 3
                    }

                }

            }

        ]

    },


    /* =====================================================
       VISUAL STYLE 2
    ====================================================== */

    {
        id: "visual-2",

        question:
            "Which visual atmosphere pulls you in most strongly?",

        answers: [

            {
                text:
                    "Dark, unsettling, and mysterious.",

                preferences: {

                    visualTones: {
                        dark: 5,
                        moody: 3
                    }

                }

            },

            {
                text:
                    "Warm, peaceful, and cozy.",

                preferences: {

                    visualTones: {
                        cozy: 5,
                        peaceful: 3
                    }

                }

            },

            {
                text:
                    "Bright, colorful, and energetic.",

                preferences: {

                    visualTones: {
                        colorful: 5,
                        whimsical: 3
                    }

                }

            },

            {
                text:
                    "Strange, surreal, and atmospheric.",

                preferences: {

                    visualTones: {
                        surreal: 5,
                        atmospheric: 5
                    }

                }

            }

        ]

    },


    /* =====================================================
       DIMENSION
    ====================================================== */

    {
        id: "visual-3",

        question:
            "Which type of game world feels most appealing?",

        answers: [

            {
                text:
                    "A classic 2D world with carefully crafted artwork.",

                preferences: {

                    dimensions: {
                        "2d": 5
                    }

                }

            },

            {
                text:
                    "A world that mixes 2D presentation with a sense of depth.",

                preferences: {

                    dimensions: {
                        "2.5d": 5
                    }

                }

            },

            {
                text:
                    "A fully immersive 3D environment.",

                preferences: {

                    dimensions: {
                        "3d": 5
                    }

                }

            }

        ]

    },


    /* =====================================================
       CAMERA
    ====================================================== */

    {
        id: "camera-1",

        question:
            "How do you prefer to experience a game world?",

        answers: [

            {
                text:
                    "Through my character's eyes.",

                preferences: {

                    cameras: {
                        firstPerson: 5
                    }

                }

            },

            {
                text:
                    "Behind my character, watching them move through the world.",

                preferences: {

                    cameras: {
                        thirdPerson: 5
                    }

                }

            },

            {
                text:
                    "From above, seeing the entire situation.",

                preferences: {

                    cameras: {
                        topDown: 5,
                        isometric: 2
                    }

                }

            },

            {
                text:
                    "From the side, like a classic platform game.",

                preferences: {

                    cameras: {
                        sideScroller: 5
                    }

                }

            }

        ]

    },


    /* =====================================================
       CAMERA 2
    ====================================================== */

    {
        id: "camera-2",

        question:
            "How important is having control over the camera to you?",

        answers: [

            {
                text:
                    "Extremely important. I want to look around freely.",

                preferences: {

                    cameras: {
                        firstPerson: 2,
                        thirdPerson: 2
                    }

                }

            },

            {
                text:
                    "I like a mostly free camera with some guidance.",

                preferences: {

                    cameras: {
                        thirdPerson: 3,
                        topDown: 2
                    }

                }

            },

            {
                text:
                    "I don't mind if the camera is mostly fixed.",

                preferences: {

                    cameras: {
                        fixedCamera: 5
                    }

                }

            }

        ]

    },


    /* =====================================================
       WORLD STRUCTURE
    ====================================================== */

    {
        id: "world-1",

        question:
            "Which game structure sounds most appealing?",

        answers: [

            {
                text:
                    "A carefully paced linear journey.",

                preferences: {

                    worldStructures: {
                        linear: 5
                    }

                }

            },

            {
                text:
                    "A large open world I can explore freely.",

                preferences: {

                    worldStructures: {
                        openWorld: 5
                    }

                }

            },

            {
                text:
                    "A sandbox where I create my own goals.",

                preferences: {

                    worldStructures: {
                        sandbox: 5
                    }

                }

            },

            {
                text:
                    "A connected world that gradually opens up.",

                preferences: {

                    worldStructures: {
                        metroidvania: 5
                    }

                }

            }

        ]

    },


    /* =====================================================
       WORLD STRUCTURE 2
    ====================================================== */

    {
        id: "world-2",

        question:
            "What kind of progression structure do you enjoy?",

        answers: [

            {
                text:
                    "Clear levels with a beginning and an end.",

                preferences: {

                    worldStructures: {
                        levelBased: 5
                    }

                }

            },

            {
                text:
                    "A world that changes based on my decisions.",

                preferences: {

                    worldStructures: {
                        branching: 5
                    }

                }

            },

            {
                text:
                    "Repeated runs where I improve over time.",

                preferences: {

                    worldStructures: {
                        roguelike: 5
                    }

                }

            },

            {
                text:
                    "A central hub connecting different experiences.",

                preferences: {

                    worldStructures: {
                        hubBased: 5
                    }

                }

            }

        ]

    },


    /* =====================================================
       GAMEPLAY
    ====================================================== */

    {
        id: "gameplay-1",

        question:
            "What activity could you happily spend hours doing?",

        answers: [

            {
                text:
                    "Fighting enemies and mastering combat.",

                preferences: {

                    gameplay: {
                        combat: 5,
                        melee: 3
                    }

                }

            },

            {
                text:
                    "Solving puzzles and figuring things out.",

                preferences: {

                    gameplay: {
                        puzzle: 5,
                        strategy: 2
                    }

                }

            },

            {
                text:
                    "Building and customizing things.",

                preferences: {

                    gameplay: {
                        building: 5,
                        customization: 5
                    }

                }

            },

            {
                text:
                    "Exploring and finding things nobody told me about.",

                preferences: {

                    gameplay: {
                        exploration: 5
                    }

                }

            }

        ]

    },


    /* =====================================================
       GAMEPLAY 2
    ====================================================== */

    {
        id: "gameplay-2",

        question:
            "Which gameplay loop sounds most satisfying?",

        answers: [

            {
                text:
                    "Fight → get stronger → fight something harder.",

                preferences: {

                    gameplay: {
                        combat: 4,
                        customization: 2
                    }

                },

                traits: {
                    challenge: 2,
                    progression: 2
                }

            },

            {
                text:
                    "Plan → optimize → watch the system work.",

                preferences: {

                    gameplay: {
                        strategy: 5,
                        management: 4
                    }

                },

                traits: {
                    strategy: 2,
                    progression: 2
                }

            },

            {
                text:
                    "Explore → discover → uncover something new.",

                preferences: {

                    gameplay: {
                        exploration: 5
                    }

                },

                traits: {
                    exploration: 2,
                    discovery: 2
                }

            },

            {
                text:
                    "Create → experiment → build something better.",

                preferences: {

                    gameplay: {
                        building: 4,
                        crafting: 4
                    }

                },

                traits: {
                    creativity: 2,
                    freedom: 2
                }

            }

        ]

    },


    /* =====================================================
       EXPERIENCE
    ====================================================== */

    {
        id: "experience-1",

        question:
            "What pace feels best when you're gaming?",

        answers: [

            {
                text:
                    "Slow and relaxed. I don't want to rush.",

                preferences: {

                    experience: {
                        pace: 20,
                        intensity: 15
                    }

                }

            },

            {
                text:
                    "Balanced. I like quieter moments and exciting moments.",

                preferences: {

                    experience: {
                        pace: 50,
                        intensity: 50
                    }

                }

            },

            {
                text:
                    "Fast. I want something happening constantly.",

                preferences: {

                    experience: {
                        pace: 90,
                        intensity: 90
                    }

                }

            }

        ]

    },


    /* =====================================================
       EXPERIENCE 2
    ====================================================== */

    {
        id: "experience-2",

        question:
            "How much difficulty do you want from a game?",

        answers: [

            {
                text:
                    "I mostly want to relax and enjoy the experience.",

                preferences: {

                    experience: {
                        difficulty: 20
                    }

                }

            },

            {
                text:
                    "Some challenge is good, but I don't want frustration.",

                preferences: {

                    experience: {
                        difficulty: 50
                    }

                }

            },

            {
                text:
                    "Push me. I want the game to demand something from me.",

                preferences: {

                    experience: {
                        difficulty: 90
                    }

                },

                traits: {
                    challenge: 2
                }

            }

        ]

    },


    /* =====================================================
       EXPERIENCE 3
    ====================================================== */

    {
        id: "experience-3",

        question:
            "Which statement best describes your ideal game?",

        answers: [

            {
                text:
                    "I want a game that tells me a great story.",

                preferences: {

                    experience: {
                        narrative: 95
                    }

                },

                traits: {
                    story: 3
                }

            },

            {
                text:
                    "I want the gameplay to be the main attraction.",

                preferences: {

                    experience: {
                        narrative: 25
                    }

                }

            },

            {
                text:
                    "I want both story and gameplay to matter equally.",

                preferences: {

                    experience: {
                        narrative: 60
                    }

                },

                traits: {
                    story: 2
                }

            }

        ]

    }

];