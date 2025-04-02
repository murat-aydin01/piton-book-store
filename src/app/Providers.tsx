"use client";

import React from "react";
import { SWRConfig } from "swr";
import fetcher from "./services/fetcher";

function Providers({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={{
    fetcher,
    
  }}>{children}</SWRConfig>;
}

export default Providers;
