import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate =
    useNavigate();

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>QuizBase</h2>

      <div>
        <button
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            navigate(
              "/create-exam"
            )
          }
        >
          Create Exam
        </button>

        <button
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;