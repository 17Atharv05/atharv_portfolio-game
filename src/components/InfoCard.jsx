import { Html } from "@react-three/drei";

export default function InfoCard({
  title,
  id,
  position,
  rotation = [0,0,0],
  content,
  theme,
  setSelectedPage,
}) {
  return (
    <group
      position={position}
      rotation={rotation}
    >
      <Html transform>
        <div
  className={`info-screen ${
  theme === "city"
    ? "city-theme"
    : theme === "office"
    ? "office-theme"
    : theme === "mail"
    ? "mail-theme"
    : ""
}`}
          onClick={() => {
  setSelectedPage(content);
}}
        >
         {theme === "camp" ? (

  <div className="paper">
    <div className="pin"></div>
    <h2>{title}</h2>
    <p>Click to Open</p>
  </div>

) : theme === "city" ? (

  <div className="city-board">
    <div className="city-header">{title}</div>
    <div className="city-body">Click to Open</div>
  </div>

) : theme === "office" ? (

  <div className="harbor-board">
    <div className="harbor-header">{title}</div>
    <div className="harbor-body">Click to Open</div>
  </div>

) : theme === "mail" ? (

  <div className="mail-board">

    <div className="mail-flap"></div>

    <div className="mail-title">
      {title}
    </div>

    <div className="mail-body">
      Click to Open
    </div>

  </div>

) : null}
        </div>
      </Html>
      
    </group>
  );
}