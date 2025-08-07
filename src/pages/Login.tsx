import PageMeta from "../components/common/PageMeta";
import { LoginForm } from "../components/features/Auth/LoginForm";

export const Login = () => {
  return (
    <>
      <PageMeta title="Login - Zakari Game Store" description="Login to your account" />
      <div className=" w-full h-auto" >
        <div className=" max-w-[500px] mx-auto h-screen">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
