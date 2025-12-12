import React, { ReactNode } from 'react'
import { useGlobals } from '@storybook/preview-api'

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
  const [globals] = useGlobals()
  const locale = globals.locale || fallback

  switch (locale) {
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
  const [globals] = useGlobals()
  const locale = globals.locale || 'en'

  return <>{locale === 'ja' ? ja : en}</>
}

/**
 * useLocale - Hook to get current locale
 *
 * @description
 * Returns the current locale string ('en' or 'ja')
 *
 * @example
 * ```tsx
 * const locale = useLocale()
 * return <p>{locale === 'ja' ? '日本語' : 'English'}</p>
 * ```
 */
export const useLocale = (): 'en' | 'ja' => {
  const [globals] = useGlobals()
  return (globals.locale as 'en' | 'ja') || 'en'
}

export default LocalizedDoc
