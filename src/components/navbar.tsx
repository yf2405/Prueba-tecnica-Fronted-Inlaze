import React, { useState } from 'react';
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Modal from './Modal'; // Asegúrate de importar el modal
import { useAuthStore } from '@/app/api/UsersApi'; // Importa el store de autenticación

export default function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);

  // Obtén el usuario actual desde el estado de autenticación
  const { user } = useAuthStore();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Si el usuario está logueado, obtenemos la primera letra del nombre
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "JP"; // Si no hay usuario, muestra "JP" por defecto

  return (
    <>
      <header className="w-full bg-[#1E1E1E] text-white">
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#" className="flex flex-col items-center" prefetch={false}>
              <div className="text-2xl font-bold text-white">QUIKBET</div>
              <div className='flex items-center'>
                <div className="h-1 w-12 bg-[#FFDD00] mx-2" />
                <div className="text-[#FFDD00]">Movie</div>
                <div className="h-1 w-12 bg-[#FFDD00] mx-2" />
              </div>
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Popular
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Favoritos
            </Link>
          </div>
          <div className="flex items-center">
            {/* Si el usuario está autenticado, no mostramos el botón de Login */}
            {!user && (
              <button onClick={handleOpenModal} className="text-sm font-medium hover:underline underline-offset-4">
                Login / Register
              </button>
            )}

            {/* Avatar con la inicial del nombre del usuario */}
            <Avatar className="h-9 w-9 ml-4">
              <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
              <AvatarFallback>{userInitial}</AvatarFallback> {/* Aquí mostramos la inicial */}
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}