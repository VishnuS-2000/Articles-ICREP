import Link from "next/link"
const Footer = ()=>{

    return <div className="flex flex-col  w-full   bottom-0 bg-gradient-to-r from-primary to-secondary text-white p-5 print:hidden ">

   <div className="flex flex-col text-xs w-full tablet:flex-row space-y-2 tablet:space-y-0 tablet:space-x-5">
      <Link href={'/'}>
         <p>Home</p>
      </Link>
      <Link href={'/editors'}>
         <p>Editorial Board</p>
      </Link>

      <Link href={'/contribute'}>
         <p>Contribute</p>
      </Link>

      <Link href={'/contact'}>
         <p>Contact Us</p>
      </Link>

      <Link href={'/gallery'}>
         <p>Gallery</p>
      </Link>

      <Link href={'/privacy'}>
         <p>Privacy Policy</p>
      </Link>
   </div>

 <div className="text-xs tablet:text-xs py-5">
    <h1 className=' hidden desktop:flex'>
           Copyright © 2023 All Rights Reserved PROF NR MADHAVA MENON ICREP,CUSAT
        </h1>

        <h1 className=' desktop:hidden   '>
        Copyright © 2023 All Rights Reserved  ICREP,CUSAT
     </h1>
        


        <h1 className="  ">Designed, Developed & Maintained by FLG</h1>

     </div>
        </div>
}

export default Footer