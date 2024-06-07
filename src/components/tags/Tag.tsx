"use client"

import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { TagCategory, TagColor } from "./types"
import { tagCategoryToTagColor, tagColorToTailwindClass } from "./colors"

// a semi generic Tag components,
// to color code various things
export function Tag({
  children,
  color: maybeColor,
  tag: maybeTag,
  size = 'base'
}: {
  children?: ReactNode
  color?: TagColor
  tag?: TagCategory
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
}) {
  const tag: TagCategory = maybeTag ? maybeTag : TagCategory.MISC
  const color: TagColor = maybeColor ? maybeColor : (tagCategoryToTagColor[tag] || TagColor.STONE)
  const tailwindClasses: string = tagColorToTailwindClass[color] || ""
  
  return (
    <span className={cn(`
      flex pt-[2px] pb-[3px] px-1
      items-center justify-center
     border
      text-xs
      rounded
      mr-2
      `,
      tailwindClasses,
      {
        'w-12': size === 'xs',
        'w-14': size === 'sm',
        'w-20': size === 'base',
        'w-24': size === 'lg',
        'w-26': size === 'xl',  
      }
      )}>{
      children
    }</span>
  )
}
