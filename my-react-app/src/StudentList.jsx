function StudentList({ students, onEdit, onDelete }) {
    if (students.length === 0) {
        return <p>No students added yet.</p>;
    }

    return (
        <ul>
            {students.map((student) => (
                <li key={student.id}>
                    {student.name} — Age: {student.age} — Grade: {student.grade}
                    <button onClick={() => onEdit(student)}>Edit</button>
                    <button onClick={() => onDelete(student.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default StudentList;