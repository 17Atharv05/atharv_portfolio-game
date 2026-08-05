import { Html } from "@react-three/drei";
import { useState } from "react";
import "../styles/InfoScreens.css";
import InfoCard from "./InfoCard";


export default function InfoScreens({
  cards,
  setSelectedPage,
}) {
    
  return (
    <>
  {cards.map((card) => (
    <InfoCard
  key={card.id}
  title={card.title}
  id={card.id}
  position={card.position}
  rotation={card.rotation}
  content={card.content}
theme={card.theme}
  setSelectedPage={setSelectedPage}
  
/>
  ))}
  </>
      
  );
}