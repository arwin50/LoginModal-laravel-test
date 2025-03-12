import { useNavigate } from "react-router-dom";
import API from "./api";

export default function LandingPage() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await API.post("/logout"); // Call the logout endpoint
      console.log("Successfully logged out");

      localStorage.removeItem("user");
      navigate("/");
    } catch (error: any) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to My Landing Page
      </h1>
      <p className="text-gray-600 mt-2">
        This is a simple and clean landing page built with React and Tailwind
        CSS.
      </p>
      <button
        onClick={logout}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
