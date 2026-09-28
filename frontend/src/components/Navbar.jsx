import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        window.location.reload();
    };

    return (
        <nav className="navbar">

            <div>
                <h2>Task Manager</h2>
            </div>

            <div className="nav-right">

                <span>
                    Hi, {user?.name}
                </span>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;