import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

type User = {
  name: { first: string; last: string };
  email: string;
  phone: string;
  location: { city: string; country: string };
  picture: { large: string };
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://randomuser.me/api/?results=10");
  const data = await response.json();
  return data.results;
};

const UserList = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Utilisation de TanStack Query pour la gesition des users
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  const filteredUsers = users
    ? users.filter((user) =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="shadow-lg p-4">
                <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </Card>
            ))
          : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <Drawer key={index}>
                  <DrawerTrigger asChild>
                    <Card
                      className="shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                      onClick={() => setSelectedUser(user)}
                    >
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
                  </DrawerTrigger>

                  <DrawerContent>
                    {selectedUser && (
                      <div className="p-6">
                        <h2 className="text-xl font-bold">{selectedUser.name.first} {selectedUser.name.last}</h2>
                        <img src={selectedUser.picture.large} alt="User" className="w-32 h-32 rounded-full my-4 mx-auto" />
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Téléphone:</strong> {selectedUser.phone}</p>
                        <p><strong>Ville:</strong> {selectedUser.location.city}, {selectedUser.location.country}</p>
                      </div>
                    )}
                  </DrawerContent>
                </Drawer>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">Aucun utilisateur trouvé.</p>
            )}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => refetch()} disabled={isLoading} variant="destructive">
          {isLoading ? "Rafraîchissement..." : "🔄 Rafraîchir la liste"}
        </Button>
      </div>
    </div>
  );
};

export default UserList;
