import React from "react";

const TaskForm = ({showModal, editTask, closeModal, setShowModal, addTask, title, description, setTitle, setDescription}) => {
    return ( showModal &&
        <div className="bg-black/10 w-full h-full backdrop-blur-sm flex items-center justify-center rounded-lg z-50 inset-0 left-1/2 -translate-x-1/2 absolute">
                <div className="bg-zinc-300 rounded-lg w-150 p-6 shadow-2xl shadow-gray-500">
                    <h1 className="mb-5 text-lg font-semibold text-center">Add Task</h1>
                    <form onSubmit={addTask} className="block space-y-2">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block p-4 rounded-lg bg-white w-full text-base placeholder:text-gray-500/70" placeholder="Input a task" />
                        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="block p-4 rounded-lg text-base placeholder:text-gray-500/70 bg-white w-full" placeholder="Add Description" />
                        <div className="flex gap-5 mt-5">
                            <button type="submit" className="py-2.5 cursor-pointer px-6 bg-blue-600 text-white rounded-lg">{editTask ? "Edit Task" : "Add Task"}</button>
                            <button type="button" onClick={closeModal} className="py-2.5 cursor-pointer px-6 bg-red-600 text-white rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
        </div>
    );
};

export default TaskForm;
