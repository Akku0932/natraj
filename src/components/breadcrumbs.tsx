'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { useStore, type PageView } from '@/store/use-store'

interface BreadcrumbItemData {
  label: string
  page?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItemData[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const setCurrentPage = useStore((s) => s.setCurrentPage)

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border/40 bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BreadcrumbRoot className="py-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm sm:gap-2.5">
            {items.map((item, index) => {
              const isLast = index === items.length - 1

              return (
                <span key={item.label} className="contents">
                  {index > 0 && (
                    <BreadcrumbSeparator className="text-muted-foreground/50">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </BreadcrumbSeparator>
                  )}

                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-sm font-medium text-gold">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (item.page) {
                            setCurrentPage(item.page as PageView)
                          }
                        }}
                        className="text-sm text-muted-foreground transition-colors hover:text-gold"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              )
            })}
          </ol>
        </BreadcrumbRoot>
      </div>
    </motion.div>
  )
}
