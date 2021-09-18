
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Api from '../../service/api'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const api = new Api();


export default function Index() {
    const [produtos, setProdutos] = useState([]);
    const [idalterando, setIdAlterando] = useState(0);
    const [nm_produto, setNm_produto] = useState('');
    const [ds_categoria, setDs_categoria] = useState('');
    const [vl_preco_de, setVl_preco_de] = useState('');
    const [vl_preco_por, setVl_preco_por] = useState('');
    const [vl_avaliacao, setVl_avaliacao] = useState('');
    const [ds_produto, setDs_produto] = useState('');
    const [qtd_estoque, setQtd_estoque] = useState('');
    const [bt_ativo, setBt_ativo] = useState(true);
    const [img_produto, setImg_produto] = useState('');
    const [ds_descricao, setDs_descricao] = useState('');
    const [dt_inclusao, setDt_inclusao] = useState(new Date());

    const loading = useRef(null);

    

    async function listar() {
        let r = await api.listar();
        setProdutos(r);
    }

    async function limpar(){
        setIdAlterando(0)
        setNm_produto('')
        setDs_categoria('')
        setVl_preco_de('')
        setVl_preco_por('')
        setVl_avaliacao('')
        setDs_produto('')
        setQtd_estoque('')
        setImg_produto('')
        setDs_descricao('')
    }
    async function inserir() {
        
        console.log(loading)
        loading.current.continuousStart();
        if(nm_produto == '' || ds_categoria == ''  || vl_avaliacao == '' || qtd_estoque == '' || vl_preco_de == ''  || vl_preco_por == '' || img_produto == ''  || ds_descricao == '' )
        return toast.dark("os campos são obrigatórios")
        if(idalterando === 0){
                                 
            if(vl_avaliacao < 0 )
            return toast.dark('Número inválido')
            
            let r = await api.inserir(nm_produto, ds_categoria, vl_preco_de, vl_preco_por, vl_avaliacao, ds_produto, qtd_estoque, img_produto, bt_ativo, dt_inclusao)
            if(r.erro){
                toast.dark(r.erro)
            } else {
                toast.dark('Produto Inserido')
            }
           loading.current.complete();
         } else {   
           
            let r = await api.alterar(idalterando, nm_produto, ds_categoria, vl_preco_de, vl_preco_por, vl_avaliacao, ds_produto, qtd_estoque, img_produto, bt_ativo, dt_inclusao)
            if(r.erro){
                toast.error(r.erro)
            } else {
                toast.dark('Produto Alterado')
            }
            
           }
           limpar()
           listar()
       }

       async function remover(id){
        confirmAlert({
            title: 'Remover produto',
            message: `Tem certeza que deseja remover o produto ${id} ?`,
            buttons: [
                {
                    label:'Sim',
                    onClick: async () =>{
                        let r = await api.remover(id);
                        if(r.erro)
                        toast.error(`${r.erro}`);
                        else{
                            toast.dark('💕 Aluno removido!');
                            listar();
                        }
                    }
                },
                {
                    label:'Não'
                }
            ]
        });
       
    }
    


    async function editar(item) {
        setIdAlterando(item.id_produto)
        setNm_produto(item.nm_produto);
        setDs_categoria(item.ds_categoria);
        setVl_preco_de(item.vl_preco_de);
        setVl_preco_por(item.vl_preco_por);
        setVl_avaliacao(item.vl_avaliacao);
        setDs_produto(item.ds_produto);
        setQtd_estoque(item.qtd_estoque);
        setImg_produto(item.img_produto);
        setDs_descricao(item.ds_produto);
        
    }
    
    

    useEffect(() => {
        listar();
    }, [])

    return (
        <Container>
            <ToastContainer/>
            <LoadingBar color='#119FDC' ref={loading}/>
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student">{idalterando == 0 ? "Novo Produto" : "Alterando Produto " + idalterando }</div>
                        </div>
                    <div class="mae">
                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nm_produto} onChange={e=> setNm_produto(e.target.value)} /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={ds_categoria} onChange={e=> setDs_categoria(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={vl_avaliacao} onChange={e=> setVl_avaliacao(e.target.value)}/> </div> 
                                </div>
                            </div>
                            
                                <div class="input-right">
                                    <div class="agp-input">
                                        <div class="corse-student"> Preço DE: </div>  
                                        <div class="input"> <input type="text" value={vl_preco_de} onChange={e=> setVl_preco_de(e.target.value)}/> </div>  
                                    </div>
                                    <div class="agp-input">
                                        <div class="class-student" id="foi"> <spam>Preço POR:</spam> </div>  
                                        <div class="input" > <input type="text" value={vl_preco_por} onChange={e=> setVl_preco_por(e.target.value)} /> </div> 
                                    </div>
                                    <div class="agp-input">
                                        <div class="class-student" id="vai"><spam>Estoque:</spam></div>  
                                        <div class="input"> <input type="text" value={qtd_estoque} onChange={e=> setQtd_estoque(e.target.value)} /> </div> 
                                    </div>
                                    
                                </div>
                                    
                        </div>
                        <div class="u-input">
                                        <div class="class-student" id="vai"><spam>Link Imagem:</spam></div>  
                                        <div class="input2"> <input  type="text" value={img_produto} onChange={e=> setImg_produto(e.target.value)}/> </div> 
                        </div>
                        <div class="u-input2">
                                        <div class="class-student"  id="esse"><spam>Descrição:</spam></div>  
                                        <div class="input2"> <textarea type="text" value={ds_descricao} onChange={e=> setDs_descricao(e.target.value)}/> </div> 
                        </div>

                            <div class="button-create"> <button onClick={inserir}> {idalterando == 0 ? "Cadastrar" : "Alterar"} </button> </div>
                        </div>
                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Cadastrados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th class="img"></th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>

                                </tr>
                            </thead>
                    
                            <tbody>
                                {produtos.map((item, i) =>
                                    <tr class={ i % 2 == 0 ? "linha-alternada" : ""}>
                                        <td> <img style={{height:'3em', width:'3em'}} src={item.img_produto} alt="img-produto"/> </td>
                                        <td> {item.id_produto} </td>
                                        <td title={item.nm_produto}>{item.nm_produto != null && item.nm_produto.length >= 25? item.nm_produto.substr(0, 25) + '...': item.nm_produto }</td>
                                        <td> {item.ds_categoria} </td>
                                        <td> {item.vl_preco_por} </td>
                                        <td> {item.qtd_estoque} </td>
                                        <td className="coluna-acao"> <button onClick={() => editar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                        <td className="coluna-acao"> <button onClick={() => remover(item.id_produto) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                    </tr>
                                )}
                            
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
