import { useGLTF } from "@react-three/drei";

export default function Island({
  model,
  position = [0, 0, 0],
  scale = 0.25,
  rotation = [0, 0, 0],
}) {
  const { scene } = useGLTF(model);

  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}