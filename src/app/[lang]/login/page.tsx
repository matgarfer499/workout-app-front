'use client'

import { getDictionary } from '@/app/[lang]/dictionaries'
import { At, Lock, OpenEye, ClosedEye } from '@/app/lib/icons'
import Link from 'next/link'
import { useState, useEffect, ChangeEvent } from 'react'

export default async function Home({ params }: { params: { lang: string } }) {
  const [dict, setDict] = useState<any>(null)
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const dictionary = await getDictionary(params.lang);
      setDict(dictionary);
    };
    fetchData();
  }, [params.lang]);
   
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <main className="w-screen h-screen bg-white flex flex-col justify-center gap-2 p-4">
        <h1 className="font-bold text-2xl text-center relative"><span>{dict.login.title}<div className={`bg-orange-600/40 ${params.lang === 'es' ? 'left-1/3' : 'left-1/2'} w-1/3 h-3 absolute transform -translate-x-1/2 bottom-0`}></div></span>{dict.login.title_pt2}</h1>
        <div className="flex flex-col justify-center gap-2 h-full p-2">
            <div className="w-full relative">
                <At className='w-6 h-6 text-[#808080] absolute bottom-1' />
                <input type="text" className='w-full border-b-2 outline-none cursor-pointer pl-8' placeholder={dict.login.email}/>
            </div>
            <div className="w-full relative mt-4">
                <Lock className='w-6 h-6 text-[#808080] absolute bottom-1' />
                <input type={showPassword ? 'text' : 'password'} className='w-full border-b-2 outline-none cursor-pointer px-8' onChange={handlePasswordChange} placeholder={dict.login.password}/>
                {password && (
                    <button onClick={toggleShowPassword}>
                        {showPassword ? (
                            <ClosedEye className='w-6 h-6 text-[#808080] absolute bottom-1 right-0 cursor-pointer hidden' />
                        ) : (
                            <OpenEye className='w-6 h-6 text-[#808080] absolute bottom-1 right-0 cursor-pointer hidden' />
                        )}
                    </button>
                )}
            </div>
            <p className='text-start text-orange-600 text-sm'><span className="font-semibold">{dict.login.forgot}</span>{dict.login.forgot_password}</p>
        </div>
        <Link href="" className='w-full font-semibold text-xl rounded-full bg-orange-700 p-3 text-center text-gray-100'>{dict.auth.login_btn}</Link>
        <p className="text-center text-[#808080] text-sm">{dict.login.not_registered}<span className="text-orange-600 font-semibold underline">{dict.login.register}</span></p>
    </main>
  )
}
  