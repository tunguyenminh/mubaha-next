import Image from 'next/image'
export default function LoginSocail() {
  return (
    <>
      <div className=" d-flex justify-content-center">
      <div className='ml-2'>
        <Image src='/assets/icon/Facebook-01-01.png' width='40' height='40' alt="Mubaha" />
        </div>
        <div className='ml-2'>
        <Image src='/assets/icon/Google-01.png' width='40' height='40' alt="Mubaha" />
        </div>
        <div className='ml-2'>
        <Image src='/assets/icon/zalo-01-01.png' width='40' height='40' alt="Mubaha" />
        </div>
      </div>
    </>
  )
}