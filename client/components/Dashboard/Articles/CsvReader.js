import React, {useCallback,useEffect,useState} from 'react'
import {useDropzone} from 'react-dropzone'
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

export const CsvReader=({references,setReferences,isValidURL,generateId,setImportData})=>{

const [csvData,setCsvData]=useState()
const [error,setError]=useState()


const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    if(acceptedFiles[0]?.type=="text/csv"){
        const reader = new FileReader();
        reader.onload = () => {
        const csv = reader.result;
        const lines = csv.split('\n');
        const data = [];
        let id=generateId(references)
        for (let i = 0; i < lines.length; i++) {
        const row = {};
        lines[i]=lines[i].replace(/["']/g, "")
        const rowData=lines[i].split(',')
        const url=rowData[rowData?.length-1]?.trim()?.replace(/[.]$/, "")
        row['id']=id
        row['uses']=[]
        row['urls']=[]
        console.log(url,isValidURL(url))
        if(isValidURL(url)){
          row['urls']=[{link:url,source:'other'}]
          row['description']=rowData.slice(0,rowData.length-1).join()
          
        }else{
          row['description']=lines[i]
        }
        data.push(row)
        id+=1
      }
      setCsvData(data);
    };
    reader.readAsText(acceptedFiles[0]);
    setError(false)        
    }
    else{
      setError(true)
    }
  }, [])

  const saveData=()=>{
  
    setReferences([...references,...csvData])
    setCsvData(null)
  }
  const resetData=()=>{
    setCsvData(null)
  }


  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (<>
    {!csvData?<div className="flex items-center justify-center ">
    <div {...getRootProps()} className={`max-w-[520px] p-8 bg-slate-100 rounded-md border-dashed border-2 ${error?'border-red-500':'border-blue-800'}`}>
      <input {...getInputProps()} />

      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag n drop some files here, or click to select files</p>
          }
        {error&&<p className='text-red-500'>Invalid CSV File</p>}
    </div>
    </div>
    :<>
    <div className='absolute right-[20px] space-x-5 top-[90px] font-[500] '>
      <button type="button" className='p-2  bg-slate-100 rounded-md hover:bg-blue-100 duration-500' onClick={()=>saveData()}>Save Data</button>
      <button type="button" className='p-2  bg-slate-100 rounded-md hover:bg-red-100 duration-500' onClick={()=>{resetData()}}>Reset</button>
    </div>
    <Table className="text-sm">
                          <Thead>
                            <Th>Id</Th>
                            <Th>Descriptions</Th>
                            <Th>Links</Th>
                          </Thead>


                          {csvData?.map((element,index)=>{
                            return <Tr key={index}>
                              <Td>{element?.id}</Td>
                              <Td className="">
                                <div className=''>
                                  <p className='max-w-[350px] text-justify'>{element?.description}</p></div>
                              </Td>
                              <Td>{element?.urls?.map((url,index)=>{
                                return <div className="flex space-x-5 max-w-[320px] " key={index}>
                                  <p className='max-w-[300px] text-justify'>{url?.link}</p>
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

                              
                            </Tr>
                          })}
                          </Table>
                          </>
    }
   </>
  )
}