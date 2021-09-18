import axios from 'axios'
const api = axios.create({
    baseURL:'http://localhost:3030/'
})

export default class Api{
    async listar(){
        let r = await api.get('/produto');
        return r.data;
    }
    async inserir(nm_produto, ds_categoria, vl_preco_de, vl_preco_por, vl_avaliacao, ds_produto, qtd_estoque, img_produto, bt_ativo, dt_inclusao){
        let r = await api.post('/produto',{nm_produto:nm_produto, ds_categoria:ds_categoria, vl_preco_de:vl_preco_de, vl_preco_por:vl_preco_por, vl_avaliacao:vl_avaliacao, ds_produto:ds_produto, qtd_estoque:qtd_estoque, img_produto:img_produto, bt_ativo:bt_ativo, dt_inclusao:dt_inclusao });
        return r.data;
    }


    async alterar(id, nm_produto, ds_categoria, vl_preco_de, vl_preco_por, vl_avaliacao, ds_produto, qtd_estoque, img_produto, bt_ativo, dt_inclusao){
        let r = await api.put('/produto/' + id,{ nm_produto, ds_categoria, vl_preco_de, vl_preco_por, vl_avaliacao, ds_produto, qtd_estoque, img_produto, bt_ativo, dt_inclusao });
        return r.data;
    }

    async remover(id){
        let r = await api.delete('/produto/' + id);
        return r.data;
    }




}
