import AuthForm from '@/components/AuthForm'
import Image from 'next/image'

const Page = () => {
  return (
    <section className="flex justify-center -mt-10 size-full rounded-3xl max-sm:px-6">
      
       <Image
    src="/sign.webp"
    alt="signin"
    className="hidden h-[560px] w-[560px] m-20 rounded-3xl md:block"
    layout="responsive" // Use intrinsic layout to manage dimensions through the CSS
    height={560} // These values are optional but can help with preloading
    width={560}
  />
  
      <div className='flex flex-col items-center justify-center gap-3 m-20'>
        <div className='flex justify-center mt-2'>
        <Image src={'/logobat.webp'} width={150} height={150} alt='logo'/>
        </div>
        <div className='flex justify-center'>
      <AuthForm />
      </div>
      </div>
    </section>
  )
}

export default Page