import UserList from "./components/userList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold my-6">📋 Liste des Utilisateurs</h1>
      <UserList />
    </div>
  );
}

export default App;
