<template>
  <div>
    <h2 class="subtitle">Cadastro de Usuário</h2>
    <form>
      <div class="field">
        <label class="label"  for="email">Email</label>
        <div class="control">
          <input type="text" id="email" v-model="email" @blur="verifica_email()" @click="limpar_correcao_email()">
        </div>
        <div style="color: red;">{{ correcao_email }}</div>
      </div>
      <div class="field">
        <label class="label"  for="nome">Nome</label> 
        <div class="control">
          <input type="text" id="nome" v-model="nome" @blur="verifica_nome()" @click="limpar_correcao_nome()">
        </div>
        <div style="color: red;">{{ correcao_nome }}</div>
      </div>
      <div class="field">
        <label class="label"  for="senha">Senha</label>
        <div class="control">
          <input type="password" id="senha" v-model="senha" @blur="verifica_senha()" @click="limpar_correcao_senha()">
        </div>
        <div style="color: red;">{{ correcao_senha }}</div>
      </div>
      <div class="field">
        <label class="label"  for="confirmacao_senha">Confirmação Senha</label> 
        <div class="control">
          <input type="password" id="confirmacao_senha" v-model="confirmacao_senha" @blur="verifica_confirmacao_senha()" @click="limpar_correcao_confirmacao_senha()">
        </div>
        <div style="color: red;">{{ correcao_confirmacao_senha }}</div>
      </div>
      <div class="linha_form">
        <input type="reset" class="button is-warning" value="Limpar">&nbsp;
        <input type="button" value="Enviar"  class="button is-warning" @click="enviar()"><br>
        <router-link to="/">Voltar para Login</router-link>
      </div>
    </form>
  </div>
</template>
<script>
  import { api } from "@/services/api.js";
  export default {
    name: 'Cadastro',
    data: () =>({
      email: '',
      correcao_email: '',
      nome: '',
      correcao_nome: '',
      senha: '',
      correcao_senha: '',
      confirmacao_senha: '',
      correcao_confirmacao_senha: '',
      email_pode_cadastrar: false,
    }),
    methods: {
      async verifica_email() {
        if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(this.email)) {
            this.correcao_email = "É necessário informar o email do usuário.";
        }
        else 
        {
          const dados = await api.consultar_email({email: this.email});
          if(dados.status == 200)
          {
            if(dados.data.email_jah_cadastrado == 'false')
            {
              this.correcao_email = "Esse email pode ser cadastrado.";
              this.email_pode_cadastrar = true;
            }
            else 
            {
              this.correcao_email = "Esse email já foi cadastrado.";
              this.email_pode_cadastrar = false;
            }
          }
          else 
          {
            this.correcao_email = "Não é possível verificar o email";
            this.email_pode_cadastrar = false;
          }
          
        }
      },
      limpar_correcao_email() 
      {
        this.correcao_email = "";
      },
      verifica_nome()
      {
        if(String(this.nome).length < 3)
        {
          this.correcao_nome = "É necessário preencher o nome com pelo menos 3 caracteres alfanuméricos.";
        }
      },
      limpar_correcao_nome()
      {
        this.correcao_nome = '';
      },
      verifica_senha()
      {
        if(!this.senha)
        {
          this.correcao_senha = "É necessário informar a senha.";
        }
      },
      limpar_correcao_senha()
      {
        this.correcao_senha = "";
      },
      verifica_confirmacao_senha()
      {
        if(!this.confirmacao_senha)
        {
          this.correcao_confirmacao_senha = "É necessário preencher a confirmação da senha.";
        }
      },
      limpar_correcao_confirmacao_senha()
      {
        this.correcao_confirmacao_senha = "";
      },
      validar_form() {
            var ok = true;
            var mensagem = "Foram encontrados alguns erros:\n";
          
            if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(this.email)) {
                ok = false;
                mensagem += "É necessário preencher o email do usuário adequadamente.\n";
            }
            if (String(this.nome).length < 3) {
                ok = false;
                mensagem += "É necessário preencher o nome do usuário.\n";
            }
            if (!this.senha) {
                ok = false;
                mensagem += "É necessário preencher a senha do usuário.\n";
            }
            if (!this.confirmacao_senha) {
                ok = false;
                mensagem += "É necessário preencher a confirmação da senha do usuário.\n";
            }
            if (this.senha != this.confirmacao_senha) {
                ok = false;
                mensagem += "A senha e a confirmação da senha não conferem.\n";
            }
            if (!ok)
                alert(mensagem);
            return ok;
        },
        async enviar() {
            if (!this.validar_form())
                return;
            const resultado = await api.cadastrar_usuario({
              nome: this.nome,
              email: this.email,
              confirmacao_senha: this.confirmacao_senha,
              senha: this.senha
            });
            if(resultado == 201)
            {
              alert("Usuário Cadastrado!");
              this.$router.push('/');
            }
            else 
            {
              alert("falha ao cadastrar o usuário");
            }
        }
    }
  }
  
</script>
<style>
  .linha_form {
    margin-bottom: 0.5em;
  }
</style>