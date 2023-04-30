package com.cairo.produtosback.Produtos.Repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cairo.produtosback.Produtos.Modelos.ProdutosModelo;

@Repository
public interface ProdutoRepositorio extends CrudRepository<ProdutosModelo, Long> {

}
