import {useState,useCallback} from "react"
import dynamic from 'next/dynamic'
const RichTextEditor= dynamic(() => import('@mantine/rte'), { ssr: false });

import { FormControl,FormLabel,Input,Textarea,Avatar,Select, FormHelperText, FormErrorMessage, Switch } from "@chakra-ui/react"
import { useEffect } from "react";
import axios from "../../../axios"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"


export const CreateArticle=()=>{

    
const axiosPrivate=useAxiosPrivate()

    const [text,setText]=useState()
    const [article,setArticle]=useState({
        title:null,
        topic:null,
        author:null,
        content:null
    })

    const [authors,setAuthors]=useState([])
    const [topics,setTopics]=useState([])

    const [createTopic,setCreateTopic]=useState(true)

    const [errorFields,setErrorFields]=useState([false,false,false])



    const handleSubmit =async (e)=>{
        e.preventDefault()

        console.log(article)

        if(!article.title||!article.topic==null||!article?.author){
            alert("Missing Fields")
            return
        }
        
        try{

            const response=await axiosPrivate.post('/articles',{
            title:article?.title,
            topic:article?.topic,
            authorId:article?.author,
            content:text,
            richText:text,

            })

            if(response?.status==200){
                alert("Article Created")
            }
            

        }catch(err){
            console.log(err)

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






return <div className="flex flex-col py-4  space-y-1 ">
  


    <form className="flex flex-col  py-4 w-full space-y-1  " onSubmit={handleSubmit} >

    <div className="flex w-full justify-between">
    <h1 className="text-lg font-[600] ">Create Article</h1>
    
    
   

    <button type="submit" className={`py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >Save</button>
    </div>
   
   
    <div className="flex space-x-3">

    
    <FormControl isRequired="true" isInvalid={errorFields[0]}>
        <FormLabel className="text-secondary">Title</FormLabel>
            <Input variant="filled" type="text" value={article?.title} onChange={({target})=>{setArticle({...article,title:target.value})}}/>
            {errorFields[0]&&<FormErrorMessage>Title is required</FormErrorMessage>}

            </FormControl>

            <FormControl isRequired="true" isInvalid={errorFields[1]}>
        <div  className="flex space-x-5">
        <FormLabel className="text-secondary">Topic
        </FormLabel>

        <div>
        <button type="button" className="ml-2 text-primary  underline" onClick={()=>setCreateTopic(!createTopic)}>{createTopic?'Existing Topics':'Create Topic'} ?</button>
        </div>

        </div>

            {createTopic?<Input variant="filled" value={article?.topic} onChange={({target})=>setArticle({...article,topic:target.value})}/>:<Select variant="filled"  value={article?.topic} onChange={({target})=>{setArticle({...article,topic:target.value})}}>
                <option disabled>Select a Topic</option>

                {topics.map((topic)=>{
                    return <option value={topic?.topic}>{topic?.topic}</option>
                })}
            </Select>}
            {errorFields[1]&&<FormErrorMessage>Topic is required</FormErrorMessage>}

            </FormControl>
        
        
            <FormControl isRequired="true" isInvalid={errorFields[2]}>
        <FormLabel className="text-secondary">Author</FormLabel>
            <Select variant="filled"  value={article?.author} onChange={({target})=>{setArticle({...article,author:target.value})}}>
                <option disabled>Select an Author</option>
                {authors.map((author)=>{
                    return <option value={author?.id}>{`${author?.name}-${author?.email}`}</option>
                }
                    )}
            </Select>
            {errorFields[2]&&<FormErrorMessage>Author is required</FormErrorMessage>}
            </FormControl>

            </div>



  

    
    </form>

    <RichTextEditor controls={[
    ['bold', 'italic', 'underline', 'link', 'image'],
    ['unorderedList', 'h1', 'h2', 'h3'],
    ['sup', 'sub'],
    ['alignLeft', 'alignCenter', 'alignRight'],
  ]} value={text} onChange={setText} className='w-full sticky h-full min-h-[450px] overflow-y-auto text-lg border border-2 border-black'/>


    
</div>
}