import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useEffect } from "react";

export const Layout = () => {

  /**
   * @useEffect , 
   * @description : set the scroll restoration to manual if it is supported
   */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className=" max-h-screen">
      <Header />
      <div className=" mt-36" >
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
