import PageMeta from "../components/common/PageMeta"
import RegisterForm from "../components/features/Auth/RegisterForm"

export const Register = () => {
  return (
    <>
      <PageMeta title="Register - Zakari Game Store" description="Register for a new account" />
      <div className=" w-full h-auto" >
        <div className=" max-w-[500px] mx-auto h-screen">
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
