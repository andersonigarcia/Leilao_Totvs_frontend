<template>
  <q-page padding>
    <div class="q-gutter-y-sm q-ma-sm">
    <form @reset.prevent.stop="onReset">
      <q-card flat bordered class="q-mt-sm">
        <q-card-section>
          <span class="a-text-dense-sm">Leilão</span>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-x-md">
              <q-input  type="text" maxlength="100" outlined dense class="col-grow " label="Titulo *" stack-label />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-x-md">
              <q-input  type="text" maxlength="100" outlined dense class="col-grow " label="Responsável *" stack-label />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row ">
            <div class="col q-mr-sm">
                <q-input filled v-model="dateInicio">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateInicio" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="dateInicio" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
            </div>
            <div class="col q-ml-sm">
                <q-input filled v-model="dateEncerramento">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateEncerramento" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="dateEncerramento" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
            <div class="row">
              <div class="q-gutter-sm">
                <q-radio v-model="statusLeilao" val="green" label="Aberto" color="green" />
                <q-radio v-model="statusLeilao" val="black" label="Encerrado" color="black"/>
                <q-radio v-model="statusLeilao" val="red" label="Cancelado" color="red" />
              </div>
            </div>
        </q-card-section>
      </q-card>
     <q-card flat bordered class="q-mt-sm">
          <q-card-section>
            <span class="a-text-dense-sm">Produto </span>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="q-gutter-sm">
                <q-radio v-model="situacaoProduto" val="teal" label="Produto Novo" color="teal" />
                <q-radio v-model="situacaoProduto" val="orange" label="Produto Usado" color="orange" />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-x-md">
                <q-input  type="text" maxlength="100" outlined dense class="col-grow " label="Produto *" stack-label />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col">
                <q-input maxlength="15" class="q-mr-sm" v-model="valorInicial" label="Preço base" />
              </div>
              <div class="col">
                  <q-input filled maxlength="15" class="q-ml-sm" readonly v-model="LanceMinimo" label="Lance inicial (valor base + importos)" />
              </div>
            </div>
          </q-card-section>
      </q-card>
      <div class="row">
        <div>
          <q-btn push class="q-mt-sm" color="primary" label="Cancelar"/>
          <q-btn push class="q-mt-sm q-ml-sm" color="primary" disable  label="Salvar"/>
        </div>
      </div>
    </form>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Leiloes',
  data () {
    return {
      dateInicio: '2019-02-01 12:44',
      dateEncerramento: '2019-02-05 20:00',
      situacaoProduto: 'orange',
      statusLeilao: 'green',
      valorInicial: '',
      LanceMinimo: ''
    }
  },
  computed: {
    nome: {
      get () { return this.getState('nome') },
      set (value) { this.setState('nome', value) }
    },
    stateOriginal () { return this.$store.state.Workflow.original },
    stateUnchanged () { return false }
  },
  methods: {
    onReset () {
      if (this.stateUnchanged) { this.$router.push('pathList') }
      this.dialogVisible = true
      this.dialogMessage = 'Os dados alterados e não salvos serão perdidos. Confirma?'
    }
  }
}
</script>
