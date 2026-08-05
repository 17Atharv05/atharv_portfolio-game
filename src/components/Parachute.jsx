import { useGLTF } from "@react-three/drei";

export default function Parachute({ position }) {
  const { scene } = useGLTF("/models/parachute/parachute.glb");

  return (
    <primitive
      object={scene}
      position={position}
      rotation={[0, Math.PI, 0]}
      scale={0.5}
    />
  );
}  
useGLTF.preload("/models/parachute/parachute.glb");