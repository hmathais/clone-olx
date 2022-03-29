import { useEffect, useState } from "react"
import { PageContainer } from "../../components/MainComponents"
import { PageArea } from "./styled"
import useApi from '../../helpers/OlxAPI'
import { useLocation, useNavigate } from "react-router-dom"
import { AdItem } from "../../components/partials/AdItem/AdItem"

let timer;

export const Ads = () => {
    const api = useApi();
    const navigate = useNavigate();
    
    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    }
    const query = useQueryString();

    const [q, setQ] = useState( query.get('q') != null ? query.get('q') : '' );
    const [state, setState] = useState( query.get('state') != null ? query.get('state') : '' );
    const [cat, setCat] = useState( query.get('cat') != null ? query.get('cat') : '' );

    const [currentPage, setCurrentPage] = useState(1);
    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if(adList.length > 0){
            setPageCount( Math.ceil( adsTotal/adList.length ) );
        }else{
            setPageCount(0);
        }
    }, [adsTotal]);

    useEffect( ()=>{
        getAdsList();
    }, [currentPage]);

    useEffect(() => {
        let queryString = []

        if(q){
            queryString.push(`q=${q}`)
        }
        if(cat){
            queryString.push(`cat=${cat}`)
        }
        if(state){
            queryString.push(`state=${state}`)
        }

        navigate(`?${queryString.join('&')}`, {replace:true})

        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 2000)
        setResultOpacity(0.3);
        setCurrentPage(1);
    }, [q, cat, state]);

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

    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage -1) * 21;

        const json = await api.getAds({
            sort:'desc',
            limit:21,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    let pagination = [];
    for(let i=1; i<=pageCount;i++){
        pagination.push(i)
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input 
                            type='text' 
                            name="q" 
                            placeholder="O que você procura?"
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />

                        <div className="filterName">Estado:</div>
                        <select name="state" value={state} onChange={e => setState(e.target.value)}> 
                            <option></option>
                            {stateList.map( (item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>

                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map( (item,index) => (
                                <li 
                                    key={index} 
                                    className={cat==item.slug?'categoryItem active':'categoryItem'}
                                    onClick={e=>setCat(item.slug)}
                                >
                                    <img src={item.img} alt=''></img>
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>

                <div className="rightSide">
                    <h2>Resultados:</h2>

                    {loading && adList.length === 0 &&
                        <div className="listWarning">Carregando...</div>
                    }

                    {!loading && adList.length < 1 &&
                        <div className="listWarning">Não encontramos resultados =(.</div>
                    }
                    
                    <div className="list" style={{opacity:resultOpacity}}>
                        {adList.map( (item, index) => (
                            
                            <AdItem key={index} data={item}/>
                            
                        ))}
                    </div>

                    <div className="pagination">
                        {pagination.map( (item, index)=>(
                            <div onClick={()=> setCurrentPage(item)}
                                key={index} className={item===currentPage ? 
                                'pgItem active' : 
                                'pgItem'}>
                                    {item}
                            </div>
                        ))}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}