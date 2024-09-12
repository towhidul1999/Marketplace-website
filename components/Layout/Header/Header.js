"use client";
import useUser from "@/hooks/useUser"; // Custom hook to get user info
import { usePathname } from "next/navigation"; // Hook to get the current pathname
import SecondaryNavbar from "./SecondaryNavbar";
import { useSocket } from "@/components/Context/SocketProvider"; // Custom hook for socket context
import { useEffect } from "react";
import { Navbar } from "./Navbar";

const Header = () => {
  const user = useUser(); // Get the current user
  const { socket } = useSocket(); // Get the socket instance from context
  const pathname = usePathname(); // Get the current path

  // Define paths where SecondaryNavbar should not be shown
  const pathsToExclude = ["/sign-in", "/sign-up"];
  const showSecondaryNavbar = !pathsToExclude.includes(pathname);

  useEffect(() => {
    if (user?.id && socket) {
      // Emit 'user/connect' event when the user is connected
      socket.emit("user/connect", { userId: user?.id });

      // Handle 'user/inactivate' event if needed (example: status changes)
      socket.on("user/inactivate", (status) => {
      });

      // Handle when another user connects
      socket.on("user/connect", (connectedUserId) => {

      });

      // Handle when another user disconnects
      socket.on("user/disconnect", (disconnectedUserId) => {
      });
    }

    // Cleanup on component unmount or when dependencies change
    return () => {
      if (socket) {
        // Remove socket event listeners to prevent memory leaks
        socket.off("user/inactivate");
        socket.off("user/connect");
        socket.off("user/disconnect");
      }
    };
  }, [socket, user]);

  return (
    <div>
      <Navbar />
      {showSecondaryNavbar && <SecondaryNavbar />}
    </div>
  );
};

export default Header;
