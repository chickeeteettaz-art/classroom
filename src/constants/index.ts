

import { GraduationCap, School } from "lucide-react";
import { z } from "zod";

export const USER_ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

export const ROLE_OPTIONS = [
    {
        value: USER_ROLES.STUDENT,
        label: "Student",
        icon: GraduationCap,
    },
    {
        value: USER_ROLES.TEACHER,
        label: "Teacher",
        icon: School,
    },
];

export const DEPARTMENTS = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Economics",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Sociology",
    "Political Science",
    "Philosophy",
    "Education",
    "Fine Arts",
    "Music",
    "Physical Education",
    "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

const envSchema = z.object({
    VITE_CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloudinary cloud name is required"),
    VITE_CLOUDINARY_UPLOAD_PRESET: z.string().min(1, "Cloudinary upload preset is required"),
    VITE_BACKEND_BASE_URL: z.string().url("Invalid backend base URL"),
    VITE_API_URL: z.string().url("Invalid API URL").optional(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
    console.error("❌ Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
}

export const {
    VITE_CLOUDINARY_CLOUD_NAME: CLOUDINARY_CLOUD_NAME,
    VITE_CLOUDINARY_UPLOAD_PRESET: CLOUDINARY_UPLOAD_PRESET,
    VITE_BACKEND_BASE_URL: BACKEND_BASE_URL,
} = parsedEnv.data;

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;


