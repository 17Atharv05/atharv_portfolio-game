
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

import Scene from "./scenes/Scene";
import PageModal from "./components/PageModal";
import PdfPage from "./components/PdfPage";

export default function App() {
  const [selectedPage, setSelectedPage] = useState(null);

  const closePage = () => {
  setSelectedPage(null);
};

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
  onClose={closePage}
>
  {selectedPage}
</PageModal>
    </>
  );
}
