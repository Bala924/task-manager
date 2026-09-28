import API from "../services/api";

function TaskCard({
    task,
    onUpdate,
    onDelete
}) {

    const updateStatus = async (status) => {
        try {

            const response = await API.put(
                `/tasks/${task._id}`,
                {
                    status
                }
            );

            onUpdate(response.data);

        } catch (error) {
            alert("Failed to update task");
        }
    };

    const deleteTask = async () => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this task?"
            );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/tasks/${task._id}`
            );

            onDelete(task._id);

        } catch (error) {
            alert("Failed to delete task");
        }
    };

    return (
        <div className={`task-card ${task.priority}`}>

            <div className="task-header">

                <h3>{task.title}</h3>

                <span className={`priority ${task.priority}`}>
                    {task.priority}
                </span>

            </div>

            <p>
                {task.description ||
                    "No description"}
            </p>

            <div className="task-info">

                <span>
                    Status:
                    {" "}
                    <strong>
                        {task.status}
                    </strong>
                </span>

                {task.dueDate && (
                    <span>
                        Due:
                        {" "}
                        {new Date(
                            task.dueDate
                        ).toLocaleDateString()}
                    </span>
                )}

            </div>

            <div className="task-actions">

                {task.status !== "completed" && (
                    <button
                        onClick={() =>
                            updateStatus("completed")
                        }
                        className="complete-btn"
                    >
                        Complete
                    </button>
                )}

                {task.status === "pending" && (
                    <button
                        onClick={() =>
                            updateStatus("in-progress")
                        }
                    >
                        Start
                    </button>
                )}

                {task.status === "in-progress" && (
                    <button
                        onClick={() =>
                            updateStatus("pending")
                        }
                    >
                        Pending
                    </button>
                )}

                <button
                    onClick={deleteTask}
                    className="delete-btn"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TaskCard;