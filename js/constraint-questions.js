// Constraint Questions
const CONSTRAINT_QUESTIONS = [

    // 1. Camera
    {
        id: "constraint-camera-1",
        section: "constraints",
        sectionTitle: "YOUR DEALBREAKERS",
        question: "How do you feel about first-person games?",
        answers: [
            {
                text: "I love them. Give me as many as possible.",
                constraints: {
                    preferenceBoost: {
                        cameras: {
                            firstPerson: 100
                        }
                    }
                }
            },
            {
                text: "I generally like them.",
                constraints: {
                    preferenceBoost: {
                        cameras: {
                            firstPerson: 50
                        }
                    }
                }
            },
            {
                text: "I don't particularly care.",
                constraints: {}
            },
            {
                text: "I usually avoid them.",
                constraints: {
                    dislikes: {
                        cameras: {
                            firstPerson: 60
                        }
                    }
                }
            },
            {
                text: "I really don't want first-person games.",
                constraints: {
                    dislikes: {
                        cameras: {
                            firstPerson: 100
                        }
                    }
                }
            }
        ]
    },


    // 2. Dimensions
    {
        id: "constraint-dimension-1",
        section: "constraints",
        sectionTitle: "YOUR DEALBREAKERS",
        question: "How important is 2D presentation to you?",
        answers: [
            {
                text: "It's one of my favorite things about games.",
                constraints: {
                    preferenceBoost: {
                        dimensions: {
                            "2d": 100
                        }
                    }
                }
            },
            {
                text: "I strongly enjoy 2D games.",
                constraints: {
                    preferenceBoost: {
                        dimensions: {
                            "2d": 75
                        }
                    }
                }
            },
            {
                text: "I enjoy both 2D and 3D.",
                constraints: {}
            },
            {
                text: "I usually prefer 3D instead.",
                constraints: {
                    dislikes: {
                        dimensions: {
                            "2d": 60
                        }
                    }
                }
            },
            {
                text: "I really don't want 2D games.",
                constraints: {
                    dislikes: {
                        dimensions: {
                            "2d": 100
                        }
                    }
                }
            }
        ]
    },


    // 3. Multiplayer
    {
        id: "constraint-social-1",
        section: "constraints",
        sectionTitle: "YOUR DEALBREAKERS",
        question: "How important is multiplayer to your ideal game?",
        answers: [
            {
                text: "Essential. I mainly want games I can play with others.",
                constraints: {
                    mustHave: {
                        socialModes: {
                            onlineCoop: 100
                        }
                    }
                }
            },

            {
                text: "Very important, but single-player is okay sometimes.",
                constraints: {
                    mustHave: {
                        socialModes: {
                            onlineCoop: 60
                        }
                    }
                }
            },
            {
                text: "I enjoy both equally.",
                constraints: {}
            },
            {
                text: "I usually prefer playing alone.",
                constraints: {
                    dislikes: {
                        socialModes: {
                            onlineCoop: 60,
                            competitive: 40
                        }
                    }
                }
            },
            {
                text: "I specifically want single-player experiences.",
                constraints: {
                    mustHave: {
                        socialModes: {
                            singlePlayer: 100
                        }
                    }
                }
            }
        ]

    },


    // 4. World Structure
    {
        id: "constraint-world-1",
        section: "constraints",
        sectionTitle: "YOUR DEALBREAKERS",
        question: "What kind of world structure do you absolutely want?",
        answers: [
            {
                text: "A large open world is essential.",
                constraints: {
                    mustHave: {
                        worldStructures: {
                            openWorld: 100
                        }
                    }
                }
            },
            {
                text: "I strongly prefer open worlds.",
                constraints: {
                    mustHave: {
                        worldStructures: {
                            openWorld: 60
                        }
                    }
                }
            },
            {
                text: "I enjoy all kinds of world structures.",
                constraints: {}
            },
            {
                text: "I usually dislike very open worlds.",
                constraints: {
                    dislikes: {
                        worldStructures: {
                            openWorld: 60
                        }
                    }
                }
            },
            {
                text: "I really don't want open-world games.",
                constraints: {
                    dislikes: {
                        worldStructures: {
                            openWorld: 100
                        }
                    }
                }
            }
        ]
    },


    // 5. Gameplay
    {
        id: "constraint-gameplay-1",
        section: "YOUR DEALBREAKERS",
        question: "How do you feel about heavy combat?",
        answers: [
            {
                text: "It's essential. Combat should be a major part of the game.",
                constraints: {
                    mustHave: {
                        gameplay: {
                            combat: 100
                        }
                    }
                }
            },
            {
                text: "I strongly prefer combat-focused games.",
                constraints: {
                    mustHave: {
                        gameplay: {
                            combat: 60
                        }
                    }
                }
            },
            {
                text: "Combat doesn't really affect my choice.",
                constraints: {}
            },
            {
                text:"I'd rather avoid combat-heavy games.",
                constraints: {
                    dislikes: {
                        gameplay: {
                            combat: 60
                        }
                    }
                }
            },
            {
                text: "I really don't want games centered around combat.",
                constraints: {
                    dislikes: {
                        gameplay: {
                            combat: 100
                        }
                    }
                }
            }
        ]
    }
];