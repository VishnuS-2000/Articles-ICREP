import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
export const FilterBar=()=>{


    const filterOptions=[{title:'Publication Type',fields:['Articles','Books','Others']},{title:'Author',fields:['Student','Faculty','Others']}]

    return <div className="hidden tablet:flex flex-col w-[450px] py-12 px-8 border border-1 border-gray-200 h-screen">
            <h1 className="text-lg font-[600] ">Filter Results</h1>
             <div className="flex flex-col space-y-5 text-justify">

                {filterOptions?.map((filter)=>{


                    return <div className="text-base py-5 font-[500]">
                            <h1>{filter?.title}</h1>
                            
                    
                    <div className='flex flex-col space-y-2 py-5 '>
                    {filter?.fields?.map((element)=>{

                            return <div className="flex space-x-5 text-gray-500">
                            <Checkbox className=''/>
                            <p>{element}</p>
                        </div>

                    })

                    }
                    </div>

                    </div>



                })}




            </div>
    </div>


}