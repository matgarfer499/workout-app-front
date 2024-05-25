import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Circle from '@/app/components/circle'

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  return (
    <main className="w-screen h-screen bg-white flex flex-col gap-1 justify-start">
      <div className="w-full h-[70%] relative">
        <Image
          src="/firstSlide.webp"
          width={500}
          height={900}
          alt="first slide image"
          className="h-full w-full object-cover"
          priority={true}
        />
        <div className="bg-gradient-to-t from-20% from-white w-full h-24 absolute bottom-0 -mb-1"></div>        
      </div>
      <div className="w-full h-[30%] px-4 pb-4 flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-2xl text-center relative mb-auto">{dict.home.epic_phrase_pt1} <br></br><span>{dict.home.epic_phrase_pt2}<div className="bg-orange-600/40 w-1/2 h-3 absolute left-1/2 transform -translate-x-1/2 bottom-0"></div></span></h1>
        <div className="flex justify-center items-center gap-4 m-auto">
          <Circle href='/' backgroundColor="bg-orange-600" />
          <Circle href={`/${params.lang}/auth`} backgroundColor="bg-gray-300" />
        </div>
        <Link href={`/${params.lang}/auth`} className="text-white text-center w-full rounded-full bg-stone-900 font-semibold text-xl py-3">{dict.home.start_btn}</Link>
      </div>
    </main>
  )
}
  