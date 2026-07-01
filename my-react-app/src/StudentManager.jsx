import { useState } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

function StudentManager() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ name: '', age: '', grade: '' });
    const [editingId, setEditingId] = useState(null);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (editingId === null) {
            const newStudent = {
                id: crypto.randomUUID(),
                name: formData.name,
                age: formData.age,
                grade: formData.grade,
            };
            setStudents([...students, newStudent]);
        } else {
            setStudents(
                students.map((student) =>
                    student.id === editingId
                        ? { ...student, ...formData }
                        : student
                )
            );
            setEditingId(null);
        }

        setFormData({ name: '', age: '', grade: '' });
    }

    function handleDeleteStudent(id) {
        setStudents(students.filter((student) => student.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setFormData({ name: '', age: '', grade: '' });
        }
    }

    function handleEditStudent(student) {
        setEditingId(student.id);
        setFormData({ name: student.name, age: student.age, grade: student.grade });
    }

    function handleCancelEdit() {
        setEditingId(null);
        setFormData({ name: '', age: '', grade: '' });
    }

    return (
        <div>
            <h1>Student Management</h1>

            <StudentForm
                formData={formData}
                editingId={editingId}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onCancel={handleCancelEdit}
            />

            <StudentList
                students={students}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
            />
        </div>
    );
}

export default StudentManager;