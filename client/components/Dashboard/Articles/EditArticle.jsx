import {useState,useCallback} from "react"
import { AuthorContext } from "../CurrentProvider"

import { FormControl,FormLabel,Input,Select, FormHelperText, FormErrorMessage,InputRightElement,InputGroup, Spinner,RadioGroup,Radio,Textarea } from "@chakra-ui/react"
import { useCurrent } from "../useCurrent"
import dynamic from 'next/dynamic'
import { useEffect } from "react"
import axios from "../../../axios"

import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

import useNotification from "../../../hooks/useNotification"
import moment from 'moment'


import {convert} from 'html-to-text'
import { start_date,issueData } from "../Dates";

const RichTextEditor= dynamic(async() => await import('@mantine/rte'), { ssr: false });




export const EditArticle=()=>{
    const {current}=useCurrent()


    const [types,setTypes]=useState([])
    const [authors,setAuthors]=useState([])
    const [createTopic,setCreateTopic]=useState()


    const axiosPrivate=useAxiosPrivate()

    const {notification,setNotification}=useNotification()


    const [collabrator,setCollabrator]=useState(null)
    const [collabrators,setCollabrators]=useState([])

    const [mode,setMode]=useState(current?.article?.mode)
    const [text,setText]=useState(current?.article?.richText)


    const [extras,setExtras]=useState()

    const [keywords,setKeywords]=useState(current?.article?.keywords)
    const [keyword,setKeyword]=useState('')
    
    
    const [article,setArticle]=useState({
        title:current?.article?.title,
        type:current?.article?.type,
        author:current?.article?.authorId,
        content:current?.article?.content,
        year:current?.article?.year,
        issue:current?.article?.issue,
        volume:current?.article?.volume,
        footnotes:current?.article?.footnotes,
        references:current?.article?.references

    })

    const [errorFields,setErrorFields]=useState([false,false,false,false])
   
    const [changes,setChanges]=useState({
       title:null,
       type:null,
       author:null,
       content:null,
       references:null,
       footnotes:null

    })

    const [loading,setLoading]=useState(false)


    // console.log("Article",current?.article);
    useEffect(()=>{

        const fetchAuthors=async()=>{

            const response=await axios.get('/article/authors')
            
            if(response){
                setAuthors(response?.data?.result?.rows)
           }
        } 

        const fetchTypes=async()=>{

            const response=await axios.get('/article/types')

            if(response){
                setTypes(response?.data?.result?.rows)
            }
        }

        fetchTypes()
        fetchAuthors()
    },[])

    useEffect(()=>{

    if(mode=="individual"){
        setCollabrator(current?.article?.authors[0]?.id)

    }
    else{
      const  temp=[]

        current?.article?.authors.map((author)=>{
            temp.push(author?.id)
        })

        setCollabrators(temp)

    }
    },[])


    useEffect(()=>{
        const current_date=moment()
        // console.log(issueData)
        const year_diff=current_date.diff(start_date,'year')

        var year=start_date.year()

        var total_issues=current_date.diff(start_date,'quarter')
        var remaining_issues=Math.floor(total_issues%4)


        const issues={}
        for(var i=0;i<year_diff;i++){
            
            issues[year]=issueData
            year+=1
        }   
        

        
        issues[year]=issueData.slice(0,remaining_issues)
        setExtras({years:Object.keys(issues),issues})

    },[])


    const validateFields=()=>{
        let valid=true
        if(!article?.title){
            valid=false
            setNotification({message:'Title required',status:'error',createdAt:moment()})
            setErrorFields((prev)=>{
                prev[0]=true
                return prev
            })
        }
        else if(!article?.type){
            valid=false
            setNotification({message:'Type required',status:'error',createdAt:moment()})
            setErrorFields((prev)=>{
                prev[1]=true
                return prev
            })



        }
        else if(!keywords){
            valid=false
            setNotification({message:'Keywords required',status:'error',createdAt:moment()})
        }

        else if(!text){
            valid=false
            setNotification({message:'Content required',status:'error',createdAt:moment()})


        }
        else if(!article?.year){
            valid=false
            setErrorFields((prev)=>{
                prev[2]=true
                return prev
            })
            setNotification({message:'Year required',status:'error',createdAt:moment()})
        }

        else if(!article?.issue){
            valid=false
            setErrorFields((prev)=>{
                prev[3]=true
                return prev
            })
            setNotification({message:'Issue required',status:'error',createdAt:moment()})
        }
      
        else if(!collabrators||!collabrator){
            valid=false
            setNotification({message:'Author required',status:'error',createdAt:moment()})
        }
        
        return valid
    }




    const handleSubmit =async (e)=>{
        e.preventDefault()



       if(validateFields()){

            try{
                setLoading(true)

                const content=convert(text,{
                    wordwrap:250
                })

                const response=await axiosPrivate.put(`/article/${current?.article?.id}`,{
                    title:article?.title,
                    mode:mode,
                    type:article?.type,
                    authors:mode=="individual"?[collabrator]:collabrators,
                    content:content,
                    richText:text,
                    year:article?.year,
                    issue:article?.issue,
                    volume:article?.volume,
                    keywords:keywords,
                    references:article?.references

                   }
                   )

                   if(response?.status==200){
                    setNotification({message:"Article Updated",status:'success',createdAt:moment()})
                    setLoading(false)
                    return

                   }

            }catch(err){
                console.log(err)
                setLoading(false)
                if(err?.response?.status==400){
                        setNotification({message:'Bad Request',status:'error',createdAt:moment()})
                
                }
                else{
                        setNotification({message:'Try Again Later',status:'error',createdAt:moment()})
                }
            }
        }



    }

    const handleKeywords=()=>{

        const words=keyword.split(/[-_,;]/).filter((word)=>{
            if(word && !keywords.includes(word)){
                return word
            }
        })

        setKeywords([...keywords,...words])
        setKeyword('')


    }


    const deleteKeywords=(element)=>{
        setKeywords(keywords.filter((e)=>{
                return e!==element       }))
    }


    const handleCollabrators=()=>{
        if(collabrator&&!collabrators.includes(collabrator)){
            
                setCollabrators([...collabrators,collabrator])

        }
        

    }
    const deleteCollabrator=(id)=>{


        setCollabrators(collabrators.filter((e)=>{
                return e!==id
            }))
    
    }

    const getCollabrator=useCallback((id)=>{

     return authors?.filter((e)=>{
        return e?.id===id
     })[0]
    },[authors,collabrator])


    





return <div className="flex flex-col py-4  space-y-1 ">
  


<form className="flex flex-col  py-4 w-full space-y-1  " onSubmit={handleSubmit} >

<div className="flex w-full justify-between">
<h1 className="text-lg font-[600] ">Edit Article</h1>

{loading?<button  className={`py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >
    <Spinner color="white"/>
</button>
:<button type="submit" className={`py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >Save</button>
}
</div>


<div className="flex space-x-3">


<FormControl  isInvalid={errorFields[0]} className="relative">
    <FormLabel className="text-secondary">Title</FormLabel>
        <InputGroup>
        <InputRightElement>
        {changes?.title?<div className="flex mr-3 items-center">
                <button type="button" className="text-green-600 p-1" onClick={()=>{setArticle({...article,title:changes?.title}); setChanges({...changes,title:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                </button>
                <button type="button" className="text-red-600" onClick={()=>{setChanges({...changes,title:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                </button>
            </div>:<button type="button" onClick={()=>{setChanges({...changes,title:article?.title})}} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>

            </button>}
        </InputRightElement>
            <Input variant="filled"  disabled={changes?.title?false:true} value={changes?.title?changes?.title:article?.title} onChange={({target})=>{setChanges({...article,title:target.value})}}/>

            </InputGroup>
        {errorFields[0]&&<FormErrorMessage>Title is required</FormErrorMessage>}

        </FormControl>  

        <FormControl isRequired="true" isInvalid={errorFields[1]}>
        <div  className="flex space-x-5">
        <FormLabel className="text-secondary">Publication Type
        </FormLabel>

        <div>
        <button type="button" className="ml-2 text-primary  underline" onClick={()=>setCreateTopic(!createTopic)}>{createTopic?'Existing Types':'Create Type'} ?</button>
        </div>

        </div>
        {createTopic?<Input variant="filled" value={article?.type} onChange={({target})=>setArticle({...article,type:target.value})}/>:<Select variant="filled"  value={article?.type} onChange={({target})=>{setArticle({...article,type:target.value})}}>
                <option disabled>Publication Type</option>

                {types.map((type,index)=>{
                    return <option key={index} value={type?.type}>{type?.type}</option>
                })}
            </Select>}
            {errorFields[1]&&<FormErrorMessage>Type is required</FormErrorMessage>}

            </FormControl>
        

            <FormControl>
                <FormLabel>Mode</FormLabel>
            <RadioGroup className="space-x-3" value={mode} onChange={setMode}>
                <Radio value={'individual'}>Individual</Radio>
                <Radio value={'collabrated'}>Collabrated</Radio>
            </RadioGroup>

            </FormControl>
        
</div>


<div className="flex  py-3 space-x-3">


<FormControl   isInvalid={errorFields[2]}>
        <FormLabel>Year</FormLabel>
        <Select value={article?.year} variant="filled" onChange={(e)=>{setArticle({...article,year:e.target.value,volume:extras.years.indexOf(e.target.value)+1});}}>
            {extras?.years?.map((year,index)=>{
                return <option key={index} value={year}>{year}</option>
            })}
        </Select>
        {errorFields[2]&&<FormErrorMessage>Year is required</FormErrorMessage>}

    </FormControl>


    <FormControl  isRequired={true}>
        <FormLabel>Volume</FormLabel>
        <Input value={article?.volume} variant="filled" disabled/>
    </FormControl>

    <FormControl  isInvalid={errorFields[3]}>
        <FormLabel>Issue</FormLabel>

        <Select value={article?.issue} variant="filled" onChange={(e)=>{setArticle({...article,issue:e.target.value})}}>
            {extras?.issues?.[article?.year]?.map((issue,index)=>{
                return <option key={index} value={issue}>
                        {issue}
                </option>
            })}
        </Select>
        {errorFields[3]&&<FormErrorMessage>Issue is required</FormErrorMessage>}

    </FormControl>





</div>



<FormControl>
    <FormLabel>Keywords</FormLabel>
    
    <div className="flex flex-wrap w-full py-4 space-x-3">
    {keywords.map((element,index) =>{
        return <p key={index} className="bg-slate-200 relative p-2 rounded-md ">{element}
         <button  type="button" className="font-[600] absolute top-[-5px] right-0  desktop:top-[-10px] desktop:right-[-10px]" onClick={()=>deleteKeywords(element)}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

</button>
        </p>
    })}
    </div>
    <Input value={keyword} variant="filled" onChange={(e)=>setKeyword(e.target.value)}/>                
    <button type="button" className="bg-indigo-50 my-2 p-2 rounded-md max-w-[220px]" onClick={handleKeywords}>Add Keyword</button>

</FormControl>









<div className="flex flex-col py-3 space-y-3">
                <h1 className="my-2">Authors</h1>

                
            <FormControl >
            <Select variant="filled"  value={collabrator} onChange={({target})=>{setCollabrator(target.value);}}>
                <option>Select an Author</option>
                {authors.map((author,index)=>{
                    return <option key={index} value={author?.id}>{`${author?.name}-${author?.email}`}</option>
                }
                    )}
            </Select>


            </FormControl>

            {mode=="collabrated"&&<div>
            <button type="button" className="bg-indigo-50 my-2 p-2 rounded-md max-w-[120px]" onClick={handleCollabrators}>Add Author</button>


            {collabrators.map((e,index)=>{
                const details=getCollabrator(e)
                
                return <div key={index} className="flex bg-slate-100 p-4 rounded-md justify-evenly">
                
                    <h1>{details?.name}</h1>
                    <h1>{details?.email}</h1>
                    <h1>{details?.bio}</h1>
                    
                    <button type="button" onClick={()=>deleteCollabrator(e)} className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                    </button>
                        
                </div>
                 
            })}
            </div>}

        
        

</div>


</form>

<RichTextEditor controls={[
['bold', 'italic', 'underline', 'link', 'image'],
[ 'h1', 'h2', 'h3'],
['sup', 'sub'],
['alignLeft', 'alignCenter', 'alignRight'],
]} value={text} onChange={setText} stickyOffset={-20} className='w-full  h-full  text-lg border border-2 border-black'/>


<div className="flex flex-col py-3 space-y-3">
                <h1 className="font-[500]">References</h1>
                <InputGroup>
                        <Textarea variant="filled" resize="none" rows={10} disabled={changes?.references?false:true} value={changes?.references?changes?.references:article?.references} onChange={(e)=>{setChanges({...changes,references:e.target.value})}}/>

                        <InputRightElement>
            {changes?.references?<div className="flex mr-3 items-center">
                <button type="button" className="text-green-600 p-1" onClick={()=>{setArticle({...article,references:changes?.references}); setChanges({...changes,references:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                </button>
                <button type="button" className="text-red-600" onClick={()=>{setChanges({...changes,references:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                </button>
            </div>:<button type="button" onClick={()=>{setChanges({...changes,references:article?.references})}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>

            </button>}
            </InputRightElement>
                </InputGroup>
            </div>



</div>
}