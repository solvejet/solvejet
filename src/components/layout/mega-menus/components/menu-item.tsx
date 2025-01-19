// src/components/layout/mega-menus/components/menu-item.tsx
import Link from 'next/link'
import { MenuItem } from '@/types/mega-menu'
import { cn } from '@/lib/utils'
import { getIconColor, getIconBgColor } from '@/lib/icon-colors'

interface MenuCardProps extends MenuItem {
  index: number
}

export const MenuCard = ({
  title,
  description,
  href,
  icon: Icon,
  index = 0,
}: MenuCardProps) => {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent/50"
    >
      <div className={cn('rounded-lg p-2', getIconBgColor(index))}>
        <Icon className={cn('h-5 w-5', getIconColor(index))} />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
}
