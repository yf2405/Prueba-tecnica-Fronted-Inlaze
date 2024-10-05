"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginModal";
import RegisterForm from "./RegisterModal";
import WelcomeMessage from "./WelcomComponent";
import EmailVerificationPage from "./EmailVerificationPage";

export default function Modal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false); // Estado para mostrar el mensaje de bienvenida
  const [verificate, setVerifycate] = useState(false); // Pasa a verificar
  const toggleView = () => {
    setIsRegister(!isRegister);
  };

  const handleLoginSuccess = () => {
    setShowWelcome(true); // Mostrar el modal de bienvenida
  };
  const handleVerifytate = () => {
    setVerifycate(true); // Mostrar el modal de bienvenida
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 rounded shadow-lg ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-lg font-bold"
        >
          X
        </button>

        <AnimatePresence>
          {showWelcome ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WelcomeMessage
                onClose={() => {
                  setShowWelcome(false); // Cierra el mensaje de bienvenida
                  onClose(); // Cierra el modal principal
                }}
              />
            </motion.div>
          ) :  verificate ? (
            <motion.div
              key="EmailVerificationPage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <EmailVerificationPage  onLoginSuccess={handleLoginSuccess}/>
            </motion.div>) :
          isRegister ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <RegisterForm 
               toggleView={toggleView} 
               setVeryfycate={handleVerifytate}/>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LoginForm
                toggleView={toggleView}
                onLoginSuccess={handleLoginSuccess}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
