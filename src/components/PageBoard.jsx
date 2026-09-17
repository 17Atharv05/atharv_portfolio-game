
import { Html } from "@react-three/drei";
import "./PageBoard.css";

export default function PageBoard({
  position,
  rotation,
  onClick,
  title = "VIEW MY PAGE",
  subtitle = "Click to open",
})  {
  return (
    <Html
  position={position}
  rotation={rotation}
  center
  distanceFactor={12}
  transform
>
      <div
        className="page-board"
        onClick={onClick}
      >
        <div className="page-board-icon">📄</div>

        <div className="page-board-text">
          <div className="page-board-title">
  {title}
</div>

<div className="page-board-subtitle">
  {subtitle}
</div>
        </div>
      </div>
    </Html>
  );
}
