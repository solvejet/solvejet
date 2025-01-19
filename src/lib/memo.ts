// src/lib/memo.ts
import {
  memo as reactMemo,
  type ComponentType,
  type MemoExoticComponent,
} from 'react'

type ComponentProps<T> = T extends ComponentType<infer P> ? P : never

/**
 * A typed wrapper around React.memo that preserves component types and handles display names
 * @param Component - The component to memoize
 * @param displayName - Optional display name for the memoized component
 */
export function memo<T extends ComponentType<ComponentProps<T>>>(
  Component: T,
  displayName?: string
): MemoExoticComponent<T> {
  const MemoizedComponent = reactMemo(Component) as MemoExoticComponent<T>

  if (displayName) {
    MemoizedComponent.displayName = displayName
  } else if (Component.displayName) {
    MemoizedComponent.displayName = `Memo(${Component.displayName})`
  } else if (Component.name) {
    MemoizedComponent.displayName = `Memo(${Component.name})`
  }

  return MemoizedComponent
}
