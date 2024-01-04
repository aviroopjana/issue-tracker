"use client";
import { PropsWithChildren } from "react";
import {QueryClient, QueryClientProvider as ReactQueryClientProvider} from "@tanstack/react-query";

const queryclient = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryclient}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider