<template>
  <div>
    <h2 class="subtitle">Login</h2>
    <form>
      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
          <input type="text" v-model="email" id="email" maxlength="255" @click="limpar_correcao_email()" @blur="verifica_email()">
        </div>
        
        <div style="color: red;">{{ correcao_email }}</div>
      </div>
      <div class="field">
        <label class="label"  for="senha">Senha</label> 
        <div class="control">
          <input type="password" v-model="senha" id="senha" maxlength="8" @blur="verifica_senha()" @click="limpar_correcao_senha()">
        </div>
      </div>
      <div class="field">
        <input type="reset" class="button is-warning" value="Limpar"> &nbsp;
        <input type="button" class="button is-warning"  value="Enviar" @click="enviar()">
      </div>
      <router-link to="/cadastro">Não possui login? Cadastre-se.</router-link>
    </form>
  </div>
</template>
<script>
  import { api } from "@/services/api.js";
  export default {
    name: 'Login',
    data: () => ({
        email: '',
        senha: '',
        correcao_email: ''
    }),
    methods: {
        verifica_email() {
            if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(this.email)) {
                this.correcao_email = "É necessário informar o email do usuário.";
            }
        },
        limpar_correcao_email() {
            this.correcao_email = "";
        },
        verifica_senha() {
            if (!this.senha) {
                this.correcao_senha = "É necessário informar a senha do usuário.";
            }
        },
        limpar_correcao_senha() {
            this.correcao_senha = "";
        },
        validar_form() {
            var ok = true;
            var mensagem = "Foram encontrados alguns erros:\n";
            var email = this.email;
            var senha = this.senha;
            if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email)) {
                ok = false;
                mensagem += "É necessário preencher o email do usuário adequadamente.\n";
            }
            if (!senha) {
                ok = false;
                mensagem += "É necessário preencher a senha do usuário.\n";
            }
            if (!ok)
                alert(mensagem);
            return ok;
        },
        async enviar() {
            if (!this.validar_form())
                return;
            const resposta = await api.login({
              email: this.email,
              senha: this.senha
            });
            if(resposta.status == 200)
            {
              window.localStorage.logado = true;
              window.localStorage.token = resposta.data.token;
              this.$router.push('/listacontatos');
            }
            else 
              alert("Acesso negado!");
        }
    },
}
</script>
<style>
  .linha_form {
    margin-bottom: 0.5em;
  }
</style>
