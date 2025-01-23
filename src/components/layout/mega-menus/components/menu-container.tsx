// src/components/layout/mega-menus/components/menu-container.tsx
'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuContainerProps } from '@/types/mega-menu'

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.3 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed left-0 right-0 top-20 z-50 w-full overflow-hidden border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80"
          onMouseLeave={onClose}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
