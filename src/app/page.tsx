"use client";

import BarLeft from "@/components/BarLeft";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="relative flex">
        {/* Barra lateral con posición absoluta */}
        <BarLeft setSelectedCategory={setSelectedCategory} />

        {/* Contenido principal con margen para evitar superposición */}
        <div className="w-full">
          <Card selectedCategory={selectedCategory} />{" "}
          {/* PASA selectedCategory */}
        </div>
      </main>
    </>
  );
}
