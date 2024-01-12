import {Produto} from 'app/models/produtos'
interface TabelaProdutoProps{
    produtos:Array<Produto>;
    onEdit:(produto)=>void;
    onDelete:(produto)=>void;
}
export const TabelaProduto: React.FC<TabelaProdutoProps>= ({
    produtos,
    onEdit,
    onDelete
})=>{
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>SKU</th>
                    <th>Descricao</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                    {
                     produtos.map(produto=>
                        <ProdutoRow onDelete={onDelete} 
                        onEdit={onEdit} key={produto.id}
                         produto={produto}
                    />)
                    
                    }
            </tbody>
        </table>
    )
}
interface ProdutoRowProps{
    produto:Produto;
    onEdit:(produto)=>void;
    onDelete:(produto)=>void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onEdit,
    onDelete
})=>{
    return(
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.descricao}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>

            <td>
                <button onClick={e=> onEdit(produto)} 
                    className="button is-info is-rounded is-small">
                        Editar
                </button>

                <button  onClick={e=>onDelete(produto)} 
                    className="button is-danger is-rounded is-small">
                    Excluir
                </button>

            </td>
        </tr>
    )

}