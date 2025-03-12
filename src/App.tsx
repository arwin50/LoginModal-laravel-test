import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [rotated, setRotated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/api/user");
        setUser(response.data);
      } catch (error: any) {
        console.error("Not authenticated", error.response?.data || error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/landing");
    }
  }, [user, navigate]);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await API.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      console.log("User registered:", response);
      setErrorMessage({});
      navigate("/landing");
    } catch (error: any) {
      setErrorMessage(error.response.data.errors); // Store all field errors
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      console.log(response.data);
      setErrorMessage({});
      navigate("/landing");
    } catch (error: any) {
      setErrorMessage(error.response.data);
      console.log(error.response.data);
    }
  };

  const changeSignUp = () => {
    setTimeout(() => {
      setIsSignUp(!isSignUp);
    }, 500);
    setEmail("");
    setName("");
    setPassword("");
    setPasswordConfirmation("");
    setErrorMessage({});
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center transition-transform duration-1000">
      <div
        className={`border w-1/4 p-4 flex flex-col items-center shadow-lg rounded-xl transition-transform duration-1000  ${
          rotated ? "rotate-360" : ""
        }`}
      >
        <div className="text-left self-start mb-4 w-full">
          <h1 className="text-3xl font-semibold mb-1">
            {isSignUp ? "Sign Up" : "Sign in"}
          </h1>
          <p className="text-gray-500 font-semibold text-sm ">
            Stay updated on Laravel updates!
          </p>
        </div>
        <form
          onSubmit={isSignUp ? handleRegister : handleLogin}
          className="h-full w-full"
        >
          <div className="space-y-2 ">
            {isSignUp && (
              <div>
                <input
                  type="text"
                  className="border w-full p-2 rounded-md"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errorMessage.name && (
                  <p className="text-xs text-red-500 ps-1">
                    {errorMessage.name[0]}
                  </p>
                )}
              </div>
            )}
            <div>
              <input
                type="email"
                className="border w-full p-2 rounded-md"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage.email && isSignUp && (
                <p className="text-xs text-red-500 ps-1">
                  {errorMessage.email[0]}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                className="border w-full p-2 rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage.password && isSignUp && (
                <p className="text-xs text-red-500 ps-1">
                  {errorMessage.password[0]}
                </p>
              )}
            </div>
            {errorMessage && !isSignUp && (
              <p className="text-xs text-red-500 ps-1">
                {errorMessage.message}
              </p>
            )}
            {isSignUp && (
              <input
                type="password"
                className="border w-full p-2 rounded-md"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            )}
          </div>

          <button
            type="submit"
            className="border w-1/2 p-2 rounded-xl bg-blue-500 cursor-pointer text-white w-full mt-2"
          >
            {isSignUp ? "Sign Up" : "Sign in"}
          </button>
        </form>
        <p className="self-start ps-1 text-xs text-gray-500">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => {
              changeSignUp();
              setRotated(!rotated);
            }}
            className="cursor-pointer font-semibold hover:text-blue-600"
          >
            {isSignUp ? "Sign in" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
