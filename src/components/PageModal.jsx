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

      <div className="page-overlay" />

      <div className="page-layout">

        <div className="page-sheet">

          <div className="page-content">
            {children}
          </div>

          <button
            className="page-back"
            onClick={onClose}
          >
            ← Back
          </button>

        </div>

      </div>

    </div>,
    document.body
  );
}