"use client"

import dynamic from "next/dynamic"

// Lazy-load the interactive bundle in the browser only
const ClientRoot = dynamic(() => import("@/components/client-root"), { ssr: false })

export default function PageClient() {
  return <ClientRoot />
}
