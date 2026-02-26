"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 36000,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                retry: 1
            }
        }
    }))
    return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    )
}
