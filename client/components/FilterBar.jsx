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
            const response=await axios.get('/article/types')

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

    console.log(query)

    
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



    console.log(url)
    




    router.push(url)

    }




    const filterOptions=[{title:'Publication Type',fields:types,name:'type',type:'radio'},{title:'Author',fields:['student','faculty','others'],name:'designation'}]

    return <div className="hidden tablet:flex flex-col w-[300px] py-12 px-8 border bg-white border-1 border-gray-200 h-screen">
            <h1 className="text-sm font-[600] ">Filter Results</h1>
             <div className="flex flex-col space-y-5 text-justify">

                {filterOptions?.map((filter,index)=>{


                    return <div key={index} className="text-sm py-5 font-[500]">
                            <h1>{filter?.title}</h1>
                            
                    
                    <div className='flex flex-col space-y-2 py-5 '>
                    {filter?.fields?.map((element)=>{

                            return <div className="flex space-x-5 text-gray-500">
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