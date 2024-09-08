import { motion } from 'framer-motion';

export default function WelcomeMessage({ onClose }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">¡Bienvenido!</h2>
      <p className="text-center text-gray-700">Has iniciado sesión exitosamente.</p>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full"
        onClick={onClose}
      >
        Cerrar
      </button>
    </motion.div>
  );
}