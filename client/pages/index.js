import NavBar from "../components/navbar"
import Footer from "../components/footer"
import SearchBar from "../components/searchbar"
import TopicBar from "../components/topicbar"
import { ArticleContainer } from "../components/articles-container"
export default function Home(){





    return <>
    <NavBar/>
    <SearchBar/>
        <div className="flex  w-full min-h-screen flex-col desktop:flex-row">

        <ArticleContainer>
            
        </ArticleContainer>
        <TopicBar/>
        </div>

    <Footer/>
    </>


}