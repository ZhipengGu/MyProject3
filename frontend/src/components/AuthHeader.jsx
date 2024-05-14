import React from "react";

export default function AuthHeader({ isLoginForm }) {
  return (
    <div className="relative flex justify-center h-60  gradient-bg">

      <div className="absolute flex flex-col translate-y-10 z-10">
        <img
          src={isLoginForm ? "images/login.png" : "images/signup.png"}
          className="h-60 w-60 rounded-full object-cover "
        />
        <div className="text-3xl max-lg:text-2xl font-bold self-center text-sky-500 -translate-y-4">
          {isLoginForm ? "Log in" : "Sign up"}
        </div>
      </div>
    </div>
  );
}
