import {useState,useCallback} from "react"
import dynamic from 'next/dynamic'
const RichTextEditor= dynamic(() => import('@mantine/rte'), { ssr: false });

import { FormControl,FormLabel,Input,Textarea,Avatar,Select, FormHelperText, FormErrorMessage, Switch,RadioGroup,Radio, TableContainer,Table,Thead,Tr,Th, Tbody,Td } from "@chakra-ui/react"
import { useEffect } from "react";
import axios from "../../../axios"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

import useNotification from "../../../hooks/useNotification";
import moment, { invalid } from "moment";

import { Spinner } from "@chakra-ui/react";

import {convert} from "html-to-text"

import { start_date,issueData } from "../Dates";

const folderId="1tuIhE6V8kE-F6oMBvaoaSpBXbLBS82FA"
const { v4: uuidv4 } = require('uuid');

import { useRef } from "react";

export const CreateArticle=()=>{

    
const axiosPrivate=useAxiosPrivate()

    const [text,setText]=useState()
    const [article,setArticle]=useState({
        title:null,
        type:null,
        content:null,
        keywords:null,
        issue:null,
        volume:null,
        year:null,    })



    const [mode,setMode]=useState('individual')
    const [collabrator,setCollabrator]=useState(null)
    const [collabrators,setCollabrators]=useState([])
    const [authors,setAuthors]=useState([])
    const [types,setTypes]=useState([])


    const [loading,setLoading]=useState(false)
    const {notification,setNotification}=useNotification()

    const [createType,setCreateType]=useState(true)

    const fields=['title','type']
    const [errorFields,setErrorFields]=useState([false,false,false,false,false])
    const [extras,setExtras]=useState({years:[],volumes:{}})

    const [keyword,setKeyword]=useState('')
    const [keywords,setKeywords]=useState([])

    const [footNotes,setFootNotes]=useState([])
    const [footNoteFiles,setFootNoteFiles]=useState([])

    const [originalRichText,setOriginalRichText]=useState(null)
    const [footNoteLoading,setFootNoteLoading]=useState(false)



    const footNoteContainer = useRef()

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


    const handleSubmit =async(e)=>{
        e.preventDefault()

        if(validateFields()){
            
        
        try{

            setLoading(true)

            const content=convert(text,{
                wordwrap:250
            })



            const response=await axiosPrivate.post('/article',{
            title:article?.title,
            mode:mode,
            type:article?.type,
            authors:collabrators?collabrators:collabrator,
            content:content,
            richText:text,
            year:article?.year,
            issue:article?.issue,
            volume:article?.volume,
            keywords:keywords,
            footnotes:footNotes,
            references:article?.references

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

        const fetchTypes=async()=>{

            const response=await axios.get('/article/types')

            if(response){
                setTypes(response?.data?.result.rows)
            }
        }   

        fetchAuthors()
        fetchTypes()

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
        setArticle({...article,year:year,issue:issues[year][issues[year].length-1]})

    },[])


    // console.log(extras)

    useEffect(()=>{

        const fetchFootNoteFiles=async()=>{

            try{
           const response=await axios.get(`/app/folder/files/${folderId}`)
           if(response){



            // console.log(response?.data?.result?.files)
            const files=response?.data?.result?.files.filter((element)=>{

                return element.mimeType=="application/vnd.google-apps.spreadsheet"
            
            })

            // console.log(files)

            setFootNoteFiles(files)


        }
        
        }
            catch(error){
                console.log(error)
            }

        }

        fetchFootNoteFiles()
        },[])



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
    const getCollabrator=useCallback((id)=>{

     return authors?.filter((e)=>{
        return e?.id===id
     })[0]
    },[authors,collabrator])



    const handleFootNotes=async()=>{

        setFootNoteLoading(true)
        const value=footNoteContainer.current.value

        if(!value==null||value=="Select a Filename"){
            setFootNotes(null)
            return
        }
     const response= await axios.get(`/app/file/${value}`,{
            headers:{
                format:'text/csv'
            }
        })


        if(response){
        const footNotesData=response?.data?.result?.split('\r\n').map((element,index)=>{
            const data=element.split(',')
            return {serial:index+1, word:data[0],reference:data.slice(1,data?.length).join().replaceAll(`"`,''),id:uuidv4()}
        })


        setFootNotes(footNotesData)
        setFootNoteLoading(false)





        }

    

    }



    const handleFootNotesLink=()=>{ 
        var richText = text
        setOriginalRichText(text)

        if(!footNotes&&!richText){
                    return
                }

        footNotes.map((element)=>{
            richText=richText?.replace(`${element?.word}`,`<a>${element?.word}<sup>[${element?.serial}]</sup></a>`)
        
        })
        
        setText(richText)

    }

    const handleResetFootNote=()=>{
        setText(originalRichText)
        setOriginalRichText(null)
    }

return <div className="flex flex-col py-4  space-y-1 "> 
  

    <form className="flex flex-col  py-4 w-full space-y-1  " onSubmit={handleSubmit} >

    <div className="flex w-full justify-between">
    <h1 className="text-lg font-[600] ">Create Article</h1>
    
    
   

    {!loading?<button type="submit" className={`py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >Save</button>:
    <button type="button" disabled className="py-1 px-3 rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white">
<Spinner color="white"/>
        </button>
    }
    </div>
   
   
    <div className="flex space-x-3">

    
    <FormControl  isInvalid={errorFields[0]} >
        <FormLabel className="text-secondary">Title</FormLabel>
            <Input variant="filled" type="text" value={article?.title} onChange={({target})=>{setArticle({...article,title:target.value}); if(target.value && errorFields[0]){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
            {errorFields[0]&&<FormErrorMessage>Title is required</FormErrorMessage>}

            </FormControl>

            <FormControl   isInvalid={errorFields[1]} >
        <div  className="flex space-x-5">
        <FormLabel className="text-secondary">Publication Type
        </FormLabel>

        <div>
        <button type="button" className="ml-2 text-primary  underline" onClick={()=>{setCreateType(!createType); setArticle({...article,type:null})}}>{createType?'Existing Types':'Create Type'}</button>
        </div>

        </div>

            {createType?<Input variant="filled" value={article?.type} onChange={({target})=>{setArticle({...article,type:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} } }/>:<Select variant="filled"  value={article?.type} onChange={({target})=>{setArticle({...article,type:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} }}>
            <option disabled value={null}>Select a Type</option>
                {types.map((type,index)=>{
                    return <option key={index} value={type?.type} selected={index==0?'true':'false'}>{type?.type}</option>
                })}
            </Select>}
            {errorFields[1]&&<FormErrorMessage>Type is required</FormErrorMessage>}

            </FormControl>
                

            <FormControl  >
                <FormLabel>Mode</FormLabel>
            <RadioGroup className="space-x-3" value={mode} onChange={setMode}>
                <Radio value={'individual'}>Individual</Radio>
                <Radio value={'collabrated'}>Co-Authored</Radio>
            </RadioGroup>

            </FormControl>



            </div>
        



            <div className="flex  py-3 space-x-3">


            <FormControl  isInvalid={errorFields[2]} >
                    <FormLabel>Year</FormLabel>
                    
                    <Select value={article?.year} variant="filled" onChange={(e)=>{setArticle({...article,year:e.target.value,volume:extras.years.indexOf(e.target.value)+1});}}>
                    <option disabled>Select a Year</option>

                        {extras.years?.map((year,index)=>{
                            return <option key={index} value={year} selected={index==0?'true':'false'}>{year}</option>
                        })}
                    </Select>

                    {errorFields[2]&&<FormErrorMessage>Year is required</FormErrorMessage>}

                </FormControl>


                <FormControl >
                    <FormLabel>Volume</FormLabel>

                    <Input value={article?.volume} variant="filled" disabled/>

                </FormControl>

                <FormControl isInvalid={errorFields[4]} >
                    <FormLabel>Issue</FormLabel>

                    <Select value={article?.issue} variant="filled" onChange={(e)=>{setArticle({...article,issue:e.target.value})}} >
                        <option disabled>Select an Issue</option>
                        {extras?.issues?.[article?.year]?.map((issue,index)=>{
                            return <option key={index} value={issue} selected={index==0?'true':'false'}>
                                    {issue}
                            </option>
                        })}
                    </Select>
                    {errorFields[3]&&<FormErrorMessage>Issue is required</FormErrorMessage>}

                </FormControl>





            </div>

            <FormControl  >
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
                <h1 className="my-2 font-[500]">Authors</h1>

                
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
                
                return <div key={index} className="flex bg-slate-100 p-4 rounded-md justify-between">
                
                    <div className="w-[250px]">
                    <h1>{details?.name}</h1>
                    </div>
                    <div className="flex ">
                    <h1>{details?.email}</h1>
                    </div>
                    <div>
                    <h1>{details?.bio}</h1>
                    </div>
                    
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







<div className="flex flex-col py-3 space-y-3">


                <div className="flex items-center justify-between w-full">

                <h1 className="font-[500]">Footnotes</h1>

                </div>
                
                <div>
                    <Select variant="filled" rows={12} onChange={handleFootNotes} ref={footNoteContainer}>

                        <option value={null} >Select a Filename</option>
                           {footNoteFiles.map((file)=>{
                               return <option key={file?.id} value={file?.id}>{file?.name}</option>
                           })}
                        </Select>
                </div>
            </div>



{footNotes?.length>0&&<TableContainer>
    <div className="flex  space-x-3">

    <button type="button" className="bg-indigo-50 my-2 p-2 rounded-md max-w-[220px]" onClick={handleFootNotes}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${footNoteLoading&&'animate-spin'}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

    </button>
    {originalRichText?<button type="button" className="bg-indigo-50 my-2 p-2 rounded-md max-w-[220px]" onClick={handleResetFootNote}>Unlink Table</button>:<button type="button" className="bg-indigo-50 my-2 p-2 rounded-md max-w-[220px]" onClick={handleFootNotesLink}>Link Table</button>}
</div>
        <Table>
                <Thead>
                    <Tr>
                                            <Th>SlNo.</Th>
                                            <Th>Word</Th>
                                            <Th>Reference</Th>
                                        </Tr>


                </Thead>


    
                <Tbody>
                    {footNotes?.map((element, index)=>{
                        return (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{element.word}</Td>
                                <Td>{element.reference}</Td>
                            </Tr>
                        )
                    })}


                </Tbody>

        </Table>
        
    
    </TableContainer>}


    
<div className="flex flex-col py-3 space-y-3" >
                <h1 className="font-[500]">References</h1>
                <div>
                        <Textarea variant="filled" resize="none" rows={10} value={article?.references} onChange={(e)=>{setArticle({...article,references:e.target.value})}}/>
                </div>
            </div>


    
</div>
}