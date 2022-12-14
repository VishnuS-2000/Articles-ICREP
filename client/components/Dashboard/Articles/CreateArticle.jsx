import {useState,useCallback} from "react"
import dynamic from 'next/dynamic'
const RichTextEditor= dynamic(() => import('@mantine/rte'), { ssr: false });

import { FormControl,FormLabel,Input,Textarea,Avatar,Select, FormHelperText, FormErrorMessage, Switch,RadioGroup,Radio } from "@chakra-ui/react"
import { useEffect } from "react";
import axios from "../../../axios"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

import useNotification from "../../../hooks/useNotification";
import moment from "moment";

import { Spinner } from "@chakra-ui/react";

import {convert} from "html-to-text"


export const CreateArticle=()=>{

    
const axiosPrivate=useAxiosPrivate()

    const [text,setText]=useState()
    const [article,setArticle]=useState({
        title:null,
        topic:null,
        content:null
    })

    const [type,setType]=useState('individual')
    const [collabrator,setCollabrator]=useState(null)
    const [collabrators,setCollabrators]=useState([])
    const [authors,setAuthors]=useState([])
    const [topics,setTopics]=useState([])


    const [loading,setLoading]=useState(false)
    const {notification,setNotification}=useNotification()

    const [createTopic,setCreateTopic]=useState(true)

    const fields=['title','topic']
    const [errorFields,setErrorFields]=useState([false,false,false])


    const validateFields=()=>{
        let valid=true
        fields.map((field,index)=>{
            if(!article[field]){
                valid=false
                setErrorFields((prev)=>{
                        prev[index]=true
                        return prev
                })
                setNotification({message:`Missing Fields`,status:'error',createdAt:moment()})
            }
        })
        return valid
    }


    const handleSubmit =async (e)=>{
        e.preventDefault()

        
        console.log(article,validateFields())


        if(validateFields()){
            
        
        try{

            setLoading(true)

            const content=convert(text,{
                wordwrap:250
            })


            const response=await axiosPrivate.post('/article',{
            title:article?.title,
            type:type,
            topic:article?.topic,
            authors:collabrators?collabrators:collabrator,
            content:content,
            richText:text,

            })

            if(response?.status==200){
                setLoading(false)
                setNotification({message:`Article Created`,status:'success',createdAt:moment()})
                
            }
            

        }catch(err){
            console.log(err)
            setLoading(false)
            setNotification({message:`Internal Server Error`,status:'error',createdAt:moment()})

        }

    }
    }


    useEffect(()=>{
        const fetchAuthors=async()=>{
            const response=await axios.get('/article/authors')
  
            if(response){
                setAuthors(response?.data?.result.rows)
            }
            
            
        }

        const fetchTopics=async()=>{

            const response=await axios.get('/article/topics')

            console.log(response)
            if(response){
                setTopics(response?.data?.result.rows)
            }
        }   

        fetchAuthors()
        fetchTopics()

    },[])



    const handleCollabrators=()=>{
        if(!collabrators.includes(collabrator)){
            
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


    console.log(collabrator)



return <div className="flex flex-col py-4  space-y-1 ">
  

    <form className="flex flex-col  py-4 w-full space-y-1  " onSubmit={handleSubmit} >

    <div className="flex w-full justify-between">
    <h1 className="text-lg font-[600] ">Create Article</h1>
    
    
   

    {!loading?<button type="submit" className={`py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >Save</button>:
    <button disabled className="py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white">
<Spinner color="white"/>
        </button>
    }
    </div>
   
   
    <div className="flex space-x-3">

    
    <FormControl  isInvalid={errorFields[0]}>
        <FormLabel className="text-secondary">Title</FormLabel>
            <Input variant="filled" type="text" value={article?.title} onChange={({target})=>{setArticle({...article,title:target.value}); if(target.value && errorFields[0]){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
            {errorFields[0]&&<FormErrorMessage>Title is required</FormErrorMessage>}

            </FormControl>

            <FormControl  isInvalid={errorFields[1]}>
        <div  className="flex space-x-5">
        <FormLabel className="text-secondary">Topic
        </FormLabel>

        <div>
        <button type="button" className="ml-2 text-primary  underline" onClick={()=>setCreateTopic(!createTopic)}>{createTopic?'Existing Topics':'Create Topic'}</button>
        </div>

        </div>

            {createTopic?<Input variant="filled" value={article?.topic} onChange={({target})=>{setArticle({...article,topic:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} } }/>:<Select variant="filled"  value={article?.topic} onChange={({target})=>{setArticle({...article,topic:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} }}>
                <option disabled value={null}>Select a Topic</option>

                {topics.map((topic)=>{
                    return <option value={topic?.topic}>{topic?.topic}</option>
                })}
            </Select>}
            {errorFields[1]&&<FormErrorMessage>Topic is required</FormErrorMessage>}

            </FormControl>
                

            <FormControl>
                <FormLabel>Type</FormLabel>
            <RadioGroup className="space-x-3" value={type} onChange={setType}>
                <Radio value={'individual'}>Individual</Radio>
                <Radio value={'collabrated'}>Collabrated</Radio>
            </RadioGroup>

            </FormControl>



            </div>

            <div className="flex flex-col py-3 space-y-3">
                <h1 className="my-2">Authors</h1>

                
            <FormControl >
            <Select variant="filled"  value={collabrator} onChange={({target})=>{setCollabrator(target.value);}}>
                <option>Select an Author</option>
                {authors.map((author)=>{
                    return <option value={author?.id}>{`${author?.name}-${author?.email}`}</option>
                }
                    )}
            </Select>


            </FormControl>

            {type=="collabrated"&&<div>
            <button type="button" className="bg-indigo-50 my-2 p-2 rounded-md max-w-[120px]" onClick={handleCollabrators}>Add Author</button>


            {collabrators.map((e)=>{
                const details=getCollabrator(e)
                
                return <div className="flex bg-slate-100 p-4 rounded-md justify-evenly">
                
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
    ['unorderedList', 'h1', 'h2', 'h3'],
    ['sup', 'sub'],
    ['alignLeft', 'alignCenter', 'alignRight'],
  ]} value={text} onChange={setText} stickyOffset={10} className='w-full  text-lg border border-2 border-black'/>


    
</div>
}