import 'server-only'

interface Dictionary {
  [key: string]: () => Promise<any>;
}

const dictionaries: Dictionary = {
  en: () => import('@/app/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/app/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]()
