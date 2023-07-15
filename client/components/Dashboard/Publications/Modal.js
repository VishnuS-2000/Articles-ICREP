import { Modal,ModalOverlay,ModalBody,ModalFooter,Button,Tooltip,ModalCloseButton,ModalContent,ModalHeader, Textarea, FormControl,FormErrorMessage, Input,Select} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import {  useState } from "react"
import {useForm} from "react-hook-form"
import { useEffect } from "react"
import {CsvReader} from "./CsvReader"



export const ReferencesModal=({references,setReferences,quill})=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {register,handleSubmit,formState:{errors},setValue,watch}=useForm()
    const [urls,setUrls]=useState([])  
    const [editReferenceIndex,setEditReferenceIndex]=useState(null)
    const [invalidURL,setInvalidURL]=useState(false)
    const [id,setId]=useState(null)
    const [viewReferences,setViewReferences]=useState()
    const [editMode,setEditMode]=useState()
    const watchSource=watch("source")
    const watchLink=watch("link")
    const watchUse=watch("use")
    const [uses,setUses]=useState([])
    const [validWord,setValidWord]=useState(true)
    const [importData,setImportData]=useState(false)
    const [csvData,setCSVData]=useState()

    useEffect(()=>{
      
        setId(generateId(references))
      },[])

    const addReference=(data)=>{
        
        let results=[...references,{id:id,description:data?.description,urls:urls,uses:[]}]
        results=results?.sort((a,b)=>a.id-b.id)
        setReferences(results)
        setValue("description", null)
        setUrls([])
        setId(generateId(results))
              
      }

      const editReference=(data)=>{
        setReferences((prev)=>{
          prev[editReferenceIndex]={id:id,description:data.description,urls:urls,uses:uses}
          return prev
        })
        setEditMode(false)
        setUrls([])
        setValue("description",null)
        setEditReferenceIndex(null)
        setId(generateId(references))
        setUses(null)

      }

    const initiateEdit=(index)=>{
          setEditMode(true)
          setId(references[index]?.id)
          setValue("description",references[index]?.description)
          setUrls(references[index]?.urls)
          setViewReferences(false)
          setEditReferenceIndex(index)
          setUses(references[index]?.uses)
        }


    const generateId=(data)=>{
      const idMap = {};
      for (const obj of data) {
        idMap[obj.id] = true;
      }
      
      let maxId = 0;
      let missingId = null;
      for (let i = 1; i <= Object.keys(idMap).length; i++) {
        if (idMap[i] !== true) {
          missingId = i;
          break;
        }
        maxId = i;
      }
      
      if (missingId === null) {
        missingId = maxId + 1;
      }

return missingId;

    }

    const resetEdit=()=>{
      setEditMode(false)
        setUrls([])
        setValue("description",null)
        setEditReferenceIndex(null)
        setId(generateId(references))
    }

    const deleteReference=(id)=>{
      
      const results=references.filter((reference,index)=>{
          return index!==id
      }).sort((a,b)=>a.id-b.id)
      
      
      setReferences(results)
      setId(generateId(results))
  }       


  const addURL=()=>{

  if(watchLink&&watchSource){
    

    if(isValidURL(watchLink)){
      setInvalidURL(false)
    const results=urls?.map((element)=>{
      if(element?.link==watchLink){
        return element
      }

    }).filter((element)=>element!==undefined)
    
    if(results?.length==0){
      setUrls([...urls,{link:watchLink,source:watchSource}])
    }
  }
  else{
    setInvalidURL(true)
  }

  setValue("source","other")
  setValue("link",null)
  }
   
  }


  const deleteURL=(id)=>{

    const results=urls.filter((element,index)=>{
      return index!==id

    })

    setUrls(results)
  }


  const resetImport=()=>{
      setImportData(false)
  }


  function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  
    return pattern.test(str);
  }

  const addUse=()=>{
      const richText=quill?.root?.innerHTML
      if(watchUse&&!uses.includes(watchUse)&&richText.includes(watchUse)){
        setUses((prev)=>{
          prev.push(watchUse)
          return prev
        })
        setValidWord(true)
        setValue("use",null)
      }
      else{
        setValidWord(false)
      }
    
    }

  const deleteUse=(id)=>{
      const results=uses.filter((word,index)=>index!==id)
      setUses(results)
  }
    
  
   

    return (
      <>
 
 <Tooltip label="References">
            <button className="flex bg-slate-200 rounded-md drop-shadow space-x-2 px-3 py-1" onClick={onOpen}>
                  References
            </button>

            </Tooltip>       
            <Modal
          isCentered={false}
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
          size="full"          
        >
          <ModalOverlay />
          <ModalContent top={0}>
            <ModalHeader>References</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

            {!editMode&&!importData?<div className="flex space-x-3 px-3 items-center justify-between">

            <div>
            <button type="button" className={`${!viewReferences?'bg-slate-200':'bg-slate-50'} p-2 font-[500] rounded-md`} onClick={()=>{setViewReferences(false)}}>Add Reference</button>
            <button type="button" className={`${viewReferences?'bg-slate-200':'bg-slate-50'} p-2 font-[500] rounded-md`} onClick={()=>{setViewReferences(true)}}>View References</button>
            </div>

            <button type="button" className="flex bg-slate-50 p-2 font-[500] rounded-md" onClick={()=>{setImportData(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
</svg>
              <span>Import CSV</span>
              </button>

            </div>:<div className="flex px-3 items-start flex-col ">
                  <button className="flex space-x-1 text-sm items-center" onClick={()=>{editMode?resetEdit():resetImport()}} >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

                    <span>
                      Back
                    </span>
                  </button>
                  <button type="button" className="bg-slate-50 p-2 font-[500] rounded-md">
                      {editMode?<span>Edit Reference</span>:<span>Import Data</span>}
                  </button>
              </div>}
           


                {!importData?!viewReferences?<form onSubmit={handleSubmit(editMode?editReference:addReference)} className="p-3 space-y-3 relative">
                        <FormControl>
                        
                        <h1 className="text-secondary text-sm font-[600]">Id<span className="text-red-500">*</span></h1>
                        <Input variant="filled" type="text" value={id}  disabled size="sm"/>


                        </FormControl>

                        <FormControl isInvalid={errors?.description}>
                        
                        <h1 className="text-secondary text-sm font-[600]">Description<span className="text-red-500">*</span></h1>
                        <Textarea variant="filled" rows={10} size="sm" {...register("description",{required:true})}/>

                        {errors?.description?.type=="required"&&<FormErrorMessage>Description required</FormErrorMessage>}
                      

                        </FormControl>

                        {uses&&editMode&&<div className="space-y-1">
                        <h1 className="text-secondary text-sm font-[600]">{`Uses (${uses?.length})`}</h1>
                        <div className="flex space-y-1 space-x-1">
                          <FormControl>
                          <Input type="text" {...register("use")}/>
                          {!validWord&&<p className="text-red-500 font-[500] text-sm">Word not found in content</p>}
                          </FormControl>
                          <button type="button" onClick={()=>{addUse()}} className="bg-blue-200 p-1 rounded-md mt-5 h-[35px]" >Add</button>

                        </div>

                        <div className="flex flex-wrap space-x-1">
                            {uses.map((word,index)=>{
                              return <div key={index} className="relative">
                                <p className="p-2 rounded-md bg-slate-200 text-sm ">{word}</p>
                                <button type="button" className="absolute top-0 right-[-2px]" onClick={()=>deleteUse(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                                </button>

                              </div>
                            })}
                        </div>
                        </div>}

                  
                        <FormControl>
                        <h1 className="text-secondary text-sm font-[600]">{`URLS (${urls?.length})`}</h1>

                        
                        <div className="flex space-x-1 ">
                        

                      
                        
                        <FormControl>
                        <h1 className="text-secondary text-sm font-[600]">Source</h1>                          
                          <Select size="sm" variant="filled" type="text" className=""  defaultValue="other" {...register("source")}>
                                  <option>Select a Source</option>
                                  <option value="other">External</option>
                                  <option value="pdf">PDF File</option>
                                  <option value="scholar">Google Scholar</option>
                            </Select>
                          </FormControl>

                        
                        
                        <FormControl isInvalid={invalidURL}>
                        <h1 className="text-secondary text-sm font-[600] flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

                          <span>Link</span>
                          </h1>
                        <Input size="sm" variant="filled" type="text" className="" {...register("link")} />
                        {invalidURL&&<FormErrorMessage>Invalid Url</FormErrorMessage>}



                            </FormControl>

                          
                            <button type="button" onClick={addURL} className="bg-blue-200 p-1 rounded-md mt-5 h-[35px]" >Add</button>


                            
                          </div>
                      


                        </FormControl>
                                            

                        <div className="h-[150px] w-full overflow-y-auto">
                          

                          {urls?.map((element,index)=>{
                            return <div key={index} className="flex bg-slate-100 rounded-md p-2 justify-between items-center">
                          
                              <p className="text-sm w-[250px] text-justify">{element?.link}</p>
                              <p className="text-sm">{element?.source}</p>
                              <button type="button" onClick={()=>{deleteURL(index)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
</button>
                            
                            </div>
                          })}
                        </div>



                        <div className=" flex justify-end">
                        <button type="submit" className="p-2 font-[500] bg-blue-100 rounded-md ">Save</button>
                        </div>
                </form>:
                <Table className="text-sm">
                          <Thead>
                            <Th>Id</Th>
                            <Th>Descriptions</Th>
                            <Th>Links</Th>
                            <Th>Uses</Th>
                            <Th>Actions</Th>
                          </Thead>


                          {references?.map((element,index)=>{
                            return <Tr key={index}>
                              <Td>{element?.id}</Td>
                              <Td className="">
                                <div><p className="max-w-[350px] text-justify">
                                  {element?.description}
                                  </p></div>
                              </Td>
                              <Td>{element?.urls?.map((url,index)=>{
                                return <div key={index} className="flex space-x-5 max-w-[320px]">
                                  <p className="max-w-[300px] text-justify">{url?.link}</p>
                                  <p className="font-[500]">{`(${url?.source})`}</p>
                                  
                                </div>
                              })}</Td>

                              <Td>
                                  {element?.uses?.map((word,index)=>{
                                    return <div key={index} className="relative">
                                      <p>{word}</p>
                                    </div>
                                  })}
                              </Td>

                              <Td className="space-x-1">
                                <button onClick={()=>{initiateEdit(index)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

                                </button>
                                <button onClick={()=>deleteReference(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                                </button>
                                </Td>
                            </Tr>
                          })}
                          </Table>
                          :
                          // Import Data
                          <>
                            
                              <CsvReader references={references} setReferences={setReferences} isValidURL={isValidURL} generateId={generateId}/>                          
                          </>


              }

            
            
            </ModalBody>
           

          
           
          </ModalContent>
                          
        </Modal>
      </>
    )
  }



export const OutlinesModal = ({quill})=>{


    const {isOpen,onClose,onOpen}=useDisclosure()
    const [outlines,setOutlines]=useState([])

    useEffect(()=>{
      if(quill){
        const dataElements=quill?.root.getElementsByTagName("h3");
        const outlineData=[];
  
          
          setOutlines(Array.from(dataElements));

        
      }
    },[quill?.root?.innerHTML])

   

  return<>
   <button className="flex bg-slate-200 rounded-md drop-shadow space-x-2 px-3 py-1" onClick={onOpen}>
                  Outlines
            </button>
  <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay/>
      <ModalContent>

      <ModalHeader>Outlines</ModalHeader>
      <ModalCloseButton/>


        <TableContainer>
          <Table>
            <TableCaption>Use Heading 3 on element to add to Outlines</TableCaption>
            <Thead>
            <Tr>
              <Th>  
                Slno.
              </Th>

              <Th>
                  Title
              </Th>
            </Tr>
            </Thead>
            <Tbody>
              {outlines?.map((outline,index)=>{
                if(outline?.innerText){
                return <Tr key={index}>
                  <Td>{index+1}</Td>
                  <Td>
                    <h1 className="font-[500]">{outline?.innerText}</h1>
                    </Td>
                </Tr>
                }
              })}
            </Tbody>
          
          </Table>
        </TableContainer>

      </ModalContent>

</Modal>
  
  </>
  




  }



