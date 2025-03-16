"use client";

import { ExitIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import { LogoutButton } from "@/components/auth/logout-button";
import { useCurrentUser } from "./hooks/use-current-user";
import Image from "next/image";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <Avatar className="h-4 w-4">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
          <Image 
              src="/user.png" 
              alt="user" 
              width={16} 
              height={16} 
              className="dark:hidden block"
            />
            <Image 
              src="/user-dark.png" 
              alt="user" 
              width={16} 
              height={16} 
              className="hidden dark:block"
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
