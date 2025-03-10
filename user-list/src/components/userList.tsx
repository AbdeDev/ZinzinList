import { useState, useCallback } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import UserCard from "./userCard";

const fetchUsers = async ({ pageParam = 1 }): Promise<User[]> => {
  const response = await fetch(`https://randomuser.me/api/?results=10&page=${pageParam}`);
  if (!response.ok) throw new Error("Problème lors du chargement des utilisateurs");
  const data = await response.json();
  return data.results;
};

interface QueryData {
  pages: User[][];
  pageParams: number[];
}

const UserList = () => {
  const [search, setSearch] = useState("");
  const [, setSelectedUser] = useState<User | null>(null);
  
  const queryClient = useQueryClient();

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
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
  });

  const users = data?.pages.flat() ?? [];

  const deleteMutation = useMutation({
    mutationFn: async (email: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return email;
    },
    onSuccess: (email) => {
      queryClient.setQueryData<QueryData>(["users"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map(page => 
            page.filter(user => user.email !== email)
          ),
        };
      });
    },
  });

  const handleDeleteUser = useCallback((email: string) => {
    deleteMutation.mutate(email);
  }, [deleteMutation]);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
  );

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

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
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </motion.div>
          ))
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.email}
              user={user}
              onSelectUser={handleSelectUser}
              onDeleteUser={handleDeleteUser}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Aucun utilisateur trouvé.</p>
        )}
      </motion.div>

      <div ref={ref} className="h-10"></div>

      {isFetchingNextPage && (
        <div className="text-center mt-4">Chargement...</div>
      )}
    </div>
  );
};

export default UserList;
