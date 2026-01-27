import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileMenu = () => {
  const user = useSelector((state: any) => state.user.userDetails);
  const [handleLogout, isLoading] = useLogout();
  const navigate = useNavigate();

  const handleProfile = () => {
    if (!user) return;

    if (user.role === "employer") {
      navigate("/employer-dashboard");
    } else if (user.role === "candidate") {
      navigate("/profile");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <Avatar className="h-10 w-10 bg-primary cursor-pointer hover:ring-2 hover:ring-teal-400 transition-all">
            {/* <AvatarImage src={user?.profileImage ?? ""} /> */}
            <AvatarFallback className="bg-primary text-white font-semibold">
              {user?.firstName?.charAt(0)?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user?.firstName ?? "User"}</p>
              <p className="text-xs text-muted-foreground">
                {user?.email ?? "no email provided..."}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfile}>
            <User className="mr-2 h-4 w-4" />
            <span>My profile</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Link to="/chats" className="flex items-center cursor-pointer">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Chats</span>
            </Link>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            <Link
              to="/saved-searches"
              className="flex items-center cursor-pointer"
            >
              <Star className="mr-2 h-4 w-4" />
              <span>Saved searches</span>
            </Link>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            <Link
              to="/application-history"
              className="flex items-center cursor-pointer"
            >
              <History className="mr-2 h-4 w-4" />
              <span>Application history</span>
            </Link>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            <Link
              to="/favorite-offers"
              className="flex items-center cursor-pointer"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Favorite offers</span>
            </Link>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-white"
            disabled={isLoading}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoading ? "Signing out..." : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;
