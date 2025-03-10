import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type User = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (count = 10) => {
    setLoading(true);
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();
    setUsers((prevUsers) => [...prevUsers, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Barre de recherche */}
      <Input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <img src={user.picture.large} alt="User" className="w-24 h-24 rounded-full mx-auto" />
                <CardTitle className="text-center mt-2">
                  {user.name.first} {user.name.last}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-500">{user.email}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Aucun utilisateur trouvé.</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={() => fetchUsers(10)} disabled={loading}>
          {loading ? "Chargement..." : "Charger plus d'utilisateurs"}
        </Button>
      </div>
    </div>
  );
};

export default UserList;
