import { forwardRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import Parachute from "./Parachute";

const Character = forwardRef(function Character(
  {
    position = [0, 2.34, 0],
    rotation = [0, Math.PI, 0],
    scale = 1,
    animation = "Idle",
    parachuteOpen,
  },
  ref
) {
  const { scene, animations } = useGLTF(
    "/models/character/character.glb"
  );

  const { actions } = useAnimations(animations, scene);


  useEffect(() => {
    if (!actions) return;

    Object.values(actions).forEach((action) => {
      if (action) action.stop();
    });

    const currentAction =
      actions[animation] ||
      actions[`CharacterArmature|${animation}`];

    if (currentAction) {
      currentAction.reset();
      currentAction.fadeIn(0.3);
      currentAction.play();
    } else {
      console.warn("Animation not found:", animation);
    }

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.3);
      }
    };
  }, [actions, animation]);

  return (
    <group
  ref={ref}
  position={position}
  rotation={rotation}
  scale={scale}
>
      <primitive object={scene} />
    

  {parachuteOpen && (
  <Parachute position={[0, 1.3, 0]} />
)} 
    </group>
  );
});

useGLTF.preload("/models/character/character.glb");

export default Character;