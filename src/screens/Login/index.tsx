import { useState } from 'react';
import { Button, TextInputField, Heading, toaster } from 'evergreen-ui';
import './style.css'; // Importando o arquivo CSS criado
import { useAuth } from '../../context/AuthContext';

export function Login() {
    const { signIn } = useAuth();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(){
        if(!nome || !senha){
            toaster.warning('Usuário e senha são obrigatórios');
            return;
        }
        try {
            setLoading(true);
            await signIn(nome, senha);
            toaster.success("Login efetuado com sucesso!");
            return;
        } catch (error: any) {
            console.log(error)
            toaster.danger("Erro ao efetuar o login");
            return;
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <Heading size={800} marginY={50}>Segurança na mão</Heading>
            <div className="form-field">
                <TextInputField
                    label="Usuário"
                    description="Informe o usuário"
                    onChange={(e: any) => setNome(e.target.value)}
                />
            </div>
            <div className="form-field">
                <TextInputField
                    label="Senha"
                    description="Informe a senha"
                    type='password'
                    onChange={(e: any) => setSenha(e.target.value)}
                />
            </div>
            <Button isLoading={loading} onClick={handleLogin} intent="success">
                Efetuar login
            </Button>
        </div>
    )
}
