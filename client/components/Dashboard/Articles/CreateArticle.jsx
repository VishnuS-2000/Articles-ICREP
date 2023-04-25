import {useState,useRef,useCallback} from "react"
import dynamic from 'next/dynamic'
import { FormControl,FormLabel,Input,InputGroup,InputRightAddon,Textarea,Avatar,Select, FormHelperText, FormErrorMessage, Switch,RadioGroup,Radio,Modal,ModalOverlay,ModalCloseButton,ModalBody,Tooltip} from "@chakra-ui/react"
import { useEffect } from "react";
import axios from "../../../axios"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

import useNotification from "../../../hooks/useNotification";
import moment, { invalid } from "moment";

import { Spinner } from "@chakra-ui/react";

import {convert} from "html-to-text"

import { start_date,issueData,periodData} from "../Dates";

const folderId="1tuIhE6V8kE-F6oMBvaoaSpBXbLBS82FA"
const { v4: uuidv4 } = require('uuid');

import RichTextEditor from "./TextEditor"

import { useDisclosure } from "@chakra-ui/react";

import { ReferencesModal } from "./Modal";
import { useQuill } from "react-quilljs";


export const CreateArticle=()=>{

const {quill,quillRef}=useQuill()

    
const axiosPrivate=useAxiosPrivate()

    const [text,setText]=useState()
    const [article,setArticle]=useState({
        title:null,
        type:null,
        content:null,
        keywords:null,
        issue:null,
        volume:null,
        year:null,
        period:null,
    })
        

    const [mode,setMode]=useState('individual')
    const [collabrator,setCollabrator]=useState(null)
    const [collabrators,setCollabrators]=useState([])
    const [authors,setAuthors]=useState([])
    const [types,setTypes]=useState([])


    const [loading,setLoading]=useState(false)
    const {notification,setNotification}=useNotification()
    const [createType,setCreateType]=useState(true)

    
    const [errorFields,setErrorFields]=useState([false,false,false,false,false])
    const [extras,setExtras]=useState({years:[],volumes:{}})

    const [keyword,setKeyword]=useState('')
    const [keywords,setKeywords]=useState([])

    const [footNotes,setFootNotes]=useState([])
    const [tableOfContents,setTableOfContents]=useState([])
     


    const [references,setReferences]=useState([])


    const [modifyPeriod,setModifyPeriod]=useState(true)
   


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

        else if(!article?.volume){
            valid=false
            setErrorFields((prev)=>{
                prev[2]=true
                return prev
            })
            setNotification({message:'Volume required',status:'error',createdAt:moment()})


        }

        
        else if(!keywords){
            valid=false
            setNotification({message:'Keywords required',status:'error',createdAt:moment()})
        }

  
        else if(!article?.year){
            valid=false
            setErrorFields((prev)=>{
                prev[3]=true
                return prev
            })
            setNotification({message:'Year required',status:'error',createdAt:moment()})
        }

        else if(!article?.issue){
            valid=false
            setErrorFields((prev)=>{
                prev[4]=true
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

            const content=JSON.stringify(quill?.getContents())
            const referencesString=JSON.stringify({raw:references})


            const response=await axiosPrivate.post('/article',{
            title:article?.title,
            mode:mode,
            type:article?.type,
            authors:collabrators?collabrators:collabrator,
            content:content,
            year:article?.year,
            issue:article?.issue,
            volume:article?.volume,
            period:article?.period,
            keywords:keywords,
            references:referencesString
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




    

return <>


 <div className="flex flex-col py-4  space-y-1 "> 
  

    <form className="flex flex-col  py-6 w-full space-y-1  " onSubmit={handleSubmit} >


   
    <div className="flex space-x-3 ">

    
    <FormControl  isInvalid={errorFields[0]} >
    <h1 className="text-secondary text-sm font-[600]">Title <span className="text-red-500">*</span></h1>
            <Input variant="filled" size="sm" type="text" value={article?.title} onChange={({target})=>{setArticle({...article,title:target.value}); if(target.value && errorFields[0]){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
            {errorFields[0]&&<FormErrorMessage>Title is required</FormErrorMessage>}

            </FormControl>

            <FormControl   isInvalid={errorFields[1]} >
        <div  className="flex space-x-5 items-center">
        <h1 className="text-secondary text-sm font-[600]">Publication type <span className="text-red-500">*</span></h1>


        <div>
        <button type="button" className="ml-2 text-primary text-sm font-[500]  underline" onClick={()=>{setCreateType(!createType); setArticle({...article,type:null})}}>{createType?'Existing Types':'Create Type'}</button>
        </div>

        </div>

            {createType?<Input variant="filled" size="sm" value={article?.type} onChange={({target})=>{setArticle({...article,type:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} } }/>:<Select size="sm" variant="filled"  value={article?.type} onChange={({target})=>{setArticle({...article,type:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} }}>
            <option disabled value={null}>Select a Type</option>
                {types.map((type,index)=>{
                    return <option key={index} value={type?.type} selected={index==0?'true':'false'}>{type?.type}</option>
                })}
            </Select>}
            {errorFields[1]&&<FormErrorMessage>Type is required</FormErrorMessage>}

            </FormControl>
                

            <FormControl  >
            <h1 className="text-secondary text-sm font-[600]">Mode<span className="text-red-500">*</span></h1>
            <RadioGroup variant="filled"  className="space-x-3 py-2 text-sm" value={mode} onChange={setMode}>
                <Radio value={'individual'}>Individual</Radio>
                <Radio value={'collabrated'}>Co-Authored</Radio>
            </RadioGroup>

            </FormControl>



            </div>
        



            <div className="flex  py-3 space-x-3">


            <FormControl  isInvalid={errorFields[2]} >
            <h1 className="text-secondary text-sm font-[600]">Year <span className="text-red-500">*</span></h1>
                    
                    <Select variant="filled" size="sm" value={article?.year} defaultValue={extras.years[0]} onChange={(e)=>{setArticle({...article,year:e.target.value,volume:extras.years.indexOf(e.target.value)+1,period:periodData[article?.issue]});}}>
                    <option disabled>Select a Year</option>

                        {extras.years?.map((year,index)=>{
                            return <option key={index} value={year} selected={index==0?'true':'false'}>{year}</option>
                        })}
                    </Select>

                    {errorFields[2]&&<FormErrorMessage>Year is required</FormErrorMessage>}

                </FormControl>


                <FormControl >
                <h1 className="text-secondary text-sm font-[600]">Volume<span className="text-red-500">*</span></h1>

                    <Input variant="filled" size="sm" value={article?.volume} disabled/>

                </FormControl>

                <FormControl isInvalid={errorFields[4]} >
                <h1 className="text-secondary text-sm font-[600]">Issue <span className="text-red-500">*</span></h1>

                    <Select value={article?.issue} variant="filled" size="sm" defaultValue={extras?.issues?.[article?.year][0]} onChange={(e)=>{setArticle({...article,issue:e.target.value,period:periodData[e.target.value]})}} >
                        <option disabled>Select an Issue</option>
                        {extras?.issues?.[article?.year]?.map((issue,index)=>{
                            return <option key={index} value={issue} selected={index==0?'true':'false'}>
                                    {issue}
                            </option>
                        })}
                    </Select>
                    {errorFields[3]&&<FormErrorMessage>Issue is required</FormErrorMessage>}

                </FormControl>
                

                <FormControl>
                
                <div className="flex justify-between items-center ">
                <h1 className="text-secondary text-sm font-[600]">Period <span className="text-red-500">*</span></h1>

                {!modifyPeriod?<button type="button" className="underline" onClick={()=>{setModifyPeriod(true)}}>Modify Period</button>
                :<button type="button" className="underline" onClick={()=>{setModifyPeriod(false); setArticle({...article,period:periodData[article?.issue]})}}>Reset Period</button>
                }


                </div>
                


                        {!modifyPeriod?<Input variant="filled" size="sm" disabled value={article?.period}/>:<Select variant="filled" size="sm" defaultValue={periodData[article?.issue]} value={article?.period} onChange={({target})=>{setArticle({...article,period:target?.value})}}>
                            <option  disabled>Select an Period</option>
                                {Object.values(periodData)?.map((period,index)=>{
                                    return <option key={index} value={period}>{period}</option>
                                })}
                            </Select>
                            
                            }
                </FormControl>




            </div>

            <FormControl  >
            <h1 className="text-secondary text-sm font-[600]">Keywords<span className="text-red-500">*</span></h1>
                
                <div className="flex flex-wrap w-full py-2 space-x-3">
                {keywords.map((element,index) =>{
                    return <p key={index} className="bg-slate-200 text-sm relative p-2 rounded-md ">{element}
                     <button  type="button" className="font-[600]  absolute top-[-5px] right-0  desktop:top-[-10px] desktop:right-[-10px]" onClick={()=>deleteKeywords(element)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

            </button>
                    </p>
                })}
                </div>

                <InputGroup>
                <Input value={keyword}  onChange={(e)=>setKeyword(e.target.value)} variant="filled" size="sm"/>                

                <button type="button" className="flex text-sm justify-between  py-2  drop-shadow px-2 relative left-[15px] rounded-full bg-primary text-slate-200 " onClick={handleKeywords} >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
</svg>

    </button>
           
                </InputGroup>
               

            </FormControl>


     


            <div className="flex flex-col py-3 space-y-3">
            <h1 className="text-secondary text-sm font-[600]">Authors<span className="text-red-500">*</span></h1>

                
            <FormControl >
            <Select variant="filled" size="sm"  value={collabrator} onChange={({target})=>{setCollabrator(target.value);}}>
                <option>Select an Author</option>
                {authors.map((author,index)=>{
                    return <option key={index} value={author?.id}>{`${author?.name}-${author?.email}`}</option>
                }
                    )}
            </Select>


            </FormControl>

            {mode=="collabrated"&&<div>
            <button type="button" className="flex  text-sm justify-between space-x-1 py-2  drop-shadow px-6 rounded-md  bg-blue-100  items-center" onClick={handleCollabrators} >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
</svg>


        <h1>Add</h1></button>

            {collabrators.map((e,index)=>{
                const details=getCollabrator(e)
                
                return <div key={index} className="flex my-4 text-sm items-center font-[400] bg-slate-100 p-3 rounded-md justify-between">
                
                    <div className="w-[250px] flex items-center space-x-2">
                    <Avatar name={details?.name} size="sm"/>
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







<button type="submit" className={`flex justify-center text-sm  top-[45px] right-[25px] space-x-1 py-2 absolute w-[120px] drop-shadow px-6 rounded-md text-white bg-gradient-to-r from-primary to-indigo-800 items-center `} >
    {!loading?<span>Save</span>:<Spinner color="white"/>}
</button>

    

    </form>
    

    <div className="flex p-1 items-center space-x-3">

            <ReferencesModal references={references} setReferences={setReferences} quill={quill} />


    </div>
    <RichTextEditor references={references} setReferences={setReferences} text={text} setText={setText} quill={quill} quillRef={quillRef}/>
        
    
</div>

    
</>
}