import axios,{AxiosPromise } from "axios"
import { ProdutosData } from "../interfaces/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080'

const postData = async (data:ProdutosData): AxiosPromise<any> => {
    if(data.id){
        const response = await axios.put(API_URL + '/alterar', data)
        return response;
    }else{
        const response = await axios.post(API_URL + '/cadastrar', data)
        return response;
    }
}


export function useProdutosMutate(){
    const queryclient = useQueryClient();
    const mutate = useMutation({
        mutationFn:postData,
        retry:2,
        onSuccess:()=>{
            queryclient.invalidateQueries(["produtos-data"])
        }
    })

    return mutate;

}