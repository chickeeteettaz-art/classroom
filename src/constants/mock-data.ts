import { Subject } from "../types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        name: "Introduction to Computer Science",
        code: "CS101",
        department: "CS",
        description: "An introductory course to the fundamental concepts of computing and programming.",
        created_at: new Date().toISOString(),
    },
    {
        id: 2,
        name: "Calculus I",
        code: "MATH101",
        department: "Math",
        description: "Limits, continuity, derivatives, and integrals of algebraic and trigonometric functions.",
        created_at: new Date().toISOString(),
    },
    {
        id: 3,
        name: "English Composition",
        code: "ENG101",
        department: "English",
        description: "Focuses on developing writing skills through various rhetorical strategies and research.",
        created_at: new Date().toISOString(),
    },
];
