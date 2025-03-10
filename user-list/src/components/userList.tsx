import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User } from "@/types/useUsers";
import UserCard from "./userCard";
import { Drawer } from "@/components/ui/drawer";

const fetchUsers = async ({ pageParam = 1 }): Promise<User[]> => {
  const response = await fetch(`https://randomuser.me/api/?results=10&page=${pageParam}`);
  if (!response.ok) throw new Error("Problème lors du chargement des utilisateurs");
  const data = await response.json();
  return data.results;
};

const UserList = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
  });

  const users = data?.pages.flat() ?? [];

  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
  );

  // useCallback pour ne pas de recréer la fonction à chaque fois
  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
      <Input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
      />
      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{(error as Error).message}</AlertDescription>
          <Button onClick={() => refetch()} className="mt-2">🔄 Réessayer</Button>
        </Alert>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </motion.div>
            ))
          : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => <UserCard key={index} user={user} onSelectUser={handleSelectUser} />)
            ) : (
              <p className="text-center text-gray-500 col-span-3">Aucun utilisateur trouvé.</p>
            )}
      </motion.div>

      {selectedUser && (
        <Drawer open={!!selectedUser} onClose={() => setSelectedUser(null)}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
              {selectedUser.name.first} {selectedUser.name.last}
            </h2>
            <img
              src={selectedUser.picture.large}
              alt={`${selectedUser.name.first} ${selectedUser.name.last}`}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <div className="space-y-2">
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Téléphone:</strong> {selectedUser.phone}</p>
              <p><strong>Ville:</strong> {selectedUser.location.city}</p>
              <p><strong>Pays:</strong> {selectedUser.location.country}</p>
            </div>
          </div>
        </Drawer>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => refetch()} variant="destructive">
          🔄 Rafraîchir la liste
        </Button>

        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage || !hasNextPage}>
          {isFetchingNextPage ? "Chargement..." : "➕ Charger plus"}
        </Button>
      </div>
    </div>
  );
};

export default UserList;
