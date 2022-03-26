export default interface ILocalidade {
    id_localidade: number;
    co_localidade: string;
    id_diocese: string;
    id_tipo_local: number;
    id_cidade: number;
    no_localidade: string;
    tx_observacao: string;
    id_pes_upd: number;
    dt_upd: string;
    id_pes_del: number;
    dt_del: number;
    tx_endereco: string;
    tx_complemento: string;
    tx_bairro: string;
    tx_cep: string;
}