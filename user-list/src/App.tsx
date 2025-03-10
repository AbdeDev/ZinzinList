import { useState, useEffect } from "react";
import ThemeToggle from "./components/theme";
import UserList from "./components/userList";
import Loader from "./components/loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
        <ThemeToggle />
      </div>
      <UserList />
    </div>
  );
}

export default App;
