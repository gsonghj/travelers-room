import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchGuesthouse } from "@/entities/guesthouse"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guesthouseId: string }>
}): Promise<Metadata> {
  const { guesthouseId } = await params

  const guesthouse = await fetchGuesthouse({ guesthouseId })

  if (!guesthouse) notFound()

  return {
    title: guesthouse.name,
    description: guesthouse.description,
    alternates: {
      canonical: `/guesthouses/${guesthouseId}`,
    },
    openGraph: {
      title: guesthouse.name,
      description: guesthouse.description,
      images: guesthouse.images.length > 0 ? guesthouse.images : undefined,
    },
  }
}
