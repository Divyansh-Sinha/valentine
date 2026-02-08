import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import AskValentine from "./pages/AskValentine";
import RoseDay from "./pages/RoseDay";
import ProposeDay from "./pages/ProposeDay";

export default function App() {
  const [currentPage, setCurrentPage] = useState("ask"); // 'ask', 'rose', or 'propose'

  return (
    <>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "ask" && <AskValentine />}
      {currentPage === "rose" && <RoseDay />}
      {currentPage === "propose" && <ProposeDay />}
    </>
  );
}
