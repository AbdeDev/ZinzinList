import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@/types/user";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";

type UserCardProps = {
  user: User;
  onSelectUser: (user: User) => void;
  onDeleteUser: (userEmail: string) => void;
};

const UserCard = memo(({ user, onSelectUser, onDeleteUser }: UserCardProps) => {
  const handleDelete = () => {
    toast(
      `Voulez-vous vraiment supprimer ${user.name.first} ${user.name.last} ?`,
      {
        action: {
          label: "Confirmer",
          onClick: () => onDeleteUser(user.email),
        },
      }
    );
  };

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

        {/* Bouton de suppression */}
        <div className="flex justify-center mt-2">
          <Button onClick={handleDelete} variant="destructive" className="flex items-center gap-2">
            <Trash className="w-4 h-4" /> Supprimer
          </Button>
        </div>

        {/* Drawer (Panneau latéral) */}
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
