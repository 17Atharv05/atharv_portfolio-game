
import { Html } from "@react-three/drei";
import "./ResumeBoard.css";

export default function ResumeBoard({
  position,
  rotation,
  onClick,
}) {
  return (
    <Html
  position={position}
  rotation={rotation}
  center
  distanceFactor={12}
  transform
>
      <div
        className="resume-board"
        onClick={onClick}
      >
        <div className="resume-board-icon">
          📄
        </div>

        <div>
          <div className="resume-board-title">
            VIEW RESUME
          </div>

          <div className="resume-board-subtitle">
            Open my CV
          </div>
        </div>
      </div>
    </Html>
  );
}

