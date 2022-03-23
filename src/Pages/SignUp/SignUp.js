import { useEffect, useState } from "react"
import { PageContainer, PageTitle } from "../../components/MainComponents"
import { PageArea } from "./styled"
import useApi from '../../helpers/OlxAPI'
import { doLogin } from "../../helpers/AuthHandler"
import { ErrorMessage } from "../../components/MainComponents"

export const SignUp = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);
    const [disabled,setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword){
            setError('Senhas diferem!');
            setDisabled(false);
            return;
        }

        const json = await api.register(name, email, password, stateLoc);

        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token);
            window.location.href = '/';
        }

        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                <ErrorMessage>{error}</ErrorMessage>
                }
                
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label for='name'>Nome</label>
                        <input 
                            className="input" type='text' id='name' name='name' autoFocus disabled={disabled} 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required    
                        />
                    </div>

                    <div className="area">
                        <label for='state'>Estado</label>
                        <select id="state"
                            value={stateLoc} 
                            onChange={e => setStateLoc(e.target.value)}>
                            <option></option>
                            {stateList.map( (item, index) => (
                                <option key={index} value={item._id}>
                                        {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="area">
                        <label for='user'>Email</label>
                        <input 
                            className="input" type='email' id='user' name='user' disabled={disabled} 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required    
                        />
                    </div>

                    <div className="area">
                        <label for='pass'>Senha</label>
                        <input 
                            className="input" type='password' id='pass' name='pass' disabled={disabled} 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="area">
                        <label for='confirmPass'>Confirmar Senha</label>
                        <input 
                            className="input" type='password' id='confirmPass' name='confirmPass' disabled={disabled} 
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>                    

                    <div className="area">
                        <button disabled={disabled}>Criar Cadastro</button>
                    </div>
                </form>
            </PageArea>
        </PageContainer>
    )
}