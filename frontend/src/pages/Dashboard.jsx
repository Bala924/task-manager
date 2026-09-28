import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import API from "../services/api";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [priorityFilter, setPriorityFilter] =
        useState("all");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {

            const response =
                await API.get("/tasks");

            setTasks(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const addTask = (task) => {
        setTasks([
            task,
            ...tasks
        ]);
    };

    const updateTask = (updatedTask) => {
        setTasks(
            tasks.map((task) =>
                task._id === updatedTask._id
                    ? updatedTask
                    : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(
            tasks.filter(
                (task) => task._id !== id
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            task.status === statusFilter;

        const matchesPriority =
            priorityFilter === "all" ||
            task.priority === priorityFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(
            task => task.status === "completed"
        ).length;

    const pendingTasks =
        tasks.filter(
            task => task.status === "pending"
        ).length;

    const progressTasks =
        tasks.filter(
            task => task.status === "in-progress"
        ).length;

    if (loading) {
        return (
            <div className="loading">
                Loading...
            </div>
        );
    }

    return (
        <>

            <Navbar />

            <main className="dashboard">

                <h1>Dashboard</h1>

                <div className="stats">

                    <div className="stat-card">
                        <h3>Total</h3>
                        <p>{totalTasks}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Pending</h3>
                        <p>{pendingTasks}</p>
                    </div>

                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <p>{progressTasks}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Completed</h3>
                        <p>{completedTasks}</p>
                    </div>

                </div>

                <TaskForm
                    onTaskCreated={addTask}
                />

                <div className="filters">

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option value="all">
                            All Status
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="in-progress">
                            In Progress
                        </option>

                        <option value="completed">
                            Completed
                        </option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(e.target.value)
                        }
                    >
                        <option value="all">
                            All Priority
                        </option>

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

                </div>

                <div className="tasks">

                    {filteredTasks.length === 0 ? (

                        <div className="no-tasks">
                            <h2>No tasks found</h2>
                            <p>
                                Create a task to get started.
                            </p>
                        </div>

                    ) : (

                        filteredTasks.map(task => (

                            <TaskCard
                                key={task._id}
                                task={task}
                                onUpdate={updateTask}
                                onDelete={deleteTask}
                            />

                        ))

                    )}

                </div>

            </main>
        </>
    );
}

export default Dashboard;