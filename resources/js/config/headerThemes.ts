export type HeaderTheme =
    | 'gray'
    | 'indigo'
    | 'purple'
    |''

export const headerThemes: Record<HeaderTheme, string> = {
    gray: `
    bg-gradient-to-r
    from-gray-100 to-gray-200
    dark:from-gray-900 dark:to-gray-800
    text-gray-900 dark:text-gray-100
  `,

    indigo: `
    bg-gradient-to-r
    from-indigo-500 to-indigo-600
    dark:from-indigo-700 dark:to-indigo-800
    text-white
  `,

    purple: `
    bg-gradient-to-r
    from-purple-500 to-purple-600
    dark:from-purple-700 dark:to-purple-800
    text-white
  `,
    '': '',
}
