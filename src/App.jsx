import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import AskValentine from "./pages/AskValentine";
import RoseDay from "./pages/RoseDay";
import ProposeDay from "./pages/ProposeDay";
import ChocolateDay from "./pages/ChocolateDay";
import TeddyDay from "./pages/TeddyDay";
import PromiseDay from "./pages/PromiseDay";

export default function App() {
  const [currentPage, setCurrentPage] = useState("ask"); // 'ask', 'rose', 'propose', 'chocolate', 'teddy', 'promise'

  return (
    <>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "ask" && <AskValentine />}
      {currentPage === "rose" && <RoseDay />}
      {currentPage === "propose" && <ProposeDay />}
      {currentPage === "chocolate" && <ChocolateDay />}
      {currentPage === "teddy" && <TeddyDay />}
      {currentPage === "promise" && <PromiseDay />}
    </>
  );
}
