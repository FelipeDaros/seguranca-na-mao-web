import { useEffect, useState } from "react"
import { api } from "../../config/apit"
import { Table, toaster, Button, Heading } from "evergreen-ui";
import pdf from "pdfmake";

export function Pontos() {
    const [pontos, setPontos] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchPontos() {
        try {
            setLoading(true);
            const { data } = await api.get('/ponto/paginacao');
            setPontos(data);
        } catch (error) {
            toaster.danger('Erro ao buscar os pontos');
        } finally {
            setLoading(false)
        }
    }

    async function imprimirPonto(value: any) {
        try {
            const { data } = await api.post(`/ponto/imprimir/${value}`, {}, {
                responseType: 'blob', // Fix typo in 'responseType'
                headers: {
                    'Content-Type': 'application/pdf'
                }
            });
    
            // Create a Blob from the response data
            const blob = new Blob([data], { type: 'application/pdf' });
    
            // Create a URL for the Blob and open it in a new window or tab
            const pdfUrl = URL.createObjectURL(blob);
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Error while fetching or displaying PDF:', error);
            toaster.danger('Error while fetching or displaying PDF');
        }
    }

    useEffect(() => {
        fetchPontos();
    }, [])

    return (
        <div>
            <Heading size={800} style={{textAlign: 'center', marginTop: 20}}>Pontos</Heading>
            <div className="container">
                <Table style={{ width: "60rem" }}>
                    <Table.Head>
                        <Table.TextHeaderCell textAlign="center">Identificador</Table.TextHeaderCell>
                        <Table.TextHeaderCell textAlign="center">Nome</Table.TextHeaderCell>
                        <Table.TextHeaderCell textAlign="center">Abrir</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.VirtualBody height={400} maxHeight={400}>
                        {pontos.map((ponto: any) => (
                            <Table.Row key={ponto.id}>
                                <Table.TextCell textAlign="center">{ponto.id}</Table.TextCell>
                                <Table.TextCell textAlign="center">{ponto.nome}</Table.TextCell>
                                <Table.TextCell textAlign="center"><Button intent="success" onClick={() => imprimirPonto(ponto.id)}>Imprimir</Button></Table.TextCell>
                            </Table.Row>
                        ))}
                    </Table.VirtualBody>
                </Table>
            </div>
        </div>
    )
}