import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold">Chargement...</p>
    </motion.div>
  );
};

export default Loader;
