import { createPortal } from "react-dom";
import "../styles/PageModal.css";

export default function PageModal({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return createPortal(
    <div className="page-modal">

      <div
        className="page-overlay"
        onClick={onClose}
      />

      <div className="page-sheet">

        <button
          className="page-back"
          onClick={onClose}
        >
          ← Back
        </button>

        {children}

      </div>

    </div>,
    document.body
  );
}