import { authOptions } from "@/libs/nextauth/authoptions";
import { Navbar as MantineNavbar } from "@mantine/core";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
const Navbar = () => {
  const { data: session, status } = useSession();
  return <MantineNavbar>{session && session.user?.name}</MantineNavbar>;
};
export default Navbar;
