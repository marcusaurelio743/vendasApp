import {Layout} from 'components'
import Link from 'next/link'
import Router from 'next/router'
import {TabelaProduto} from './tabela'
import {Produto} from 'app/models/produtos'
import useSWR from 'swr'
import {httpClient} from 'app/http'
import {AxiosResponse} from 'axios'
import{useProdutoService} from 'app/services'
import{useState,useEffect} from 'react'
import { Alert } from '@/components/common/message'

export const ListagemProdutos: React.FC = ()=>{
    const service = useProdutoService();
    const [messagens,setMessagem] = useState<Array<Alert>>([
     
    ])
    const {data: result ,error} = useSWR<AxiosResponse<Produto[]>>('/api/produtos',url=> httpClient.get(url))
    if(!result){
        return(
            <div>Carregando!!!</div>
        )
    }
    


    const editar=(produto:Produto) =>{
       const url = `/cadastros/produtos?id=${produto.id}`;
       Router.push(url);
    }

    const deletar=(produto:Produto) =>{
        if (window.confirm("Você Deseja Apagar esse Registro?")) {
        
            service.deletar(produto.id).then(response=>{
                alert('Produto Apagado')
                window.location.reload();
             });
        }
        
        
    }
    
    return(
        <Layout titulo='Produtos' mensagens={messagens}>
            <Link href="/cadastros/produtos">
                <button className="button is-warning">Novo</button>
            </Link>

            <br/>
            <TabelaProduto onEdit={editar} onDelete={deletar} produtos={result.data}> 

            </TabelaProduto>

        </Layout>
    )
}