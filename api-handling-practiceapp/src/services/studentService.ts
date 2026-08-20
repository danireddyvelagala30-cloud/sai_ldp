import type { Student } from "../types/student";

const API_URL = "http://localhost:3001/students";

export const getStudents = async (): Promise<Student[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch students");
    }

    return response.json();
};

export const createStudent = async (
    student: Omit<Student, "id"> & { id?: string }
): Promise<Student> => {
    let payload = { ...student };
    if (!payload.id) {
        const existing = await getStudents();
        const maxId = existing.reduce((max, s) => {
            const num = parseInt(s.id, 10);
            return !isNaN(num) && num > max ? num : max;
        }, 0);
        payload.id = String(maxId + 1);
    }

    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to create student");
    }

    return response.json();
};

export const updateStudent = async (
    id: string,
    student: Omit<Student, "id">
): Promise<Student> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
    });

    if (!response.ok) {
        throw new Error("Failed to update student");
    }

    return response.json();
};

export const deleteStudent = async (
    id: string
): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete student");
    }
};