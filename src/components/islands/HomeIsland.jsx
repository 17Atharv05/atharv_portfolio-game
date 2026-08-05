import Island from "../Island";

export default function HomeIsland() {
  return (
    <Island
      model="/models/islands/home.glb"
      position={[0, -1.2, 0]}
      scale={0.5}
    />
  );
}