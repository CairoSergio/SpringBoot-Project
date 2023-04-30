import axios,{AxiosPromise } from "axios"
import { ProdutosData } from "../interfaces/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080'

const deleteData = async (id: string): AxiosPromise<any> => {
    const response = await axios.delete(API_URL + '/remover/' + id )
    return response;
}


export function useDeleteData(){
    const queryclient = useQueryClient();
    const deleteItem = useMutation({
        mutationFn:deleteData,
        retry:2,
        onSuccess:()=>{
            queryclient.invalidateQueries(["produtos-data"])
        }
    })

    return deleteItem;

}