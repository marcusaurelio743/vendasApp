import{useState,useEffect} from 'react'

import { Layout,Input,Message } from "@/components";
import {useProdutoService} from 'app/services'
import {Produto} from 'app/models/produtos'
import{Alert} from '../../common/message'
import {formatReal} from 'app/util/money'
import * as yup from 'yup' 
import Link from 'next/link';
import{useRouter} from 'next/router';

const msg = "O Campo é Obrigatório ";
const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msg),
  nome: yup.string().trim().required(msg),
  descricao: yup.string().trim().required(msg),
  preco: yup.string().trim().required(msg)
})
export const CadastroProdutos: React.FC = ()=>{
    const service = useProdutoService();
    const [sku,setSku] = useState<string>('')
    const [preco,setPreco] = useState<string>('')
    const [nome,setNome] = useState<string>('')
    const [descricao,setDescricao] = useState<string>('')
    const [id,setId] = useState<string>('')
    const[cadastro,setCadastro] = useState<string>('')
    const [messagens,setMessagem] = useState<Array<Alert>>([
     
    ])
    const router = useRouter();
    const{id: queryId} = router.query;
    console.log(queryId);
    useEffect(()=>{
      
      if(queryId){
        service.carregarProduto(queryId).then(produtoEncontrado=>{
          setId(produtoEncontrado.id)
          setSku(produtoEncontrado.sku)
          setDescricao(produtoEncontrado.descricao)
          setNome(produtoEncontrado.nome)
          
          setPreco(formatReal(`${produtoEncontrado.preco}`))
          setCadastro(produtoEncontrado.cadastro)
        })
       
      }
      

    },[queryId])

    const submit = () =>{
       
        const produto: Produto = {
        id,
        sku,
        preco: parseFloat(preco),
        nome,
        descricao
        
        
        }
        validationSchema.validate(produto).then(obj=>{
          if(id ){
          
            service.atualizar(produto).then(response => 
              {
                setMessagem([{
                  texto:"Atualizado com sucesso!!!",tipo:"success"
                }])
              }
              )
  
          }else{
            
            service
            .salvar(produto)
            .then(produtoResponsta =>{
              
                if(produtoResponsta.id ){
                  setId(produtoResponsta.id)
                  {
                    setMessagem([{
                      texto:"Salvo com Sucesso!!!",tipo:"success"
                    }])
                  }
                }
  
                if(produtoResponsta.cadastro ){
                  setCadastro(produtoResponsta.cadastro)
                }
              
            })
  
          }

        }).catch(err => {
          const field = err.path;
          const message = err.message;

          setMessagem([{
            tipo:"danger",
            field,
            texto:message
          }])
        })

       
        
    }


    return(
        <Layout titulo="Cadastro de Produtos" mensagens={messagens}>
          
          { id &&

            <div className="columns"> 
                  <Input id='inputId'
                    label='Código'
                    columnsClasse='is-half '
                    value={id}
                    disabled={true}
                      
                  />
                    
                <Input id='inputCadastro'
                      label='Data Cadastro'
                    columnsClasse='is-half '
                    value={cadastro}
                    disabled={true}
                    
                />

            </div>
          }
             <div className="columns">
               
                <Input id='inputSku'
                  label='SKU*'
                  columnsClasse='is-half '
                  onChange={setSku}
                  value={sku}
                  placeholder='Informe o SKU do produto'
                />
                   
                <Input id='inputPreco'
                     label='Preço*'
                    columnsClasse='is-half '
                    onChange={setPreco}
                    value={preco}
                    placeholder='Informe o Preço do produto'
                    currency={false}
                    maxLength={16}
                />

            </div>

            <Input id='inputNome'
                     label='Nome*'
                    columnsClasse='is-full '
                    onChange={setNome}
                    value={nome}
                    placeholder='Informe o Nome do produto'
             />


            <div className="field column is-full">
                <label className="label" htmlFor="inputdescricao">Descrição*</label>
                
                <div className="control">
                    <textarea className="textarea" id="inputdescricao" value={descricao}
                    onChange={ event => setDescricao(event.target.value)}
                     placeholder="Informe a descrição do produto"></textarea>

                </div>
            </div>

            <div className="field is-grouped">
            <div className="control">
                <button className="button is-primary" onClick={submit}>
                  {
                    id? "Atualizar":"Salvar"
                  }
                </button>
             </div>
             <div className="control">
                <Link href="/consultas/produtos">
                  <button className="button is-warning">Voltar</button>
                </Link>
             </div>


            </div>

            

            
        </Layout>
    )

}