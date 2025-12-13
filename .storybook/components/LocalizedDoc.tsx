import React, { createContext, useContext } from 'react'

import type { ReactNode } from 'react'

// ════════════════════════════════════════════════════════════
// Locale Context - Safe alternative to useGlobals() for MDX
// ════════════════════════════════════════════════════════════
// useGlobals() can only be called inside decorators/story functions.
// MDX doc pages render outside that context, so we use React Context instead.
// The LocaleProvider is set up in preview.tsx decorator.

type Locale = 'en' | 'ja'

const LocaleContext = createContext<Locale>('en')

/**
 * LocaleProvider - Wraps children with locale context
 * @description Used in preview.tsx decorator to provide locale to all components
 */
export const LocaleProvider: React.FC<{ locale: Locale; children: ReactNode }> = ({
  locale,
  children,
}) => {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

/**
 * useLocale - Hook to get current locale from context
 * @description Safe to use anywhere in the component tree (including MDX)
 */
export const useLocale = (): Locale => {
  return useContext(LocaleContext)
}

/**
 * LocalizedDoc - Component for locale-aware content in MDX documentation
 *
 * @description
 * Renders different content based on the currently selected locale in Storybook.
 * Use this in MDX files to provide multilingual documentation.
 *
 * @param en - English content (ReactNode)
 * @param ja - Japanese content (ReactNode)
 * @param fallback - Optional fallback content if locale not matched (defaults to 'en')
 *
 * @example
 * ```mdx
 * import { LocalizedDoc } from '../.storybook/components/LocalizedDoc'
 *
 * <LocalizedDoc
 *   en={<p>This is the Button component.</p>}
 *   ja={<p>これはButtonコンポーネントです。</p>}
 * />
 * ```
 */
export interface LocalizedDocProps {
  en: ReactNode
  ja: ReactNode
  fallback?: 'en' | 'ja'
}

export const LocalizedDoc: React.FC<LocalizedDocProps> = ({
  en,
  ja,
  fallback = 'en',
}) => {
  const locale = useLocale()
  const effectiveLocale = locale || fallback

  switch (effectiveLocale) {
    case 'ja':
      return <>{ja}</>
    case 'en':
    default:
      return <>{en}</>
  }
}

/**
 * LocalizedText - Inline text localization helper
 *
 * @description
 * Simple inline text localization for short strings.
 *
 * @example
 * ```mdx
 * <LocalizedText en="Click here" ja="ここをクリック" />
 * ```
 */
export interface LocalizedTextProps {
  en: string
  ja: string
}

export const LocalizedText: React.FC<LocalizedTextProps> = ({ en, ja }) => {
  const locale = useLocale()

  return <>{locale === 'ja' ? ja : en}</>
}

/**
 * En - English-only content wrapper for MDX
 *
 * @description
 * Renders children only when locale is 'en'.
 * Use this in MDX files to wrap English markdown content.
 *
 * @example
 * ```mdx
 * <En>
 *
 * # English Title
 *
 * English content here with **markdown** support.
 *
 * </En>
 * ```
 */
export const En: React.FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useLocale()
  return locale === 'en' ? <>{children}</> : null
}

/**
 * Ja - Japanese-only content wrapper for MDX
 *
 * @description
 * Renders children only when locale is 'ja'.
 * Use this in MDX files to wrap Japanese markdown content.
 *
 * @example
 * ```mdx
 * <Ja>
 *
 * # 日本語タイトル
 *
 * 日本語コンテンツ（**マークダウン**対応）
 *
 * </Ja>
 * ```
 */
export const Ja: React.FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useLocale()
  return locale === 'ja' ? <>{children}</> : null
}

export default LocalizedDoc
