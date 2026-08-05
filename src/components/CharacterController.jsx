import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import Character from "./Character";
import CameraController from "./CameraController";



export default function CharacterController({
  target,
  characterPosition,
  setCharacterPosition,
  characterRotation,
  setCharacterRotation,
  onReachedTarget,
  cameraMode,
  cameraDestination,
  planeRef,
  intro,
  onTransitionComplete,
  isFalling,
  setIsFalling,
  parachuteOpen,
  setParachuteOpen,
  setCameraMode,
  characterRef,
  
}) {
  const localCharacterRef = useRef();
  const activeCharacterRef = characterRef || localCharacterRef;

  const [animation, setAnimation] = useState("Idle");

  useEffect(() => {
  if (activeCharacterRef.current) {
    activeCharacterRef.current.position.set(...characterPosition);
  }
}, []);

  useFrame(() => {
    if (!activeCharacterRef.current) return;

    // ---------------- FALLING ----------------
    if (isFalling) {
      const speed = parachuteOpen ? 0.18 : 0.35;

      activeCharacterRef.current.position.y -= speed;

      // Slight forward glide
      const targetX = -3;
      const targetZ = 0;

      activeCharacterRef.current.position.x +=
        (targetX - activeCharacterRef.current.position.x) * 0.015;

      activeCharacterRef.current.position.z +=
        (targetZ - activeCharacterRef.current.position.z) * 0.015;

      // Land on home island
      if (activeCharacterRef.current.position.y <= 6.4) {
  activeCharacterRef.current.position.set(-3, 6.4, 0);

  setParachuteOpen(false);
  setIsFalling(false);
  setCameraMode("free");

  if (animation !== "Idle") {
    setAnimation("Idle");
  }
}

      return;
    }

    // ---------------- IDLE ----------------
    //console.log("Target:", target);
    if (!target) {
      if (animation !== "Idle") {
        setAnimation("Idle");
      }
      return;
    }

    // ---------------- WALK ----------------
    const destination = new THREE.Vector3(
      target[0],
      target[1],
      target[2]
    );

    const position = activeCharacterRef.current.position;
    //console.log(position.toArray());

    const distance = position.distanceTo(destination);
  

    if (distance > 0.2) {
      if (animation !== "Walk") {
        setAnimation("Walk");
      }

      activeCharacterRef.current.lookAt(destination);

      position.lerp(destination, 0.02);
    } else {
      if (animation !== "Idle") {
        setAnimation("Idle");
      }

      if (onReachedTarget) {
        onReachedTarget();
      }
    }
  });

  return (
    <>
      <Character
  ref={activeCharacterRef}
  position={characterPosition}
  rotation={characterRotation}
  scale={2}
  animation={animation}
  parachuteOpen={parachuteOpen}
/>

    </>
  );
}