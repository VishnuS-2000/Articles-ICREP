import {useState,useContext} from "react"
import { AuthorContext } from "../CurrentProvider"

import { FormControl,FormLabel,Input,Select, FormHelperText, FormErrorMessage,InputRightElement,InputGroup } from "@chakra-ui/react"
import { useCurrent } from "../useCurrent"
import dynamic from 'next/dynamic'
import { useEffect } from "react"
import axios from "../../../axios"
const RichTextEditor= dynamic(() => import('@mantine/rte'), { ssr: false });

export const EditArticle=()=>{
    const {current}=useCurrent()


    const [topics,setTopics]=useState([])
    const [authors,setAuthors]=useState([])
    const [createTopic,setCreateTopic]=useState()




    const [text,setText]=useState()
    
    const [article,setArticle]=useState({
        title:current?.article?.title,
        topic:current?.article?.topic,
        author:current?.article?.author,
        content:current?.article?.content
    })

    const [errorFields,setErrorFields]=useState([false,false,false,false,false])
   
    const [changes,setChanges]=useState({
       title:null,
       topic:null,
       author:null,
       content:null
    })

    
    useEffect(()=>{

        const fetchAuthors=async()=>{

            const response=await axios.get('/article/authors')
            
            if(response){
                setAuthors(response?.data?.result?.rows)
           }
        } 

        const fetchTopics=async()=>{

            const response=await axios.get('/article/topics')

            if(response){
                setTopics(response?.data?.result?.rows)
            }
        }

        fetchTopics()
        fetchAuthors()
    })


    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(account)
        alert('submitted')
    }








return <div className="flex flex-col py-4 h-full space-y-1 ">
  


<form className="flex flex-col  py-4 w-full space-y-1  " onSubmit={handleSubmit} >

<div className="flex w-full justify-between">
<h1 className="text-lg font-[600] ">Edit Article</h1>
<button type="submit" className={`py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >Save</button>
</div>


<div className="flex space-x-3">


<FormControl isRequired="true" isInvalid={errorFields[0]} className="relative">
    <FormLabel className="text-secondary">Title</FormLabel>
        <InputGroup>
        <InputRightElement children={changes?.title?<div className="flex mr-3 items-center">
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

            </button>} />
            <Input variant="filled"  disabled={changes?.title?false:true} value={changes?.title?changes?.title:article?.title} onChange={({target})=>{setChanges({...article,title:target.value})}}/>

            </InputGroup>
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
]} value={text} onChange={setText} className='w-full sticky h-full overflow-y-auto text-lg border border-2 border-black'/>



</div>
}