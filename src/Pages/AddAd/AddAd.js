import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
// import MaskedInput from 'react-text-mask';
// import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PageContainer, PageTitle } from "../../components/MainComponents"
import { PageArea } from "./styled"
import useApi from '../../helpers/OlxAPI'
import { ErrorMessage } from "../../components/MainComponents"

export const AddAd = () => {
    const api = useApi();
    const fileField = useRef();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');

    const [disabled,setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async ()=> {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    // const priceMask = createNumberMask({
    //     prefix:'R$',
    //     includeThousandsSeparator:true,
    //     thousandsSeparatorSymbol:'.',
    //     allowDecimal:true,
    //     decimalSymbol:','
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()){
            errors.push('Sem título!')
        }

        if(!category){
            errors.push('Sem categoria!')
        }

        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileField.current.files.length > 0){
                for(let i=0;i<fileField.current.files.length;i++){
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.AddAd(fData);

            if(!json.error) {
                navigate(`/ad/${json.id}`);
                return
            }else{
                setError(json.error)
            }

        }else{
            setError(errors.join("/n"))
        }

        setDisabled(false);
        
    }

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                <ErrorMessage>{error}</ErrorMessage>
                }
                
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label htmlFor='title'>Título</label>
                        <input 
                            className="input" type='text' id='title' name='title' autoFocus disabled={disabled} 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required    
                        />
                    </div>

                    <div className="area">
                        <label htmlFor='cat'>Categoria</label>
                        <select
                            disabled={disabled}
                            onChange={e=>setCategory(e.target.value)}
                            required
                            id="cat"
                        >
                            {categories && 
                            categories.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="area">
                        <label htmlFor=''>Preço</label>
                        {/* <MaskedInput 
                            mask={priceMask}
                            placeholder='R$ '
                            disabled={disabled || priceNegotiable}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        /> */}
                        <input 
                            placeholder='R$ '
                            disabled={disabled || priceNegotiable}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="area">
                        <label htmlFor='neg'>Preço Negociável</label>
                        <input 
                            type='checkbox' id='neg' name='neg' disabled={disabled} 
                            checked={priceNegotiable}
                            onChange={e => setPriceNegotiable(!priceNegotiable)}
                        />
                    </div>

                    <div className="area">
                        <label htmlFor='desc'>Preço Negociável</label>
                        <textarea
                            disabled={disabled}
                            value={desc}
                            onChange={e=>setDesc(e.target.value)}
                            id='desc'
                        ></textarea>
                    </div>

                    <div className="area">
                        <label htmlFor='imgs'>Imagens (Uma ou mais)</label>
                            <input 
                                type='file'
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        
                    </div>

                    <div className="area">
                        <button disabled={disabled}>Adicionar Anúncio</button>
                    </div>
                </form>
            </PageArea>
        </PageContainer>
    )
}