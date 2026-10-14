import { useEffect } from "react";

// Simple accessible popup. type: "success" | "error"
function PopupModal({ type, title, message, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal modal-${type}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icon">{type === "success" ? "✓" : "!"}</div>
        <h2 id="modal-title">{title}</h2>
        <p>{message}</p>
        <button className="primary-button" autoFocus onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default PopupModal;
