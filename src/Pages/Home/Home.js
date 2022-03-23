import { useEffect, useState } from "react"
import { PageContainer } from "../../components/MainComponents"
import { PageArea, SearchArea } from "./styled"
import useApi from '../../helpers/OlxAPI'
import { Link } from "react-router-dom"
import { AdItem } from "../../components/partials/AdItem/AdItem"

export const Home = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getRecentsAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdList(json.ads);
        }
        getRecentsAds();
    }, []);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type='text' name="q" placeholder="O que você procura?"/>
                            <select name="state">
                            {stateList.map( (item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>

                    <div className="categoryList">
                        {categories.map( (item, index) => (
                            <Link key={index} to={`/ads?cat=${item.slug}`} className="categoryItem">
                                <img src={item.img} alt=''/>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map( (item, index) => (
                            <AdItem key={index} data={item}/>
                        ))}
                    </div>
                    <Link to='/ads' className="seeAllLink">Ver Todos</Link>

                    <hr/>

                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.</p>
                </PageArea>
            </PageContainer>
        </>
        
    )
}