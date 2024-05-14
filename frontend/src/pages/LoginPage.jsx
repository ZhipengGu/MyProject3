import AuthHeader from "../components/AuthHeader";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col mx-auto w-full">
      {/* header */}
      <AuthHeader isLoginForm={true} />
      {/* form */}
      <LoginForm />
    </div>
  );
}
