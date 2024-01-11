<template>
    <div>
    <h2>{{titulo}} Contato</h2>
    <form>
      <div class="linha_form">
        <label for="nome">Nome</label>&nbsp;
        <input type="text" id="nome" v-model="nome" maxlength="255" @blur="verifica_nome()" @click="limpar_correcao_nome()">
        <div style="color: red;">{{ correcao_nome }}</div>
      </div>
      <div class="linha_form">
        <label for="telefone">Telefone</label>&nbsp; 
        <input type="text" id="telefone" v-model="telefone" @blur="verifica_telefone()" @focus="desformata_telefone()" @click="limpar_correcao_telefone()">
        <div style="color: red;">{{ correcao_telefone }}</div>
      </div>
      <div class="linha_form">
        <input type="reset" value="Limpar">
        <input type="button" value="Gravar Contato" @click="gravar()">
      </div>
      <router-link to="/listacontatos">Voltar</router-link>
    </form>
  </div>
</template>
<script>
import { api } from '@/services/api';

  export default {
    name: 'IncluirContato',
    data: () => ({
      correcao_nome: "",
      correcao_telefone: "",
      nome: "",
      telefone: "",
      id: null,
      id_usuario: null,
    }),
    props: ["tipo_form"],
    computed: {
      titulo()
      {
        return this.tipo_form == 0 ? "Incluir" : "Alterar";
      },
      contato_alterar()
      {
        return this.$store.state.contato;
      }
    },
    methods: {
      verifica_nome()
      {
        if(String(this.nome).length < 3)
        {
          this.correcao_nome = "É necessário incluir o nome do contato com pelo menos 3 letras";
        }
      },
      limpar_correcao_nome() 
      {
        this.correcao_nome = "";
      },
      verifica_telefone()
      {
        this.formata_telefone();
        if(!/[0-9]{2}\s[0-9]{4,5}\-[0-9]{4}/g.test(this.telefone))
        {
          this.correcao_telefone = "É necessário incluir o telefone do contato com ddd + 8 ou 9 dígitos";
        }
      },
      desformata_telefone()
      {
        this.telefone = String(this.telefone).replace(/(\s|\-)/g, "");
      },
      limpar_correcao_telefone()
      {
        this.correcao_telefone = "";
      },
      formata_telefone()
      {
        if(/^[0-9]{10}$/.test(this.telefone))
        {
          this.telefone = String(this.telefone).replace(/([0-9]{2})([0-9]{4})([0-9]{4})/g, "\$1 \$2\-\$3");
        }
        else if(/^[0-9]{11}$/.test(this.telefone))
        {
          this.telefone = String(this.telefone).replace(/([0-9]{2})([0-9]{5})([0-9]{4})/g, "\$1 \$2\-\$3");
        }
      },
      validar_form() 
      {
        var ok = true;
        var mensagem = "Foram encontrados alguns erros:\n";
        var nome = this.nome;
        var telefone = this.telefone.replace(/(\s|\-)/g, "");

        if(nome.length < 3)
        {
          ok = false;
          mensagem += "É necessário preencher o nome com pelo menos 3 letras.\n";
        }
        if(!/[0-9]{10,11}/.test(telefone))
        {
          ok = false;
          mensagem += "É necessário preencher o telefone com ddd + 9 ou 10 dígitos.\n";
        }
        if(!ok)
          alert(mensagem);

        return ok;
      },
      async gravar()
      {
        if(!this.validar_form())
          return;
        if(this.tipo_form == 1)
        {
          const resultado = await api.atualizar_contato(this.id, {
            nome: this.nome,
            telefone: this.telefone,
            id: this.id,
            id_usuario: this.id_usuario
          });
          if(resultado == 200)
          {
            alert("Dados gravados");
            this.$router.push('/listacontatos');
          }
        }
        else 
        {
          const resultado = await api.criar_contato({
            nome: this.nome,
            telefone: this.telefone,
          });
          if(resultado == 201)
          {
            alert("Dados gravados");
            this.$router.push('/listacontatos');
          }
        }
      }
    },
    mounted(){
      if(this.tipo_form == 1)
      {
        this.nome = this.contato_alterar.nome;
        this.telefone = this.contato_alterar.telefone;
        this.id = this.contato_alterar.id;
        this.id_usuario = this.contato_alterar.id_usuario;
      }
    }
  }
</script>
<style>
  .linha_form {
    margin-bottom: 0.5em;
  }
</style>