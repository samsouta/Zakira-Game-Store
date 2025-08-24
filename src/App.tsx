import { Layout } from "./components/UI/Background/Layout"
import TawkToUserSync from "./lib/TawkToUserSync"
import { Router } from "./route/Router"
import Cookies from "js-cookie";

function App() {
  const Info = JSON.parse(Cookies.get("user") || "{}");
  
  return (
    <>
      <Layout><Router /></Layout>

      {/* // Live sms check Auth user  */}
      <TawkToUserSync user={Info} />
    </>
  )
}

export default App
