
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




    return <div className="py-5 px-5 tablet:px-16 desktop:px-5 flex flex-col rounded-md bg-slate-50 w-full  w-full desktop:max-w-[30%] relative">
                <h1 className="flex px-1 items-center space-x-3  text-base desktop:text-base desktop:text-base font-[600] ">
                

                    <span>
                    News & Notifications
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 desktop:w-6 desktop:h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
</svg>
                        </h1>


                        <Accordion  allowToggle className='py-5 '>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          <h1 className='text-sm desktop:text-base font-[600] '>ICREP Journal</h1>
         
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} >
        <div className='text-xs desktop:text-sm'>
        <p>Current Issue : X</p>
        <p>Current Volume : Y </p>
        <p>Publication Frqeuency : Quarterly</p>
        </div>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        <h1 className='text-sm desktop:text-base font-[600] '>Call for Applications</h1>
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


<Link href='/notifications'>

<button className='mx-3 text-sm font-[500] hidden desktop:flex desktop:absolute desktop:bottom-[20px] desktop:right-[20px]  flex space-x-1 items-center'>
    <span>
        All Notifications
    </span>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

    </button>
    </Link>

        </div>




}

