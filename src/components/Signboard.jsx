import { Text } from "@react-three/drei";

export default function Signboard({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  walkTarget = position,
  text = "Projects",
  onClick,
}) {
  return (
    <group
  position={position}
  rotation={rotation}
    onClick={(e) => {
        e.stopPropagation();
        console.log(`${text} clicked`);
        if (onClick) onClick(walkTarget);
    }}
    >
      {/* Pole */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#6b4f2a" />
      </mesh>

      {/* Board */}
      <mesh
  position={[0, 3, 0]}
  onClick={(e) => {
    e.stopPropagation();
    console.log("Board clicked");
    if (onClick) onClick(position);
  }}
>
        <boxGeometry args={[2.5, 1, 0.2]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {/* Text */}
      <Text
        position={[0, 3, 0.12]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}