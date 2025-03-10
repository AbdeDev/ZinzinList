import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { User } from "@/types/useUsers";
import { motion } from "framer-motion";

type UserCardProps = {
  user: User;
  onSelectUser: (user: User) => void;
};

const UserCard = memo(({ user, onSelectUser }: UserCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Drawer>
        <DrawerTrigger asChild>
          <Card
            className="shadow-lg cursor-pointer transition-transform transform hover:scale-105 bg-white dark:bg-gray-700 dark:text-white"
            onClick={() => onSelectUser(user)}
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
          <div className="p-6 bg-white dark:bg-gray-800 dark:text-white">
            <h2 className="text-xl font-bold">{user.name.first} {user.name.last}</h2>
            <img src={user.picture.large} alt="User" className="w-32 h-32 rounded-full my-4 mx-auto" />
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Téléphone:</strong> {user.phone}</p>
            <p><strong>Ville:</strong> {user.location.city}, {user.location.country}</p>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
});

export default UserCard;
