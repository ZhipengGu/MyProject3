import React from "react";
import SignupForm from "../components/SignupForm";
import AuthHeader from "../components/AuthHeader";

export default function SignupPage() {
  return (
    <div className="flex flex-col  w-full ">
      {/* header */}
      <AuthHeader isLoginForm={false} />
      {/* form */}

      <div className="w-3/4 mx-auto max-sm:w-full">
      <SignupForm />
      </div>
    </div>
  );
}
