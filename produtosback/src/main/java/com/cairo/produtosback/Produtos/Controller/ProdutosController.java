package com.cairo.produtosback.Produtos.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cairo.produtosback.Produtos.Modelos.ProdutosModelo;
import com.cairo.produtosback.Produtos.Servicos.ProdutoServico;

@RestController
@CrossOrigin(origins = "*")
public class ProdutosController {

    @Autowired
    private ProdutoServico ps;

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ProdutosModelo pm) {
        return ps.cadastrarAlterar(pm, "alterar");
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable long id) {
        return ps.remover(id);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutosModelo pm) {
        return ps.cadastrarAlterar(pm, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<ProdutosModelo> listar() {
        return ps.listar();

    }

    @GetMapping("/")
    public String rota() {
        return "API de produtos funcionando";
    }

}
