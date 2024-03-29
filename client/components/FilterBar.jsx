import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../axios'

export const FilterBar=({filteredData,setFilteredData})=>{
    const [activeFilters,setActiveFilters]=useState({type:[],designation:[]})
    const [types,setTypes]=useState() 

    const router=useRouter()


    useEffect(()=>{
        const fetchTypes=async()=>{
            const response=await axios.get('/publication/types')

            if(response){
                const typesData=response?.data?.result?.rows.map((row)=>{
                    return row.type
                })


                setTypes(typesData)

                    }

        }

        fetchTypes()
    },[])



    const handleChange=(element)=>{
        
        var url=router.pathname+`?`
        var query=router.query
        if(query[element?.name]){
        query[element.name]=query[element.name]?.split(',')
        if(query[element?.name].includes(element?.value)){
            query[element?.name]=query[element?.name].filter((e)=>{
                return e!=element?.value
            })
        }
        else{
            query[element?.name].push(element?.value)
        }

    }

    else{
        query[element?.name]=[element?.value]
    }


    
    Object.keys(query).map((key)=>{
        if(typeof query[key]=="object"){
            url+='&'
            url+=`${key}=${query[key].join(',')}`
        }

        else{

            if(key!='page'){
            url+='&'
            url+=`${key}=${query[key]}`
            }
        }
        

    })



    




    router.push(url)

    }




    const filterOptions=[{title:'Publication Type',fields:types,name:'type',type:'checkbox'},{title:'Author',fields:['student','faculty','others'],name:'designation',type:'radio'}]

    return <div className="hidden desktop:flex flex-col w-[320px] py-10 px-8 border bg-white border-1 border-gray-200  h-screen">
            <h1 className="text-base font-[600] ">Filter Results</h1>
             <div className="flex flex-col space-y-5 text-justify">

                {filterOptions?.map((filter,index)=>{


                    return <div key={index} className="text-sm py-5 font-[500] text-secondary">
                            <h1>{filter?.title}</h1>
                            
                    
                    <div className='flex flex-col space-y-2 py-5 '>
                    {filter?.fields?.map((element)=>{

                            return <div key={index} className="flex space-x-5 text-gray-500">       
                            
                            <Checkbox isChecked={router?.query[filter?.name]?.includes(element)} className='' onChange={()=>handleChange({name:filter?.name,value:element})}/>
                            <p>{element[0]?.toUpperCase()+element.slice(1,element?.length)}</p>
                        </div>

                    })

                    }
                    </div>

                    </div>



                })}




            </div>
    </div>


}