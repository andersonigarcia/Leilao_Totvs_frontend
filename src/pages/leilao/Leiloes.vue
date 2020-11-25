
<template>
  <q-page padding>
    <div>
      <q-table class="a-text-dense-ab" dense :data="categorias" :columns="columns" hide-header row-key="cliente_id" :rows-per-page-options="[]" :pagination.sync="pagination" :loading="loading" :filter="filter" @request="onRequest" >
        <template v-slot:body="props">
          <q-tr :props="props" >
            <q-td :props="props.categoria_id" auto-width>
                <q-btn icon="collections_bookmark" dense size="0.65em" color="brand-3" @click="edicao(props.row)"/>
            </q-td>
            <q-td :props="props.categoria_nome">
              <div >{{ props.row.categoria_nome }}</div>
            </q-td>
            <q-td :props="props.contato_nome">
              <div :class=" props.row.categoria_dependentes ? 'a-text-caption-sm text-grey-8' : 'text-grey-5'"  > {{ canDelete(props.row.categoria_dependentes) ? `${props.row.categoria_dependentes} produto(s) associado(s) à essa leilão`:'Nenhum produto associado à essa leilão' }}</div>
            </q-td>
            <q-td >
              <q-btn icon="delete" class="c-btn-del" :disable="canDelete(props.row.categoria_dependentes)" :class="(canDelete(props.row.categoria_dependentes) ? 'text-brand-4':'')" dense flat size="0.65em" color="brand-3" @click="exclude(props.row)"/>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <q-btn color="brand-3" size="sm" icon="add" class="q-mr-xs" @click="novo"/>
          <input-dialog :title="dscTitle" message="Informe o nome da leilão" :visible="inputVisible" default="ok" @option="option" :value="nome"/>
        </template>
        <template >
          <q-input borderless dense debounce="100" v-model="filter" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
      </q-table>
      <confirmation-dialog :visible="confirmationVisible" :message="confirmationMessage" @option="confirmatioDialog" @hide="confirmationVisible = false"/>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Leiloes',
  data () {
    return {
      confirmationVisible: false,
      confirmationMessage: '',
      columns: [
        { name: 'leilao_id', label: 'Codigo', field: 'leilao_id', align: 'left', sortable: true },
        { name: 'valor_inicial', label: 'Preço base', field: 'valor_inicial', required: true, align: 'left' },
        { name: 'lance_minimo', label: 'Lance mínimo', field: 'lance_minimo', required: true, align: 'left', sortable: true },
        { name: 'lance_minimo', label: 'Peço base', field: 'valor_inicial', required: true, align: 'left' }
      ],
      dados: [],
      dscTitle: '',
      filter: '',
      inputVisible: false,
      loading: false,
      nome: '',
      pagination: { sortBy: 'categoria_nome', descending: false },
      produtoId: ''
    }
  },
  computed: {
    categorias () {
      const filtro = this.filter.toLowerCase()
      if (!filtro) return this.dados
      const result = this.dados.filter((el) => { return el.categoria_nome.toLowerCase().includes(filtro) })
      return result
    }
  },

  methods: {
    ...mapActions('Leilao', ['getLeiloes', 'deletCategoria', 'postCategoria', 'putCategoria']),

    canDelete (dependencias) { return dependencias > 0 },
    clearValue () {
      this.nome = ''
      this.produtoId = ''
      this.inputVisible = false
    },
    novo () {
      this.clearValue()
      this.inputVisible = true
      this.dscTitle = 'Cadastrar leilão'
    },
    async post (nome) {
      const obj = { nome: nome }
      const result = await this.postCategoria(obj)
      if (result.success) {
        this.$app.ok('Item incluído com sucesso!', 1000)
        this.onRequest()
      }
    },
    edicao (item) {
      this.inputVisible = true
      this.dscTitle = 'Alterar leilão'
      this.nome = item.categoria_nome
      this.produtoId = item.categoria_id
    },
    async put (nome) {
      const obj = { id: this.produtoId, nome: nome }
      const result = await this.putCategoria(obj)

      if (!result.success) { return }

      this.$app.ok('Item alterado com sucesso!', 1000)
      this.onRequest()
    },
    option (val, data) {
      switch (val) {
        case 'include':
          if (this.produtoId !== '') { this.put(data) } else { this.post(data) }
          this.clearValue()
          break
        case 'cancel':
          this.clearValue()
          break
        default:
          this.clearValue()
          break
      }
    },
    exclude (item) {
      this.confirmationVisible = true
      this.produtoId = item.categoria_id
      this.confirmationMessage = `Confirma a EXCLUSÃO do leilão ${item.categoria_nome} ?`
    },
    confirmatioDialog (confirm) {
      if (confirm === 'cancel') { return }
      this[confirm]()
    },
    async ok () {
      this.$q.loading.show()
      const result = await this.deletCategoria(this.produtoId)

      if (!result.success) { return }

      this.$app.ok('Exclusão concluída!', 1000)
      this.onRequest()
    },
    async onRequest (props) {
      debugger
      const result = await this.getLeiloes()
      if (!result.success) return
      this.dados = result.categorias
      this.pagination.rowsPerPage = this.dados.length
      this.$q.loading.hide()
    }
  },
  mounted () {
    this.onRequest()
  }
}
</script>

<style lang="stylus" scoped>
  .c-btn-del {
    float: right;
  }
</style>
