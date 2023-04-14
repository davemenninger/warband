import { BsLockFill, BsUnlockFill } from "react-icons/bs";

function EditLock({ isLocked, toggleLocked, children }) {
  return (
    <div className="EditLock">
      <div onClick={toggleLocked}>
        {isLocked ? <BsLockFill /> : <BsUnlockFill />}
        {children}
      </div>
    </div>
  );
}
export default EditLock;
