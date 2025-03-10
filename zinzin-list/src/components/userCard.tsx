import { memo, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@/types/user";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type UserCardProps = {
  user: User;
  onDeleteUser: (userEmail: string) => void;
};

const UserCard = memo(({ user, onDeleteUser }: UserCardProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast(`${user.name.first} va faire une pause café permanente ? 🤔`, {
      action: {
        label: "Tchao ! 👋",
        onClick: () => onDeleteUser(user.email),
      },
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card 
          onClick={() => setOpen(true)}
          className="group cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
        >
          <CardHeader className="p-4 flex flex-row items-center gap-4">
            <img
              src={user.picture.large}
              alt={user.name.first}
              className="w-12 h-12 rounded-lg grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="flex-1">
              <CardTitle className="text-base font-normal">
                {user.name.first} {user.name.last}
              </CardTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                {user.email}
              </p>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6 z-50">
              <div className="relative">
                <Dialog.Close className="absolute right-0 top-0">
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                </Dialog.Close>
                
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={user.picture.large}
                    alt={user.name.first}
                    className="w-16 h-16 rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div>
                    <h2 className="text-xl font-medium">
                      {user.name.first} {user.name.last}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Zinzin professionnel 🎯
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm">📧 {user.email}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm">📱 {user.phone}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm">🌍 {user.location.city}, {user.location.country}</p>
                  </div>

                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="w-full mt-4 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    Dire ciao à {user.name.first} ! 👋
                  </Button>
                </div>
              </div>
            </Dialog.Content>
          </motion.div>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
});

export default UserCard;
