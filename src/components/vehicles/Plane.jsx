import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";

export default function Plane({
  position = [0, 50, 140],
  rotation = [0, Math.PI, 0],
  scale = 2,
  planeRef,
  onArrival,
  onDrop,
}) {
  const { scene } = useGLTF("/models/plane/plane.glb");

  // Clone only once
  const plane = useMemo(() => scene.clone(true), [scene]);

 const localPlaneRef = useRef();
 const activeRef = planeRef || localPlaneRef;
 const hasDropped = useRef(false);
 const STOP_Z = -600;

  // Find the propeller inside the cloned plane
  const propeller = useMemo(() => {
    return (
      plane.getObjectByName("Propeller") ||
      plane.getObjectByName("Propeller_Plane_0")
    );
  }, [plane]);

  useFrame((state, delta) => {
  if (!activeRef.current) return;

  // Plane movement
 // Move plane
if (activeRef.current.position.z > STOP_Z) {
  activeRef.current.position.z -= 0.4;
}

// Floating animation
activeRef.current.position.y =
  position[1] + Math.sin(state.clock.elapsedTime * 2) * 1.5;

// Drop check
if (
  !hasDropped.current &&
  activeRef.current.position.z <= 35
) {
  hasDropped.current = true;

  onDrop?.(activeRef.current.position.clone());
}

// Spin propeller
if (propeller) {
  propeller.rotation.y += delta * 30;
}
});


  return (
    <primitive
      ref={activeRef}
      object={plane}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}