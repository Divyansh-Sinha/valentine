import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import AskValentine from "./pages/AskValentine";
import RoseDay from "./pages/RoseDay";

export default function App() {
  const [currentPage, setCurrentPage] = useState("ask"); // 'ask' or 'rose'

  return (
    <>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'rose' ? (
        <RoseDay />
      ) : (
        <AskValentine />
      )}
    </>
  );
}
