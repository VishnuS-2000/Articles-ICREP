import {Avatar} from "@chakra-ui/react"

export const AuthorBar=({authors})=>{





    return <div className="hidden fixed top-[13.5%] desktop:flex  right-0 w-[20%]  bg-white  flex-col text-base border  border-l px-4 min-h-screen justify-start py-5">

            <h1 className="text-lg font-[500]">Publishers</h1>
            
            <div className="space-y-8 py-5">
            {authors.map((author)=>{

                return <div className="space-y-2">
                    {author?.photo?<Avatar src={author?.photo}/>:<Avatar name={author?.name}/>}
                    
                    <div>
                    <h1 className="text-lg font-[500]">{author?.name}</h1>
                    <p className="">{author?.bio}</p>
                    </div>

                    </div>

            })}
            </div>
    </div>

}

export const AuthorBarMobile=({authors})=>{

return <div className="flex flex-[1] flex-col desktop:hidden">
        <h1 className="text-base font-[700] mt-4">Publishers</h1>

        <div className="space-y-8 py-5">
            {authors.map((author)=>{

                return <div className="flex space-x-3 items-center">
                    {author?.photo?<Avatar src={author?.photo} />:<Avatar name={author?.name} />}
                    
                    <div>
                    <h1 className="text-base font-[500]">{author?.name}</h1>
                    <p className="">{author?.bio}</p>
                    </div>

                    </div>

            })}
            </div>

    </div>


}