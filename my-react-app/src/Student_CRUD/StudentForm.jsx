function StudentForm({ formData, editingId, onInputChange, onSubmit, onCancel }) {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={onInputChange}
            />
            <input
                type="text"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={onInputChange}
            />
            <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={formData.grade}
                onChange={onInputChange}
            />
            <button type="submit">
                {editingId === null ? 'Add Student' : 'Update Student'}
            </button>
            {editingId !== null && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default StudentForm;