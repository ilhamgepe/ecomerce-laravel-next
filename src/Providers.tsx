"use client";

import { ReactNode, useEffect, useState } from "react";
import MantineProvider from "./app/components/providers/MantineProvider";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";

const Providers = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return;
  return (
    <SessionProvider>
      <MantineProvider>
        <Notifications />
        {children}
      </MantineProvider>
    </SessionProvider>
  );
};
export default Providers;
