import Link from "next/link"
const Footer = ()=>{

    return <div className="flex flex-col  w-full   bottom-0 bg-gradient-to-r from-primary to-secondary text-white p-5 ">

   <div className="flex flex-col text-sm w-full tablet:flex-row space-y-2 tablet:space-y-0 tablet:space-x-5">
      <Link href={'/'}>
         <p>Home</p>
      </Link>
      <Link href={'/editors'}>
         <p>Editorial Board</p>
      </Link>

      <Link href={'/'}>
         <p>Contact Us</p>
      </Link>

      <Link href={'/'}>
         <p>Privacy policy</p>
      </Link>
   </div>

 <div className="text-xs tablet:text-sm py-5">
    <h1 className=' hidden desktop:flex'>
           Copyright © 2022 All Rights Reserved PROF NR MADHAVA MENON ICREP,CUSAT
        </h1>

        <h1 className=' desktop:hidden   '>
        Copyright © 2022 All Rights Reserved  ICREP,CUSAT
     </h1>
        


        <h1 className="  ">Designed, Developed & Maintained by FLEG</h1>

     </div>
        </div>
}

export default Footer