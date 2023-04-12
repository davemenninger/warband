import React, { useEffect, useState } from "react";
import { BsFiletypeJson } from "react-icons/bs";
import EditableInput from "./EditableInput.js";
import Roster from "./Roster.js";
import { customAlphabet } from "nanoid";
const crockford32 = customAlphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ", 10);

function Sheet() {
  const [sheet, setSheet] = useState(
    JSON.parse(localStorage.getItem("sheet")) || { id: crockford32() }
  );
  localStorage.setItem("sheet", JSON.stringify(sheet));

  useEffect(() => {
    document.title =
      (sheet.name || sheet.id || "My Warband") + " - SCVMWRANGLER";
  }, [sheet]);

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
      <h2>
        <EditableInput
          style={{ display: "inline" }}
          text={sheet.name || sheet.id}
          placeholder="name this warband"
          type="input"
        >
          <input
            type="text"
            name="task"
            placeholder="name this warband"
            value={sheet.name}
            onChange={(e) => {
              setSheet({ name: e.target.value, id: sheet.id });
            }}
          />
        </EditableInput>
      </h2>
      <h3>{sheet.id}</h3>
      <Roster />
      <button onClick={exportSheetToJson}>
        <BsFiletypeJson />
        export
      </button>
    </div>
  );
}

export default Sheet;
