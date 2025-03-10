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
import { Search, Sparkles } from "lucide-react";

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
  const { ref, inView } = useInView();
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
  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
  );
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              La Team des Zinzins
            </h1>
            <Button
              onClick={() => refetch()}
              variant="outline"
              size="sm"
              className="border-gray-200 dark:border-gray-800"
            >
              Rafraîchir les zinzins 🔄
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Cherche ton zinzin préféré... 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
            />
          </div>
        </motion.div>

        {isError && (
          <Alert className="mb-6 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20">
            <AlertTitle>Oups ! Les zinzins font des bêtises 🙈</AlertTitle>
            <AlertDescription>{(error as Error).message}</AlertDescription>
          </Alert>
        )}

        <motion.div
          className="space-y-3"
          layout
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.email}
                user={user}
                onDeleteUser={handleDeleteUser}
              />
            ))
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Aucun zinzin trouvé ! 🕵️‍♂️
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Ils sont peut-être partis faire une pause café collective... 
              </p>
            </motion.div>
          )}
        </motion.div>

        <div ref={ref} className="h-10" />
        
        {isFetchingNextPage && (
          <div className="text-center py-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              D'autres zinzins arrivent... 🏃‍♂️
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
