import { useState } from "react"
import { PageContainer, PageTitle } from "../../components/MainComponents"
import { PageArea } from "./styled"
import useApi from '../../helpers/OlxAPI'
import { doLogin } from "../../helpers/AuthHandler"
import { ErrorMessage } from "../../components/MainComponents"

export const SignIn = () => {
    const api = useApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled,setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);

        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token, rememberPassword);
            window.location.href = '/';
        }

        setDisabled(false)
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                <ErrorMessage>{error}</ErrorMessage>
                }
                
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label for='user'>Email</label>
                        <input 
                            className="input" type='email' id='user' name='user' autoFocus disabled={disabled} 
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
                        <label for='check'>Lembrar Senha</label>
                        <input 
                        type='checkBox' id='check' name='check' disabled={disabled} 
                        value={rememberPassword}
                        onChange={()=>setRememberPassword(!rememberPassword)}
                        />
                    </div>

                    <div className="area">
                        <button disabled={disabled}>Fazer Login</button>
                    </div>
                </form>
            </PageArea>
        </PageContainer>
    )
}