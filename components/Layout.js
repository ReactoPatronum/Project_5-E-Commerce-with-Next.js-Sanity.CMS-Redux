import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  const dark = useSelector((store) => store.dark.dark);
  return (
    <div
      className={`transition-all ease-out duration-200 ${
        !dark ? "bg-[#242525] text-white" : "bg-white text-black "
      }`}
    >
      <Header />
      <Toaster/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
