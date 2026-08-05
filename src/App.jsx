import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Scene from "./scenes/Scene";
import PageModal from "./components/PageModal";

export default function App() {
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <>
      <Canvas camera={{ position: [0, 20, 60], fov: 55 }}>
        <Scene
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </Canvas>

      <PageModal
        open={selectedPage !== null}
        onClose={() => setSelectedPage(null)}
      >
        {selectedPage}
      </PageModal>
    </>
  );
}