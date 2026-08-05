import Island from "../Island";

export default function ContactIsland() {
  return (
    <Island
      model="/models/islands/contact.glb"
      position={[0, 15, 150]}
      scale={27}
      rotation={[-0.06, Math.PI, 0]} 
    />
  );
}
