import { useState } from "react";

function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [rotated, setRotated] = useState(false);

  const changeSignUp = () => {
    setTimeout(() => {
      setIsSignUp(!isSignUp);
    }, 500);
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center transition-transform duration-1000">
      <div
        className={`border w-1/4 p-4 flex flex-col items-center shadow-lg rounded-xl transition-transform duration-1000  ${
          rotated ? "rotate-360" : ""
        }`}
      >
        <div className="text-left self-start mb-4">
          <h1 className="text-3xl font-semibold mb-1">
            {isSignUp ? "Sign Up" : "Sign in"}
          </h1>
          <p className="text-gray-500 font-semibold text-sm">
            Stay updated on laravel updates!
          </p>
        </div>
        <div className="h-full space-y-3">
          <input
            type="email"
            className="border w-full p-2 rounded-md"
            placeholder="Email"
          />
          <input
            type="password"
            className="border w-full p-2 rounded-md"
            placeholder="Password"
          />
          <button className="border w-1/2 p-2 rounded-xl bg-blue-500 cursor-pointer text-white w-full ">
            {isSignUp ? "Sign Up" : "Sign in"}
          </button>
        </div>
        <p className="self-start ps-1 text-xs text-gray-500">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => {
              changeSignUp();
              setRotated(!rotated);
            }}
            className="cursor-pointer font-semibold hover:text-blue-600"
          >
            {" "}
            {isSignUp ? "Sign in" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
