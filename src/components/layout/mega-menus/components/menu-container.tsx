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
      delay: 0.1, // Slight delay to ensure container is visible first
    },
  },
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed left-0 right-0 top-20 z-50 w-full overflow-hidden bg-transparent shadow-[0_6px_10px_-4px_rgba(0,0,0,0.2)] backdrop-blur-md"
          onMouseLeave={onClose}
        >
          <motion.div
            variants={contentVariants}
            className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
