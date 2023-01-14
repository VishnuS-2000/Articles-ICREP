import {Avatar} from "@chakra-ui/react"



export const AuthorBarMobile=({authors})=>{

return <div className="flex flex-[1] flex-col ">

        <div className="space-y-2 py-5">
            {authors?.map((author,index)=>{

                return <div key={index} className="flex space-x-3 items-center">
                    {author?.photo?<Avatar src={author?.photo} />:<>

                    <div className="flex tablet:hidden">
                    <Avatar size="md" name={author?.name} className="tablet:hidden" />
                    </div>

                    <div className="hidden tablet:flex">
                    <Avatar size="md" name={author?.name} className="tablet:hidden" />
                    </div>                    
                    </>}
                    
                    <div>
                    <h1 className="text-sm tablet:text-base font-[500]">{author?.name}</h1>
                    <p className="text-sm tablet:text-sm">{author?.bio}</p>
                    <p className="text-sm tablet:text-sm flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
</svg>

                        {author?.email}</p>
                    </div>

                    </div>

            })}
            </div>

    </div>


}