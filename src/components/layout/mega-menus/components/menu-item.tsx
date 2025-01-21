// src/components/layout/mega-menus/components/menu-item.tsx
import Link from 'next/link'
import { MenuItem } from '@/types/mega-menu'
import { cn } from '@/lib/utils'
import { getIconColor, getIconBgColor } from '@/lib/icon-colors'

interface MenuCardProps extends MenuItem {
  index: number
  headingLevel?: 'h2' | 'h3' | 'h4'
}

export const MenuCard = ({
  title,
  description,
  href,
  icon: Icon,
  index = 0,
  headingLevel = 'h3',
}: MenuCardProps) => {
  const Heading = headingLevel

  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent/50"
    >
      <div className={cn('rounded-lg p-2', getIconBgColor(index))}>
        <Icon className={cn('h-5 w-5', getIconColor(index))} />
      </div>

      <div className="space-y-1">
        <Heading className="text-sm font-medium text-foreground group-hover:text-primary">
          {title}
        </Heading>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
}
