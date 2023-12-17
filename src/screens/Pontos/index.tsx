import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toaster, Heading } from "evergreen-ui";
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    id: number;
    nome: string;
}

export function Pontos() {
    const [pontos, setPontos] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Download',
            dataIndex: 'id',
            key: 'download', // Adicionada chave única para esta coluna
            render: (item, index) => (
                <Button type="primary" size="small" onClick={() => imprimirPonto(item)}>Gerar</Button>
            ),
        },
    ];

    async function fetchPontos() {
        try {
            setLoading(true);
            const { data } = await api.get('/ponto/paginacao');
            setPontos(data);
        } catch (error) {
            toaster.danger('Erro ao buscar os pontos');
        } finally {
            setLoading(false);
        }
    }

    async function imprimirPonto(value: any) {
        try {
            const { data } = await api.post(`/ponto/imprimir/${value}`, {}, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            const blob = new Blob([data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(blob);
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Error while fetching or displaying PDF:', error);
            toaster.danger('Error while fetching or displaying PDF');
        }
    }

    useEffect(() => {
        fetchPontos();
    }, []);

    return (
        <div>
            <Table loading={loading} columns={columns} dataSource={pontos} rowKey="id" />
        </div>
    );
}
