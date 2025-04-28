"use client";

import React from "react";
import { SWRConfig } from "swr";
import { fetcher } from "./services/api";
import AuthWrapper from "./(auth)/components/AuthWrapper";
import AuthProvider from "./context/AuthProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthWrapper>
        <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
      </AuthWrapper>
    </AuthProvider>
  );
}

export default Providers;
