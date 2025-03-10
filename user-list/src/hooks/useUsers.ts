import { useInfiniteQuery } from "@tanstack/react-query";
import { User } from "@/types/useUsers";

async function fetchUsers({ pageParam = 1 }: { pageParam: number }) {
  const response = await fetch(
    `https://api.example.com/users?page=${pageParam}&per_page=10`
  );
  return response.json();
}

export function useUsers() {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (_lastPage: User[], pages: User[][]) => {
      return pages.length + 1;
    },
  });
} 