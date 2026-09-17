import { Html } from "@react-three/drei";
import "./InstructionBoard.css";

export default function InstructionBoard({ position, rotation }) {
  return (
    <Html
      position={position}
      rotation={rotation}
      center
      distanceFactor={12}
      transform
    >
      <div className="instruction-board">
        <div className="instruction-title">
          HOW TO EXPLORE
        </div>

        <div className="instruction-item">
          🖱️ <strong>Hold Left Click + Drag</strong>
          <span>Move the camera</span>
        </div>

        <div className="instruction-item">
          📍 <strong>Click a Board</strong>
          <span>Travel to another island</span>
        </div>
      </div>
    </Html>
  );
}