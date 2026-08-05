import { Sky } from "three/examples/jsm/objects/Sky.js";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import HomeIsland from "../components/islands/HomeIsland";
import AboutIsland from "../components/islands/AboutIsland";
import ProjectsIsland from "../components/islands/ProjectsIsland";
import ExperienceIsland from "../components/islands/ExperienceIsland";
import ContactIsland from "../components/islands/ContactIsland";
import CameraController from "../components/CameraController";
import Plane from "../components/vehicles/Plane";
import CharacterController from "../components/CharacterController";
import Signboard from "../components/Signboard";
import { useState } from "react";

//cards 
import aboutCards from "../data/aboutCards";
import projectCards from "../data/projectCards";
import experienceCards from "../data/experienceCards";
import contactCards from "../data/contactCards";
// screens
import InfoScreens from "../components/InfoScreens";

export default function Scene({
  selectedPage,
  setSelectedPage,
}) {
  const { scene } = useThree();
  const waterRef = useRef();
  const [target, setTarget] = useState(null);
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [currentIsland, setCurrentIsland] = useState("Home");
  const [cameraDestination, setCameraDestination] = useState(null);
  const [characterPosition, setCharacterPosition] = useState([-3, 6.4, 0]);// [0, 48, 140]
  const [characterRotation, setCharacterRotation] = useState([0, Math.PI, 0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const planeRef = useRef();
  const skyRef = useRef();

  const [intro, setIntro] = useState(true);
  const [planePosition, setPlanePosition] = useState([0, 50, 140]);
  
  const [showCharacter, setShowCharacter] = useState(true);// falose to true
  const [isFalling, setIsFalling] = useState(false);
  const [parachuteOpen, setParachuteOpen] = useState(false);
  const characterRef = useRef();
  const [cameraMode, setCameraMode] = useState("free");// chaged this plane to free
  const sunRef = useRef(new THREE.Vector3(10, 20, -10));
 
  
  // 🌫️ Scene setup
  useEffect(() => {
    scene.background = new THREE.Color("#87ceeb");
    scene.fog = new THREE.Fog("#87ceeb", 50, 200);
  }, [scene]);

  // 🌊 Create water once
  useEffect(() => {
    const waterGeometry = new THREE.PlaneGeometry(1000, 1000);

    const waterNormals = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/waternormals.jpg"
    );

    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(0, 1, 0),
      sunColor: 0xffffff,
      waterColor: 0x1e90ff,
      distortionScale: 3.5,
      fog: true,
    });

    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.5;

    scene.add(water);
    const sky = new Sky();
    sky.scale.setScalar(450000);

    scene.add(sky);
    skyRef.current = sky;
    const uniforms = sky.material.uniforms;
    const sun = new THREE.Vector3();

    uniforms["turbidity"].value = 10;
    uniforms["rayleigh"].value = 2;
    uniforms["mieCoefficient"].value = 0.005;
    uniforms["mieDirectionalG"].value = 0.8;
    const phi = THREE.MathUtils.degToRad(90 - 10);
    const theta = THREE.MathUtils.degToRad(180);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);
    waterRef.current = water;

    return () => {
      scene.remove(water);
       scene.remove(sky);
      waterGeometry.dispose();
    };
  }, [scene]);

  // 🌊 Animate water
  useFrame((state, delta) => {

    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += delta;
    }
//  Animate sky
    const t = state.clock.elapsedTime * 0.02;

if (skyRef.current) {
  const phi = THREE.MathUtils.degToRad(
    90 - (30 + Math.sin(t) * 20)
  );

  const theta = THREE.MathUtils.degToRad(
    t * 180
  );

  const sun = new THREE.Vector3();

  sun.setFromSphericalCoords(1, phi, theta);

  skyRef.current.material.uniforms.sunPosition.value.copy(sun);
}

  });


  const islandDestinations = {

    Home: {
  camera: new THREE.Vector3(0, 25, 35),
  lookAt: new THREE.Vector3(0, 8, 0),
},

  About: {
    camera: new THREE.Vector3(-150, 35, 35),
    lookAt: new THREE.Vector3(-150, 15, 0),
  },

  Experience: {
    camera: new THREE.Vector3(150, 30, 35),
    lookAt: new THREE.Vector3(150, 9, 0),
  },

  Projects: {
    camera: new THREE.Vector3(0, 30, -160),
    lookAt: new THREE.Vector3(0, 5, -200),
  },

  Contact: {
    camera: new THREE.Vector3(0, 35, 190),
    lookAt: new THREE.Vector3(0, 15, 150),
  },
};
    const islandSpawns = {

      Home: {
  position: [-3, 6.4, 0],
  rotation: [0, Math.PI, 0],
},

  About: {
    position: [-138, 20, 7],
    rotation: [0, -Math.PI / 1.5, 0],
  },

  Experience: {
    position: [177, 5.2, 0],
    rotation: [0, -Math.PI / 2, 0],
  },

  Projects: {
    position: [0, 1.9, -128],
    rotation: [0.2, Math.PI, 0],
  },

  Contact: {
    position: [-8, 0.8, 130],
    rotation: [0, 0, 0],
  },
};


  return (
    <>
      {/* LIGHTING */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 5]} intensity={2.5} />

      {/* ISLAND */}
      <HomeIsland />
      
     <CameraController
  target={characterRef}
  characterPosition={characterPosition}
  planeRef={planeRef}
  mode={cameraMode}
  destination={cameraDestination}
  onTransitionComplete={() => {
    const spawn = islandSpawns[selectedIsland];

    setCharacterPosition(spawn.position);
    setCharacterRotation(spawn.rotation);

    setCurrentIsland(selectedIsland);

    setCameraMode("free");
    setTarget(null);
    setIsTransitioning(false);

  }}
/>

      {showCharacter && (
 <CharacterController
  target={target}
  characterPosition={characterPosition}
  setCharacterPosition={setCharacterPosition}
  characterRotation={characterRotation}
  setCharacterRotation={setCharacterRotation}
  cameraMode={cameraMode}
  setCameraMode={setCameraMode}
  cameraDestination={cameraDestination}
  planeRef={planeRef}
  intro={intro}
  isFalling={isFalling}
  setIsFalling={setIsFalling}
  setParachuteOpen={setParachuteOpen}
  
 
  onReachedTarget={() => {
    const destination = islandDestinations[selectedIsland];

    setIsTransitioning(true);
    setCameraDestination(destination);
    setCameraMode("transition");
    
  }}

  
   parachuteOpen={parachuteOpen}
    characterRef={characterRef}
/>
)}
      <>
  <AboutIsland />

 {currentIsland === "About" && !selectedPage && (
  <group position={[-150, 15, 8]}>
    <InfoScreens
    cards={aboutCards}
  
  setSelectedPage={setSelectedPage}
/>
  </group>
)}
</>
      <ProjectsIsland />
      {currentIsland === "Projects" && !selectedPage && (
  <group position={[0, 8, -135]}>
    <InfoScreens
      cards={projectCards}
      setSelectedPage={setSelectedPage}
    />
  </group>
)}


      <ExperienceIsland />
      {currentIsland === "Experience" && !selectedPage && (
  <group position={[177, 8, 12]}>
    <InfoScreens
      cards={experienceCards}
      setSelectedPage={setSelectedPage}
    />
  </group>
)}
      <ContactIsland />
      {currentIsland === "Contact" && !selectedPage && (
  <group position={[-8, 3, 135]}>
    <InfoScreens
      cards={contactCards}
      setSelectedPage={setSelectedPage}
    />
  </group>
)}

      <Signboard
  text="About Me"
  position={[-14, 6, 1]}
  rotation={[0, Math.PI / 2, 0]}
  walkTarget={[-12, 7, 1]}
  onClick={(position) => {
    if (isTransitioning) return;

    setTarget(position);
    setSelectedIsland("About");
  }}
/>

      <Signboard
  text="Experience"
  position={[4, 6, 2]}
  rotation={[0, -Math.PI / 2, 0]}
  walkTarget={[2, 6, 2]}
  onClick={(position) => {
  if (isTransitioning) return;

  setTarget(position);
  setSelectedIsland("Experience");
}}
/>
      <Signboard
  text="Projects"
  position={[-3, 3, -10]}
  walkTarget={[-5, 5, -8]}
  onClick={(position) => {
    setTarget(position);
    setSelectedIsland("Projects");
  }}
/>

      <Signboard
  text="Contact"
  position={[-5, 6.3, 8]}
  rotation={[0, Math.PI, 0]}
  walkTarget={[-5, 6.3, 6]}
  onClick={(position) => {
  if (isTransitioning) return;

  setTarget(position);
  setSelectedIsland("Contact");
}}

/>
{currentIsland === "About" && !selectedPage && (
  <Signboard
    text="🏠 Home"
    position={[-133, 20, 8]}     // adjust later
    walkTarget={[-140, 20, 12]}
    onClick={(position) => {
      if (isTransitioning) return;

      setTarget(position);
      setSelectedIsland("Home");
    }}
  />

)}

{currentIsland === "Experience" && !selectedPage && (
  <Signboard
    text="🏠 Home"
    position={[177, 6, 8]}    
    rotation={[0, Math.PI / 2, 0]}
    walkTarget={[177, 5.2, 5]}
    onClick={(position) => {
      if (isTransitioning) return;

      setTarget(position);
      setSelectedIsland("Home");
    }}
  />
)}

{currentIsland === "Projects" && !selectedPage && (
  <Signboard
    text="🏠 Home"
    position={[5, 2.5, -125]}   // adjust as needed
    walkTarget={[5, 2.5, -125]}
    onClick={(position) => {
      if (isTransitioning) return;

      setTarget(position);
      setSelectedIsland("Home");
    }}
  />
)}

{currentIsland === "Contact" && !selectedPage && (
  <Signboard
    text="🏠 Home"
    position={[-1, -1, 130]} 
    rotation={[0, Math.PI / 1, 0]}  
    walkTarget={[-8, 0.8, 135]}
    onClick={(position) => {
      if (isTransitioning) return;

      setTarget(position);
      setSelectedIsland("Home");
    }}
  />
)}
      {/* plane 
    <Plane
  planeRef={planeRef}
  position={planePosition}
  onDrop={(planePosition) => {
  console.log("DROP CALLED");


    setCharacterPosition([
  -3,              // center X
  planePosition.y - 2,
  0,               // center Z
]);

    setShowCharacter(true);
    setIsFalling(true);

    setCameraMode("dropTransition");

    console.log("Parachute opening...");

setTimeout(() => {
  console.log("Opening parachute");
  setParachuteOpen(true);
}, 1000);
  }}
/>*/}

      {/*
      <OrbitControls
        makeDefault
        minDistance={8}
        maxDistance={10000}
        maxPolarAngle={Math.PI / 2.2}
      />
      */}
    
    </>
  );
}