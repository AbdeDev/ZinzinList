import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type User = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des utilisateurs...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {users.map((user, index) => (
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
      ))}
    </div>
  );
};

export default UserList;
