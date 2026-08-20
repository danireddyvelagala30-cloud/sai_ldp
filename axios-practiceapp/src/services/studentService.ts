import axios from "axios";
import type { Student } from "../types/student";

const API_URL = "http://localhost:3001/students";

export const getStudents = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>(API_URL);
  return response.data;
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

  const response = await axios.post<Student>(API_URL, payload);
  return response.data;
};

export const updateStudent = async (
  id: string,
  student: Omit<Student, "id">
): Promise<Student> => {
  const response = await axios.put<Student>(`${API_URL}/${id}`, student);
  return response.data;
};

export const patchStudent = async (
  id: string,
  student: Partial<Omit<Student, "id">>
): Promise<Student> => {
  const response = await axios.patch<Student>(`${API_URL}/${id}`, student);
  return response.data;
};

export const deleteStudent = async (
  id: string
): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};