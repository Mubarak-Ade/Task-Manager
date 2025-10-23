import { FiSidebar } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { FaBars, FaTasks } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { motion } from "motion/react";
import { Link } from "react-router";

const SideBar = () => {
    const DashboardContent = [
        { text: "Dashboard", icon: <MdSpaceDashboard /> },
        { text: "Task", icon: <FaTasks /> },
        { text: "Settings", icon: <IoMdSettings /> },
    ];

    return (
        <aside className="min-h-screen sticky w-64" aria-label="Sidebar">
            <div className="h-full overflow-y-auto px-4 py-8 bg-zinc-200">
                <ul className="flex flex-col gap-4 mt-10 font-medium">
                    {DashboardContent.map((content, index) => (
                        <Link key={index}>
                            <motion.li
                                whileHover={{
                                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                                }}
                                key={index}
                                className="text-black flex rounded-lg items-center p-3 group"
                            >
                                <button className="shrink-0">
                                    {content.icon}
                                </button>
                                <h6 className="flex-1 ms-3">{content.text}</h6>
                            </motion.li>
                        </Link>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default SideBar;
