import axios,{AxiosPromise } from "axios"
import { ProdutosData } from "../interfaces/interfaces"
import { useQuery } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080'

const fechData = async (): AxiosPromise<ProdutosData[]> => {
    const response = await axios.get(API_URL + '/listar')
    return response;
}


export function useProdutosData(){
    const query = useQuery({
        queryFn:fechData,
        queryKey:['produtos-data'],
        retry:2
    })

    return {
        ...query,
        data: query.data?.data
    }
}