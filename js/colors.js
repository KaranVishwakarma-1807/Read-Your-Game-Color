/* Color Definitions*/
const COLORS = {

    red: {

        id: "red",

        name: "The Challenger",

        shortName: "Challenger",

        hex: "#EF4444",

        description:
            "You play to overcome difficult challenges, master demanding mechanics, and prove what you can do.",

        motivation:
            "Overcome",

        traits: {

            challenge: 5,
            mastery: 5,
            competition: 4,
            strategy: 3,
            exploration: 2,
            discovery: 2,
            creativity: 1,
            freedom: 2,
            story: 1,
            social: 2,
            progression: 4

        }

    },


    blue: {

        id: "blue",

        name: "The Strategist",

        shortName: "Strategist",

        hex: "#3B82F6",

        description:
            "You love understanding systems, planning ahead, optimizing your choices, and finding the smartest solution.",

        motivation:
            "Understand",

        traits: {

            challenge: 4,
            mastery: 5,
            competition: 3,
            strategy: 5,
            exploration: 2,
            discovery: 3,
            creativity: 3,
            freedom: 2,
            story: 1,
            social: 1,
            progression: 4

        }

    },


    green: {

        id: "green",

        name: "The Explorer",

        shortName: "Explorer",

        hex: "#22C55E",

        description:
            "You play to wander, investigate, uncover secrets, and discover places and possibilities for yourself.",

        motivation:
            "Discover",

        traits: {

            challenge: 2,
            mastery: 2,
            competition: 1,
            strategy: 2,
            exploration: 5,
            discovery: 5,
            creativity: 3,
            freedom: 5,
            story: 3,
            social: 1,
            progression: 3

        }

    },


    yellow: {

        id: "yellow",

        name: "The Creator",

        shortName: "Creator",

        hex: "#EAB308",

        description:
            "You want freedom to build, customize, experiment, and create your own way of playing.",

        motivation:
            "Create",

        traits: {

            challenge: 2,
            mastery: 3,
            competition: 1,
            strategy: 3,
            exploration: 3,
            discovery: 3,
            creativity: 5,
            freedom: 5,
            story: 2,
            social: 3,
            progression: 3

        }

    },


    purple: {

        id: "purple",

        name: "The Storyteller",

        shortName: "Storyteller",

        hex: "#A855F7",

        description:
            "You play to experience stories, connect with characters, explore ideas, and feel something meaningful.",

        motivation:
            "Feel",

        traits: {

            challenge: 1,
            mastery: 1,
            competition: 1,
            strategy: 1,
            exploration: 3,
            discovery: 4,
            creativity: 2,
            freedom: 3,
            story: 5,
            social: 2,
            progression: 3

        }

    },


    orange: {

        id: "orange",

        name: "The Socializer",

        shortName: "Socializer",

        hex: "#F97316",

        description:
            "You play for shared experiences, memorable moments, teamwork, friendly competition, and pure fun.",

        motivation:
            "Connect",

        traits: {

            challenge: 3,
            mastery: 2,
            competition: 4,
            strategy: 2,
            exploration: 2,
            discovery: 2,
            creativity: 3,
            freedom: 3,
            story: 2,
            social: 5,
            progression: 3

        }

    }

};



// Color Presentation  Data
const COLOR_PRESENTATION = {

    red: {

        eyebrow:
            "YOUR GAMING COLOR",

        archetype:
            "The Challenger",

        tagline:
            "You play to overcome.",

        description:
            "You are drawn to games that push back. "
            +
            "You enjoy difficult goals, meaningful mastery, "
            +
            "and the satisfaction of becoming good enough "
            +
            "to conquer something that once seemed impossible.",

        keywords: [

            "Challenge",
            "Mastery",
            "Intensity",
            "Progression"

        ]

    },


    blue: {

        eyebrow:
            "YOUR GAMING COLOR",

        archetype:
            "The Strategist",

        tagline:
            "You play to understand.",

        description:
            "You enjoy seeing systems beneath the surface. "
            +
            "Planning, optimization, tactical thinking, "
            +
            "and finding the right solution are what make "
            +
            "a game satisfying for you.",

        keywords: [

            "Strategy",
            "Mastery",
            "Planning",
            "Optimization"

        ]

    },


    green: {

        eyebrow:
            "YOUR GAMING COLOR",

        archetype:
            "The Explorer",

        tagline:
            "You play to discover.",

        description:
            "You are motivated by curiosity. "
            +
            "Unknown places, hidden systems, secrets, "
            +
            "and the feeling of discovering something "
            +
            "without being explicitly told to look for it "
            +
            "are central to your ideal gaming experience.",

        keywords: [

            "Exploration",
            "Discovery",
            "Freedom",
            "Curiosity"

        ]

    },


    yellow: {

        eyebrow:
            "YOUR GAMING COLOR",

        archetype:
            "The Creator",

        tagline:
            "You play to create.",

        description:
            "You enjoy games that give you room to experiment. "
            +
            "Building, customizing, creating and finding "
            +
            "your own way through a system are especially "
            +
            "rewarding to you.",

        keywords: [

            "Creativity",
            "Freedom",
            "Experimentation",
            "Expression"

        ]

    },


    purple: {

        eyebrow:
            "YOUR GAMING COLOR",

        archetype:
            "The Storyteller",

        tagline:
            "You play to feel.",

        description:
            "You connect with games through stories, characters, "
            +
            "mystery and atmosphere. A game becomes memorable "
            +
            "for you when its world leaves something behind "
            +
            "long after you've put the controller down.",

        keywords: [

            "Story",
            "Emotion",
            "Discovery",
            "Atmosphere"

        ]

    },


    orange: {

        eyebrow:
            "YOUR GAMING COLOR",

        archetype:
            "The Socializer",

        tagline:
            "You play to share.",

        description:
            "For you, games become better when there's someone "
            +
            "else to experience them with. Cooperation, "
            +
            "competition, chaos and shared moments can be "
            +
            "just as important as the mechanics themselves.",

        keywords: [

            "Social",
            "Cooperation",
            "Competition",
            "Shared Experiences"

        ]

    }

};