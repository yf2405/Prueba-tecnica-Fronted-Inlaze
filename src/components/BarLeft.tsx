"use client";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { getMovieCategories } from "@/app/api/MovieApi";

interface categories {
  id: number;
  name: string;
}
export default function BarLeft({ setSelectedCategory }) {
  const [categories, setCategories] = useState<categories[]>([]); // Estado para almacenar las categorías
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Obtener las categorías desde la API al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getMovieCategories(); // Llamada a la API
        setCategories(data); // Guardar las categorías en el estado
      } catch (error) {
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <aside className="absolute inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-background sm:w-72">
        <div className="flex h-14 items-center gap-4 border-b px-4 sm:px-6">
          <div className="relative flex-1">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="categories">
              <AccordionTrigger className="text-base font-medium">
                Categorías
              </AccordionTrigger>
              <AccordionContent>
                <nav className="grid gap-2">
                  {error ? (
                    <p>{error}</p> // Mostrar error si ocurre
                  ) : (
                    categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)} // Actualiza la categoría seleccionada
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {category.name}
                      </button>
                    ))
                  )}
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64" />
    </div>
  );
}
