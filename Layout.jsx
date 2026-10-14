import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Same header and footer on every page
function Layout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
