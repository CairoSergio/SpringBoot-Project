package com.cairo.produtosback.Produtos.Servicos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cairo.produtosback.Produtos.Modelos.ProdutosModelo;
import com.cairo.produtosback.Produtos.Repositorio.ProdutoRepositorio;
import com.cairo.produtosback.Produtos.Modelos.RespostaModelo;

@Service
public class ProdutoServico {

    @Autowired
    private ProdutoRepositorio pr;

    @Autowired
    private RespostaModelo rm;

    // Metodo para listar todos os produtos
    public Iterable<ProdutosModelo> listar() {
        return pr.findAll();
    }

    // Metodo para cadastrar produtos

    public ResponseEntity<?> cadastrarAlterar(ProdutosModelo pm, String acao) {
        if (pm.getNome().equals("")) {
            rm.setMensagem("O nome do produto é obrigatorio");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getMarca().equals("")) {
            rm.setMensagem("a marca do produto é obrigatoria");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getImagem().equals("")) {
            rm.setMensagem("a imagem do produto é obrigatoria");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getPreco().equals("")) {
            rm.setMensagem("O Preço do produto é obrigatoria");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);

        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<ProdutosModelo>(pr.save(pm), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<ProdutosModelo>(pr.save(pm), HttpStatus.OK);

            }
        }
    }

    // Remover
    public ResponseEntity<RespostaModelo> remover(long id) {

        pr.deleteById(id);
        rm.setMensagem("O Produto foi removido com sucesso");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);

    }
}
