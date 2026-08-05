import Island from "../Island";

export default function AboutIsland() {
  return (
    <Island
      model="/models/islands/about.glb"
      position={[-150, 15, 0]}
      scale={50}
    />
  );
}