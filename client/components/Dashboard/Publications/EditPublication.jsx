import {useState,useRef,useCallback} from "react"
import dynamic from 'next/dynamic'
import { FormControl,FormLabel,Input,InputGroup,InputRightAddon,Textarea,Avatar,Select, FormHelperText, FormErrorMessage, Switch,RadioGroup,Radio,Modal,ModalOverlay,ModalCloseButton,ModalBody,Tooltip} from "@chakra-ui/react"
import { useEffect } from "react";
import axios from "../../../axios"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

import useNotification from "../../../hooks/useNotification";
import moment, { invalid } from "moment";

import { Spinner } from "@chakra-ui/react";


import { start_date,issueData,periodData} from "../Dates";



import RichTextEditor from "./TextEditor"


import { OutlinesModal, ReferencesModal } from "./Modal";
import { useQuill } from "react-quilljs";
import { useCurrent } from "../useCurrent"


export const EditPublication=()=>{

const {quill,quillRef}=useQuill()
const {current}=useCurrent()
    
const axiosPrivate=useAxiosPrivate()

    const [text,setText]=useState()
    const [publication,setPublication]=useState({
        title:current?.publication?.title,
        type:current?.publication?.type,
        author: current?.publication?.authorId,
        content:JSON.parse(current?.publication?.content),
        keywords:current?.publication?.keywords,
        issue:current?.publication?.issue?.issue,
        volume:current?.publication?.issue?.volume,
        year:current?.publication?.issue?.year,
        period:current?.publication?.issue.period,

    })
        

    const [mode,setMode]=useState(current?.publication?.mode)
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
    const [keywords,setKeywords]=useState(current?.publication?.keywords)
     



    const [references,setReferences]=useState(JSON.parse(current?.publication?.references)?.raw)


    const [modifyPeriod,setModifyPeriod]=useState(false)
   


    const validateFields=()=>{
        let valid=true
        if(!publication?.title){
            valid=false
            setNotification({message:'Title required',status:'error',createdAt:moment()})
            setErrorFields((prev)=>{
                prev[0]=true
                return prev
            })
        }
        else if(!publication?.type){
            valid=false
            setNotification({message:'Type required',status:'error',createdAt:moment()})
            setErrorFields((prev)=>{
                prev[1]=true
                return prev
            })
        }

        else if(!publication?.volume){
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

  
        else if(!publication?.year){
            valid=false
            setErrorFields((prev)=>{
                prev[3]=true
                return prev
            })
            setNotification({message:'Year required',status:'error',createdAt:moment()})
        }

        else if(!publication?.issue){
            valid=false
            setErrorFields((prev)=>{
                prev[4]=true
                return prev
            })
            setNotification({message:'Issue required',status:'error',createdAt:moment()})
        }
      
        else if(mode=="individual"&&!collabrator){
            valid=false
            setNotification({message:'Author required',status:'error',createdAt:moment()})
        }

        else if(mode=="collabrated"&&!collabrators){
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


            const response=await axiosPrivate.put(`/publication/${current?.publication?.id}`,{
            title:publication?.title,
            mode:mode,
            type:publication?.type,
            authors:mode=="individual"?[collabrator]:collabrators,
            content:content,
            year:publication?.year,
            issue:publication?.issue,
            volume:publication?.volume,
            period:publication?.period,
            keywords:keywords,
            references:referencesString

            })

            if(response?.status==200){
                setLoading(false)
                setNotification({message:`Publication Updated`,status:'success',createdAt:moment()})
                
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
            const response=await axios.get('/publication/authors')
  
            if(response){
                setAuthors(response?.data?.result.rows)
            }
            
            
        }

        const fetchTypes=async()=>{

            const response=await axios.get('/publication/types')

            if(response){
                setTypes(response?.data?.result.rows)
            }
        }   

        fetchAuthors()
        fetchTypes()

    },[])



    useEffect(()=>{
        if(mode=="individual"&&authors?.length>0){

            setCollabrator(current?.publication?.authors[0]?.id)
    
        }
        else{
          const  temp=[]
    
            current?.publication?.authors?.map((author)=>{
                temp.push(author?.id)
            })
    
            setCollabrators(temp)
    
        }
        },[])


    useEffect(()=>{

        if(!quill) return

        quill.setContents(publication?.content)
    },[quill])

    useEffect(()=>{
        const current_date=moment()
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
            <Input variant="filled" size="sm" type="text" value={publication?.title} onChange={({target})=>{setPublication({...publication,title:target.value}); if(target.value && errorFields[0]){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
            {errorFields[0]&&<FormErrorMessage>Title is required</FormErrorMessage>}

            </FormControl>

            <FormControl   isInvalid={errorFields[1]} >
        <div  className="flex space-x-5 items-center">
        <h1 className="text-secondary text-sm font-[600]">Publication type <span className="text-red-500">*</span></h1>


        <div>
        <button type="button" className="ml-2 text-primary text-sm font-[600]  underline" onClick={()=>{setCreateType(!createType); setPublication({...publication,type:null})}}>{createType?'Existing Types':'Create Type'}</button>
        </div>

        </div>

            {createType?<Input variant="filled" size="sm" value={publication?.type} onChange={({target})=>{setPublication({...publication,type:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} } }/>:<Select variant="filled"  value={publication?.type} onChange={({target})=>{setPublcation({...publication,type:target.value}); if(target.value && errorFields[1]){setErrorFields((prev)=>{prev[1]=false; return prev})} }}>
            <option disabled value={null} variant="filled" size="sm">Select a Type</option>
                {types.map((type,index)=>{
                    return <option key={index} value={type?.type} selected={index==0?'true':'false'}>{type?.type}</option>
                })}
            </Select>}
            {errorFields[1]&&<FormErrorMessage>Type is required</FormErrorMessage>}

            </FormControl>
                

            <FormControl  >
            <h1 className="text-secondary text-sm font-[600]">Mode<span className="text-red-500">*</span></h1>
            <RadioGroup className="space-x-3 py-2 text-sm" value={mode} onChange={setMode}>
                <Radio value={'individual'}>Individual</Radio>
                <Radio value={'collabrated'}>Co-Authored</Radio>
            </RadioGroup>

            </FormControl>



            </div>
        



            <div className="flex  py-3 space-x-3">


            <FormControl  isInvalid={errorFields[2]} >
            <h1 className="text-secondary text-sm font-[600]">Year <span className="text-red-500">*</span></h1>
                    
                    <Select value={publication?.year}  variant="filled" size="sm" onChange={(e)=>{setPublication({...publication,year:e.target.value,volume:extras.years.indexOf(e.target.value)+1,period:periodData[publication?.issue]});}}>
                    <option disabled>Select a Year</option>

                        {extras.years?.map((year,index)=>{
                            return <option key={index} value={year} selected={index==0?'true':'false'}>{year}</option>
                        })}
                    </Select>

                    {errorFields[2]&&<FormErrorMessage>Year is required</FormErrorMessage>}

                </FormControl>


                <FormControl >
                <h1 className="text-secondary text-sm font-[600]">Volume<span className="text-red-500">*</span></h1>

                    <Input value={publication?.volume} variant="outline" disabled/>

                </FormControl>

                <FormControl isInvalid={errorFields[4]} >
                <h1 className="text-secondary text-sm font-[600]">Issue <span className="text-red-500">*</span></h1>

                    <Select value={publication?.issue} variant="filled" size="sm" onChange={(e)=>{setPublication({...publication,issue:e.target.value,period:periodData[e.target.value]})}} >
                        <option disabled>Select an Issue</option>
                        {extras?.issues?.[publication?.year]?.map((issue,index)=>{
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
                :<button type="button" className="underline" onClick={()=>{setModifyPeriod(false); setPublication({...publication,period:periodData[publication?.issue]})}}>Reset Period</button>
                }


                </div>
                


                        {!modifyPeriod?<Input variant="filled" size="sm" disabled value={publication?.period}/>:<Select variant="filled" size="sm" defaultValue={periodData[publication?.issue]} value={publication?.period} onChange={({target})=>{setPublication({...publication,period:target?.value})}}>
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
                     <button  type="button" className="font-[600]  absolute top-[-5px] right-0  desktop:top-[-2px] desktop:right-[1px]" onClick={()=>deleteKeywords(element)}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
</svg>

            </button>
                    </p>
                })}
                </div>

                <InputGroup className="flex items-center">
                <Input value={keyword} variant="filled" size="sm"  onChange={(e)=>setKeyword(e.target.value)}/>                
                <button type="button" className="flex text-sm justify-between py-2 px-5  drop-shadow px-2 relative left-[15px] rounded-md bg-primary text-slate-200 " onClick={handleKeywords} >
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

            <ReferencesModal references={references} setReferences={setReferences} quill={quill}/>
            <OutlinesModal quill={quill}/>


    </div>
    <RichTextEditor references={references} setReferences={setReferences}  text={text} setText={setText} quill={quill} quillRef={quillRef}/>
            


    
</div>

    
</>
}