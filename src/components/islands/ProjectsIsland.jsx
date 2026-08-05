import Island from "../Island";

export default function ProjectsIsland() {
  return (
    <Island
      model="/models/islands/projects.glb"
      position={[0, 5, -200]}
      scale={50}
      rotation={[-0.06, Math.PI, 0]}  
    />
  );
}