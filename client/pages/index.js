import NavBar from "../components/navbar"
import Footer from "../components/footer"
import SearchBar from "../components/searchbar"
import TopicBar from "../components/topicbar"
import { ArticleContainer } from "../components/articles/Container"
import { ArticleHeader } from "../components/articles/Header"
import { ArticleCard } from "../components/articles/ArticleCard"



export default function Home(){


    const data=[{
        title:'Becoming a leader as a first-generation immigrant',
        content:'Although were living in an era in which many companies advocate for diversity and inclusion, I am often still the only female director in the room in the tech industry. Even more often, I find myself to be the only first-generation immigrant who learned English as a second language.This is interesting given almost 27% of the population in California is foreign-born immigrants and 45% of people speak a different language at home Was I luckier? Was I smarter? Probably not.I have been pondering what made me different and how I leveraged my unique immigrant experience for the last 20 years in the U.S. I hope that others like me can benefit from my story.',
        author:{
            name:'Vishnu S',

        }
    },{
        title:'Internet Brain is a Real Thing We Need a Common Language to Talk About It Internet Brain is a Real Thing We Need a Common Language to Talk About It',
        content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
        author:{
            name:'Vishnu S'
        }
    },
        {
            title:'Internet Brain is a Real Thing',
            content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
            author:{
                name:'Vishnu S'
            }
        }
            ,
            {
                title:'Internet Brain is a Real Thing',
                content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
                author:{
                    name:'Vishnu S'
                }
            }
                ,
                {
                    title:'Internet Brain is a Real Thing',
                    content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
                    author:{
                        name:'Vishnu S'
                    }
                }
                    ,
                    {
                        title:'Internet Brain is a Real Thing',
                        content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
                        author:{
                            name:'Vishnu S'
                        }
    },
    {
        title:'Internet Brain is a Real Thing',
        content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
        author:{
            name:'Vishnu S'
        }
    },
    {
        title:'Internet Brain is a Real Thing',
        content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
        author:{
            name:'Vishnu S'
        }}
        ,
        {
            title:'Internet Brain is a Real Thing',
            content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
            author:{
                name:'Vishnu S'
            }}
            ,{
                title:'Internet Brain is a Real Thing',
                content:'In my latest book, The Practice of Groundedness, I traced this general sense of dis-ease to a concept I called heroic individualism: an ongoing game of oneupmanship against yourself and others where the goalpost is always ten-yards down the field. Heroic individualism is a vicious spiral of go, go, go; more, more, more; nothing is ever enough. It is striving unhinged, the result of which is a frantic and frenetic lifestyle overflowing with busyness, restlessness, loneliness, and, eventually, emptiness. I argued that the root problem of heroic individualism is that we fail to properly ground ourselves with a solid foundation of habits and practices in our lives.Since the book came out, something I hear frequently from readers is how helpful it has been to have not only ideas for the solution but also a name for the problem. Once you give something a name, it loses some of its power of you. You can identify when you are trapped in it. You can wrestle with it. You can discuss it with others.',
                author:{
                    name:'Vishnu S'
                }
            }
]




    return <>
    <NavBar/>
    <SearchBar/>
    <ArticleHeader />

        <div className="flex  w-full min-h-screen flex-col desktop:flex-row">

        <ArticleContainer>

            {data.map((e)=><ArticleCard data={e}/>) }
        
        
            
        </ArticleContainer>

        <TopicBar/>
        </div>

    <Footer/>
    </>


}