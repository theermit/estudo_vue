<template>
    <div>
        <h2 class="subtitle">Relação de contatos</h2>
        <p><strong>Usuário:</strong> {{nome_usuario}}</p>
        <p class="subtitle"><button type="button" @click="ir_incluir_contato()">Incluir Contato</button></p>
        <table class="table is-bordered is-fullwidth">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(contato, index ) in contatos" :key="contato.id">
                    <td>{{contato.nome}}</td>
                    <td>{{contato.telefone}}</td>
                    <td>
                        <button class="button is-warning" type="button" @click="modificar_contato(index)">Modificar</button>&nbsp;
                        <button class="button is-warning"  type="button" @click="apagar_contato(index)">Apagar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p><button type="button"  class="button is-warning"  @click="sair()">Sair</button></p>
    </div>
</template>
<script>
import { api } from '@/services/api';

  export default {
    name: 'ListaContatos',
    data:() =>({
        contatos: [],
        nome_usuario: null,
    }),
    methods: {
      ir_incluir_contato() 
      {
        this.$router.push('/incluircontato/0');
      },
      async apagar_contato(index)
      {
        if(confirm("Apagar mesmo?"))
        {
          const contato_remover = this.contatos[index];
          const resultado = await api.apagar_contato(contato_remover.id);
          if(resultado == 204)
          {
            this.contatos.splice(index, 1);
            alert("Contato apagado.");
          }
          else 
            alert("Falha ao apagar contato.");
        }
      },
      modificar_contato(index)
      {
        this.$store.commit('SET_CONTATO', this.contatos[index]);
        this.$router.push('/incluircontato/1');
      },
      sair()
      {
        window.localStorage.logado = false;
        window.localStorage.token = null;
        this.$router.push('/');
      },
      async carregar_lista()
      {
        const resposta = await api.selecionar_todos_contatos();
        if(resposta.status == 200)
        {
          this.nome_usuario = resposta.data.nome_usuario;
          this.contatos = resposta.data.contatos;
        }
        else 
          alert("Falha na carga dos dados!");
      }
    },
    mounted()
    {
      this.carregar_lista();
    }
  }
</script>
<style>

</style>