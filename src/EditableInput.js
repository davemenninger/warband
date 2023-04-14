import React, { useState } from "react";
import { BsLockFill, BsUnlockFill } from "react-icons/bs";

// https://blog.logrocket.com/build-inline-editable-ui-react/

function EditableInput({ label, text, type, placeholder, children, ...props }) {
  const [isEditing, setEditing] = useState(false);

  function EditLock({ isLocked }) {
    return (
      <div className="EditLock">
        {isEditing ? (
          <div onClick={() => setEditing(false)}>
            <BsUnlockFill />
          </div>
        ) : (
          <div onClick={() => setEditing(true)}>
            <BsLockFill />
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="EditableInput" {...props}>
      <EditLock />
      {isEditing ? (
        <div>
          {label}
          {children}
        </div>
      ) : (
        <div>
          {label}
          <span>{text || placeholder || "Editable content"}</span>
        </div>
      )}
    </section>
  );
}

export default EditableInput;
