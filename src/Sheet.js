import React, { useEffect, useState } from "react";
import { BsFiletypeJson } from "react-icons/bs";
import Roster from "./Roster.js";
import { customAlphabet } from "nanoid";
const crockford32 = customAlphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ", 10);

function Sheet() {
  const [sheet, setSheet] = useState(
    JSON.parse(localStorage.getItem("sheet")) || { id: crockford32() }
  );
  localStorage.setItem("sheet", JSON.stringify(sheet));

  useEffect(() => {
    localStorage.setItem("sheet", JSON.stringify(sheet));
  }, [sheet]);

  const exportSheetToJson = (e) => {
    e.preventDefault();
    console.log("exporting");
    console.log(e);
    const data = JSON.stringify(sheet);
    const fileType = "text/json";
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = "warband-" + sheet.id + ".json";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  return (
    <div className="Sheet">
      <h2>Warband Name - {sheet.id}</h2>
      <button onClick={exportSheetToJson}>
        <BsFiletypeJson />
        export
      </button>
      <Roster />
    </div>
  );
}

export default Sheet;
