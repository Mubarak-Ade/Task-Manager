import { CiMenuKebab } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import ListItemText from "@mui/material/ListItemText";
import { AuthContext } from "../context/AuthContext";
import { format, formatDistanceToNow } from "date-fns";
import TaskForm from "../component/TaskForm";

const Home = () => {
    const { API, user } = useContext(AuthContext);

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState(null);

    const fetchData = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        const res = await API.post("/tasks", { title, description });
        setTasks((prev) => [res.data, ...prev]);
        setTitle("");
        setDescription("");
        setShowModal(false);
    };

    const updateTask = async (e) => {
        e.preventDefault();
        // const task = tasks.find(t => t._id === id)
        const res = await API.put(`/tasks/${editTask._id}`, {
            title,
            description,
        });

        setTasks((prev) =>
            prev.map((t) => (t._id === editTask._id ? res.data : t))
        );
        setTitle("");
        setDescription("");
        setEditTask(null);
        setShowModal(false);
    };

    const completeTask = async (id) => {
        const task = tasks.find((t) => t._id === id);
        await API.put(`/tasks/${id}`, { completed: !task.completed });
        setTasks((prev) =>
            prev.map((t) =>
                t._id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((p) => p._id !== id));
    };

    const toggleEditForm = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setShowModal(true);
        setEditTask(task);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditTask(null);
        setTitle("");
        setDescription("");
    };

    console.log(tasks);

    return (
        <div className="px-6 overflow-hidden">
            <h4 className="text-2xl font-bold p-2 ">Tasks</h4>
            <TaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                showModal={showModal}
                setShowModal={setShowModal}
                editTask={editTask}
                addTask={editTask ? updateTask : addTask}
                closeModal={closeModal}
            />
            <div className="rounded-lg overflow-hidden bg-zinc-100">
                {/* table header */}
                <div className="flex py-3 px-6 bg-zinc-200">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 cursor-pointer bg-blue-600 rounded-lg ml-auto text-white px-5 py-2.5"
                    >
                        <AiOutlinePlus />
                        Add Task
                    </button>
                </div>
                <table className="w-full overflow-hidden text-left">
                    <thead className="uppercase text-sm">
                        <tr>
                            <th className="p-4">Title</th>
                            {/* <th>Description</th> */}
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task._id} className="">
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            checked={task.completed}
                                            onChange={() =>
                                                completeTask(task._id)
                                            }
                                            type="checkbox"
                                            className="cursor-pointer appearance-none relative before:hidden checked:before:block checked:bg-blue-500 overflow-hidden
                                    before:content-['\2713'] before:text-white before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2
                                    border rounded-full w-5 h-5"
                                            name=""
                                            id=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="flex flex-col capitalize p-2"
                                        >
                                            <span className="text-lg">
                                                {task.title}
                                            </span>
                                            <span className="text-xs text-zinc-500">
                                                {task.description}
                                            </span>
                                        </label>
                                    </div>
                                </td>
                                <td className="px-6 py-3">{task.priority}</td>
                                <td className="px-6 py-3">
                                    {formatDistanceToNow(task.updatedAt, {addSuffix: true})}
                                </td>
                                <td className="px-6 py-3">{task.category}</td>
                                {/* <div className="">
                                    <span><CiMenuKebab /></span>
                                </div> */}
                                <td className="px-6 py-3">
                                    <div className="flex items-center gap-4 text-white">
                                        <button
                                            onClick={() => toggleEditForm(task)}
                                            className="bg-green-600 px-5 py-1.5 rounded-lg cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="bg-red-600 px-5 py-1.5 rounded-lg cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default memo(Home);
