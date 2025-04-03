"use client";

import React from "react";
import { SWRConfig } from "swr";
import { fetcher } from "./services/api";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthWrapper from "./(auth)/components/AuthWrapper";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
      </AuthWrapper>
    </Provider>
  );
}

export default Providers;