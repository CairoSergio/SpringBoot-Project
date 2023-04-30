import './App.css'
import React,{useState} from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { useProdutosData } from './hooks/useProdutosData'
import { ProdutosData } from './interfaces/interfaces'
import { useProdutosMutate } from './hooks/UseProdutosMutate'
import { useDeleteData } from './hooks/UseProdutosDelete'
function App() {
  const [modal, setModal ] = useState(false)
  const [nome, setNome ] = useState("")
  const [marca, setMarca] = useState("")
  const [imagem, setImagem] = useState("")
  const [ preco, setPreco ] = useState("")
  const [id, setCurrentid] = useState<number | undefined | null>(null)

  const {data} = useProdutosData()
  const {mutate} = useProdutosMutate();
  const deleteItem   = useDeleteData();


  const EliminarDado = (identity: any) =>{
    deleteItem.mutate(identity)
  }
  const SumbitDates =  () =>{
    if(id){
      const fechData: ProdutosData = {
        id,
        nome,
        marca,
        imagem,
        preco
      }
      mutate(fechData)

    }else{
      const fechData: ProdutosData = {
        nome,
        marca,
        imagem,
        preco
      }
      mutate(fechData)
    }
    closModal()
  }
  const EditarProduto = (produto:ProdutosData) =>{
    setNome(produto.nome)
    setImagem(produto.imagem)
    setPreco(produto.preco)
    setMarca(produto.marca)
    setCurrentid(produto.id)
    setModal(true)
  }
  const closModal = ()=>{
    setNome("")
    setImagem("")
    setPreco("")
    setMarca("")
    setCurrentid(null)
    setModal(false)

  }

  return (
    <div className='flex flex-col w-screen items-center justify-center'>
      <h1 className="text-slate-800 font-extrabold text-4xl mt-20">
        Produtos
      </h1>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        {
          data?.map((produto, i)=>(
            <div key={i} className='p-3 shadow-lg flex flex-col w-72 h-96 rounded-xl  bg-white'>
              <div className='h-64 max-w-72 items-center flex mt-3'>
                <img className='max-h-full max-w-f' src={produto.imagem}/>
              </div>
              <h1 className='mt-3 text'>Modelo: <span className='font-normal'>{produto.nome}</span></h1>
              <h1 className='mt-1 text'>Marca: <span className='font-normal'>{produto.marca}</span></h1>
              <h1 className='mt-1 text'>Preço: <span className='font-normal'>{produto.preco}MT</span></h1>
              <div className='absolute z-20 flex flex-row gap-4'>
                <FaTrash onClick={()=>EliminarDado(produto.id)} className='cursor-pointer' size={20} color="#f16969"/> 
                <FaEdit onClick={()=>EditarProduto(produto)}  className='cursor-pointer' size={20}/>
              </div>
            </div>
          ))
        }
      </div>
      {
        modal &&
        <div className='backdrop-blur-md backdrop-filter z-50 fixed overflow-hidden inset-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-50 '>
          <div className='relative w-2/4 p-5 bg-white rounded-lg items-center flex flex-col'>
            <h1 className='text-2xl font-extrabold text-slate-600'>
              {id ? 'Atualizar Produto' : "Novo Produto"}
            </h1>
            <AiOutlineClose onClick={closModal} size={24} className="absolute top-6 right-14 cursor-pointer"/>
            <div className='mt-3 flex flex-col w-11/12'>
              <h1 className='text-xl font-extrabold text-slate-600'>Nome</h1>
              <input value={nome} onChange={(e)=>setNome(e.target.value)} className='w-full h-12 rounded-md border-slate-800 border-2 px-3'/>
            </div>
            <div className='mt-3 flex flex-col w-11/12'>
              <h1 className='text-xl font-extrabold text-slate-600'>Marca</h1>
              <input value={marca} onChange={(e)=>setMarca(e.target.value)} className='w-full h-12 rounded-md border-slate-800 border-2 px-3'/>
            </div>
            <div className='mt-3 flex flex-col w-11/12'>
              <h1 className='text-xl font-extrabold text-slate-600'>Imagem</h1>
              <input value={imagem} onChange={(e)=>setImagem(e.target.value)} className='w-full h-12 rounded-md border-slate-800 border-2 px-3'/>
            </div>
            <div className='mt-3 flex flex-col w-11/12'>
              <h1 className='text-xl font-extrabold text-slate-600'>Preço</h1>
              <input value={preco} onChange={(e)=>setPreco(e.target.value)} className='w-full h-12 rounded-md border-slate-800 border-2 px-3'/>
            </div>
            <button onClick={SumbitDates} className='w-11/12 mt-6 bg-sky-500 rounded-lg text-white font-semibold text-xl py-3'>SALVAR</button>
          </div>
        </div>
      }
      <button onClick={()=>setModal(true)} className='hover:px-7 cursor-pointer transition-all absolute bottom-10 right-5 bg-cyan-500 px-6 py-2 rounded-lg text-white font-bold'>Adicionar</button>
    </div>
  )
}

export default App
