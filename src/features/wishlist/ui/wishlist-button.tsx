"use client"

import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { useProfile } from "@/entities/profile"
import { useBaseWishlistId, useIsWishlisted } from "@/entities/wishlist"

import { cn } from "@/shared/lib/utils"
import { useOpenLoginModal } from "@/shared/store/login-modal.store"
import { Button } from "@/shared/ui/button"
import { bottomToast } from "@/shared/ui/toast"

import { useOpenSelectWishlistModal } from "../model/select-wishlist-modal.store"
import {
  useCreateWishlistItem,
  useDeleteWishlistItem,
} from "../model/wishlist-item.mutations"

type WishlistButtonProps = {
  guesthouseId: string
  type?: "card" | "page"
}

export function WishlistButton({
  guesthouseId,
  type = "card",
}: WishlistButtonProps) {
  const openLoginModal = useOpenLoginModal()
  const openSelectWishlistModal = useOpenSelectWishlistModal()

  const { data: profile } = useProfile()
  const { data: wishlisted } = useIsWishlisted({ guesthouseId })
  const { data: baseWishlistId } = useBaseWishlistId()

  const { mutate: addToWishlist, isPending: isAdding } = useCreateWishlistItem()
  const { mutate: removeFromWishlist, isPending: isRemoving } =
    useDeleteWishlistItem()

  const isPending = isAdding || isRemoving

  const handleToggle = () => {
    if (!profile) {
      openLoginModal()
      return
    }

    if (!baseWishlistId) {
      bottomToast.add({
        type: "warning",
        description: "잠시 후 다시 시도해주세요",
        priority: "high",
      })
      return
    }

    if (wishlisted) {
      removeFromWishlist(
        { guesthouseId },
        {
          onError: (error) => {
            bottomToast.add({
              type: "error",
              description: error.message,
              priority: "high",
            })
          },
        }
      )
    } else {
      addToWishlist(
        {
          guesthouseId,
          wishlistId: baseWishlistId,
        },
        {
          onSuccess: (data) => {
            const toast = bottomToast.add({
              type: "wishlist",
              title: "기본 위시리스트에 담았어요",
              actionProps: {
                children: "변경",
                onClick() {
                  bottomToast.close(toast)
                  openSelectWishlistModal({ wishlistItemId: data.id })
                },
              },
            })
          },
          onError: (error) => {
            bottomToast.add({
              type: "error",
              description: error.message,
              priority: "high",
            })
          },
        }
      )
    }
  }

  return (
    <Button
      type="button"
      variant={type === "card" ? "link" : "outline"}
      size={type === "card" ? "icon-sm" : "icon"}
      onClick={handleToggle}
      disabled={isPending}
      aria-label={wishlisted ? "위시리스트에서 제거" : "위시리스트에 추가"}
    >
      <HugeiconsIcon
        icon={FavouriteIcon}
        strokeWidth={1.75}
        aria-hidden
        className={cn(
          type === "card" &&
            "size-6 fill-muted-foreground/50 text-background drop-shadow-lg",
          wishlisted && "fill-destructive text-destructive"
        )}
      />
    </Button>
  )
}
