
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
  } from '@chakra-ui/react'

import Link from 'next/link'
export const NewsContainer=()=>{




    return <div className="py-5 desktop:py-20  flex flex-col rounded-md bg-slate-50 w-full  w-full desktop:max-w-[20%] relative">
                <h1 className="flex px-5 items-center space-x-3  text-base desktop:text-base desktop:text-base font-[500] ">
                

                    <span>
                    News & Notifications
                        </span>
                        
                        </h1>


                        <Accordion  allowToggle className='py-5 '>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          <h1 className='text-sm text-gray-800 desktop:text-base font-[500] '>ICREP Journal</h1>
         
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} >
        <div className='text-xs desktop:text-sm'>
        <p>Current Volume : II </p>
        <p>Publication Frqeuency : Quarterly</p>
        </div>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        <h1 className='text-sm desktop:text-base text-gray-800 font-[500] '>Call for Applications</h1>
        <p className='text-xs '>Released 19-04-2023</p>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <div className='text-xs desktop:text-sm'>
        <p>Invite for applications for Volume X Issue Y</p>
        <button className='text-blue-600'>Read More...</button>
        </div>
    </AccordionPanel>
  </AccordionItem>
</Accordion>

{/* 
<Link href='/notifications'>

<button className='mx-3 text-sm font-[500] hidden desktop:flex desktop:absolute desktop:bottom-[20px] desktop:right-[20px]  flex space-x-1 items-center'>
    <span>
        All Notifications
    </span>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

    </button>
    </Link> */}

        </div>




}

