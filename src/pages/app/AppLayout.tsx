import { Outlet } from "react-router-dom";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const AppLayout = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
        <Header />
        <main className="flex-grow overflow-y-auto">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
};

export default AppLayout;
