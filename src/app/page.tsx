'use client'
import Navbar from "@/components/navbar";
import RootLayout from "./layout";
import Header from "@/components/Header";
import BarLeft from "@/components/bar";
import Card from "@/components/card";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <Header />
      <main className="relative flex">
        {/* Barra lateral con posición absoluta */}
        <BarLeft setSelectedCategory={setSelectedCategory} />

        {/* Contenido principal con margen para evitar superposición */}
        <div className="w-full">
          <Card selectedCategory={selectedCategory} /> {/* PASA selectedCategory */}
        </div>
      </main>
    </>
  );
}
