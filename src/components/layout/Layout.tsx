import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Layout = () => {
  return (
    <>
    <Header/>
      <div className=" mt-36" >
        <main>
          <Outlet />
        </main>
      </div>
      <Footer/>
    </>
  )
}
