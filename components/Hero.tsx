import React from 'react'
import CustomButton from './ui/CustomButton'
import Image from 'next/image'

const Hero = () => {
  return (
    <main className='container mx-auto text-white'>
      <div className='flex flex-col lg:flex-row lg:items-center'>
        <div className='hero flex flex-col gap-8 mt-2'>
            <h1 className='text-left font-bold font-montserrat text-[3em] sm:text-center'>
                Streamline <span className='text-lightBlue '>Content</span> Management for Developers and <span className='text-lightBlue'>Clients</span>
            </h1>
            <div className='self-center cursor-pointer flex items-center gap-2 border-2 border-darkBlue px-2 py-4 hover:shadow-[0px_0px_4px_rgb(11,97,203)]'>
                <CustomButton text='Get Started For Free' classes='font-montserrat text-[1.2em]'/>
                <i className="bi bi-arrow-right-square text-[1.2em]"></i>
            </div>
        </div>
        <div className='self-center'>
            <Image src={"/content.png"} width={500} height={500} className='w-[450px] h-[425px] object-cover' alt='content'/>
        </div>
      </div>
    </main>
  )
}

export default Hero
