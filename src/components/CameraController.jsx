import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraController({
  target,
  characterPosition,
  mode,
  destination,
  planeRef,
  onTransitionComplete,
  setCharacterRotation,
}) {
  const { camera, gl } = useThree();

  // Camera rotation
  const yaw = useRef(0);
  const pitch = useRef(0.35);

  // Camera distance (zoom)
  const distance = useRef(15);

  // Mouse state
  const dragging = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e) => {
  if (e.button === 0) {
    dragging.current = true;
  }
};
    const onMouseUp = () => {
      dragging.current = false;
    };

    const onMouseMove = (e) => {
  if (!dragging.current) return;

  if (
    mode !== "plane" &&
    mode !== "follow" &&
    mode !== "free"
  ) return;

  yaw.current -= e.movementX * 0.005;
  pitch.current -= e.movementY * 0.005;

  pitch.current = Math.max(-0.4, Math.min(1.2, pitch.current));
};

   const onWheel = (e) => {
  if (
  mode !== "plane" &&
  mode !== "follow" &&
  mode !== "free"
) return;

  distance.current += e.deltaY * 0.02;

  distance.current = Math.max(
    8,
    Math.min(35, distance.current)
  );
};

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("wheel", onWheel);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [gl, mode]);

  useFrame(() => {

// ---------- PLANE MODE ----------
if (mode === "plane") {
  if (!planeRef?.current) return;

  const center = planeRef.current.position.clone();
  center.y += 2;

  const x =
    Math.sin(yaw.current) *
    Math.cos(pitch.current) *
    distance.current;

  const y =
    Math.sin(pitch.current) *
    distance.current;

  const z =
    Math.cos(yaw.current) *
    Math.cos(pitch.current) *
    distance.current;

  const desired = new THREE.Vector3(
    center.x + x,
    center.y + y,
    center.z + z
  );

  camera.position.lerp(desired, 0.08);
  camera.lookAt(center);

  return;
}

// ---------- DROP TRANSITION ----------


if (mode === "dropTransition") {
  if (!target?.current) return;

  const character = target.current.position;

  camera.position.set(
  character.x,
  character.y + 8,
  character.z + 40
);

  camera.lookAt(character);

  return;
}
// ---------- ISLAND TRANSITION ----------
if (mode === "transition" && destination) {
  camera.position.lerp(destination.camera, 0.03);

  camera.lookAt(destination.lookAt);

  if (camera.position.distanceTo(destination.camera) < 1) {
    onTransitionComplete?.();
  }

  return;
}
// ---------- FOLLOW MODE ----------
if (mode === "follow" || mode === "free") {
  if (!target?.current) return;

  const center = target.current.position.clone();
  center.y += 3;

  const x =
    Math.sin(yaw.current) *
    Math.cos(pitch.current) *
    distance.current;

  const y =
    Math.sin(pitch.current) *
    distance.current;

  const z =
    Math.cos(yaw.current) *
    Math.cos(pitch.current) *
    distance.current;

  const desired = new THREE.Vector3(
    center.x + x,
    center.y + y,
    center.z + z
  );

  camera.position.lerp(desired, 0.1);
  camera.lookAt(center);

  return;
}
    
});


  return null;
}