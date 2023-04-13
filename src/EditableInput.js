import React, { useState } from "react";

// https://blog.logrocket.com/build-inline-editable-ui-react/

function EditableInput({ label, text, type, placeholder, children, ...props }) {
  const [isEditing, setEditing] = useState(false);
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
  };
  return (
    <section className="EditableInput" {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
      {label}
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
      {label}
          <span>{text || placeholder || "Editable content"}</span>
        </div>
      )}
    </section>
  );
}

export default EditableInput;
