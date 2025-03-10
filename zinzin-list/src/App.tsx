import { useState, useEffect } from "react";
import ThemeToggle from "./components/theme";
import UserList from "./components/userList";
import Loader from "./components/loader";
import { motion } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100"
    >
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.h1 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-lg font-medium"
          >
            ✨ Gestion des Zinzins
          </motion.h1>
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </header>
      <UserList />
    </motion.div>
  );
}

export default App;