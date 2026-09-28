import { useState } from "react";
import API from "../services/api";

function TaskForm({ onTaskCreated }) {

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        dueDate: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await API.post(
                "/tasks",
                form
            );

            onTaskCreated(response.data);

            setForm({
                title: "",
                description: "",
                priority: "medium",
                dueDate: ""
            });

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to create task"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="task-form">

            <h2>Add New Task</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Task description"
                    value={form.description}
                    onChange={handleChange}
                />

                <div className="form-row">

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="low">
                            Low
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>
                    </select>

                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>

            </form>

        </div>
    );
}

export default TaskForm;