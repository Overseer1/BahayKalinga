import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const FrontLayout = () => {
  return (
    <div>
      <header className="sticky top-0">
        <NavBar />
      </header>
      <main className="min-h-[calc(100vh-144px)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default FrontLayout;
