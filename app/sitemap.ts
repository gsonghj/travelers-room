import type { MetadataRoute } from "next"

import { createClient } from "@/shared/api/supabase/public"
import { SITE_URL } from "@/shared/config/site"

// ISR 주기
export const revalidate = 3600 // 1시간

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()
  const { data: guesthouses, error } = await supabase
    .from("guesthouses")
    .select("id")
    .eq("status", "APPROVED")

  if (error) throw error
  const guesthouseIds = guesthouses.map(({ id }) => id)

  return [
    {
      url: SITE_URL,
    },
    ...guesthouseIds.map((guesthouseId) => ({
      url: `${SITE_URL}/guesthouses/${guesthouseId}`,
    })),
  ]
}
