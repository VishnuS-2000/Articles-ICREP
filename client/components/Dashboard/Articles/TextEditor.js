import { useEffect, useState } from "react";
import {useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalFooter,ModalBody,Input, Textarea, } from "@chakra-ui/react"

import 'quill/dist/quill.snow.css';
import { FormControl} from "@mui/material";
import {useForm} from "react-hook-form"

const RichTextEditor = ({references,setReferences,quill,quillRef}) => {

 const [modal,setModal] =useState({open:false,x:0,y:0})
 const [word,setWord] = useState(null)
 const { isOpen, onOpen, onClose } = useDisclosure()
 const {register,handleSubmit,reset,setValue,formState:{errors}}=useForm()
 const SSR=typeof window==="undefined"
 const [validReference,setValidReference]=useState(false)
 
 useEffect(()=>{
  if(!quill) return

  quill.on('selection-change',(range,oldRange,source)=>{

    if(source=="user"){

      if(range?.length>0){
      var text = quill.getText(range?.index, range?.length);
      var bounds=quill.getBounds(range?.index, range?.length)
      setModal({open:true,x:bounds?.left,y:bounds?.top})
      setWord({text,range})
      }
    }

  })


 },[quill])


 const quoteReference =async(data)=>{  
      if(validReference){

        let quoteReferenceIndex=null
        references.map((element,index)=>{
          if(element?.id===Number(data?.serial)){
                  quoteReferenceIndex=index
            }
        })
        
        setReferences((prev)=>{
          let uses=prev[quoteReferenceIndex]?.uses
          if(!uses?.includes(word?.text)){
          uses.push(word?.text)
          prev[quoteReferenceIndex]={...prev[quoteReferenceIndex],uses:uses}

          }

          return prev
        })
      }  
  reset()
  onClose()
  
 }


 

 const handleSerialVerify=({target})=>{


    let result=references?.map((element)=>{
      if(target?.value==Number(element?.id)){
        return element
      }
    
    })

      result=result.filter((element)=>{
      return element!==undefined
    })

    if(result?.length>0){
      setValidReference(true)
      setValue("description",result[0]?.description)
    }
    else{
      setValidReference(false)
      setValue("description",null)
    }
    
 }
 

  return (<>  
      <div>
      {!SSR?<div className="relative">
      <div ref={quillRef} >
      {modal?.open&&<div  style={{position:'absolute',left:`${modal?.x}px`,top:`${modal?.y+20}px`}} className="flex space-x-5 bg-slate-100 p-3 rounded-md drop-shadow">
           <button onClick={onOpen} type="button" className="rounded-full p-1 hover:bg-slate-200">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

           </button>

           <button onClick={()=>{setModal({open:false,x:0,y:0})}} className="rounded-full p-1 hover:bg-slate-200 ">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

           </button>


        </div>}
        </div>

        <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-base">Quote Reference</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="flex flex-col w-full space-y-5" onSubmit={handleSubmit(quoteReference)}>

            <div className="w-full flex flex-col">
              <h1 className="text-secondary text-sm font-[600]">Serial/Index<span className="text-red-500">*</span></h1>
              <FormControl isInvalid={validReference&&errors?.serial}>
              <Input type="number" variant="filled" size="sm" {...register("serial",{required:true})} onChange={handleSerialVerify} className="w-full text-sm"/>

              {errors?.serial?.type=="required"&&<p className="text-red-500">Serial Number Required</p>}
              {!validReference&&<p className="text-red-500 font-[500] text-sm">No References Found</p>}
              </FormControl>
              </div>


              <div className="w-full flex flex-col">
              <h1 className="text-secondary text-sm font-[600]">Current Phrase<span className="text-red-500">*</span></h1>
              <Input variant="filled" type="text" size="sm" value={word?.text} disabled={true} className="w-full font-[500]"/>

              </div>

              <div className="w-full flex flex-col">
              <h1 className="text-secondary text-sm font-[600]">Description<span className="text-red-500">*</span></h1>
              <FormControl >

              <Textarea variant="filled" rows={8} size="sm" type="text"  disabled {...register("description")}  className="w-full text-sm"/>

              
            </FormControl>


              </div>

              <ModalFooter className="flex space-x-5">
            <button  type="button" mr={3} onClick={onClose} className="text-base text-blue-500 hover:bg-blue-100 duration-500 rounded-md p-2 font-[600]">
              Close
            </button>
            <button disabled={!validReference} type="submit" className="text-base font-[600] text-primary hover:bg-slate-100 duration-500 rounded-md p-2">Save</button>
          </ModalFooter>

            </form>
          </ModalBody>
         
        </ModalContent>
      </Modal>
        </div>:<p>Loading...</p>}


</div>
      </>
  );
};

export default RichTextEditor;
