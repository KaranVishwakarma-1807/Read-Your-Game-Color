// Combined Assessment Data

const ALL_QUESTIONS = [
    ...QUESTIONS.map(question => (
        {
        ...question,
        section: "personality",
        sectionTitle: "How You Play"
    })),

    ...PREFERENCE_QUESTIONS.map(question => (
        {
        ...question,
        section: "preferences",
        sectionTitle: "What You Like"
    })),
    ...CONSTRAINT_QUESTIONS
];

