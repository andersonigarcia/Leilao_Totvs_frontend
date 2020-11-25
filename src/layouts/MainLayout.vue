
<template>
  <q-layout view="hHH Lpr lfr">
    <q-header elevated class="flat">
      <q-toolbar class="text-white">
        <q-btn flat round dense icon="menu" class="q-mr-sm" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-separator dark vertical inset/>
        <q-toolbar-title>
          <div class="text-subtitle1 a-lh-sm">{{ title }}</div>
          <div class="text-grey-4 a-text-caption-sm a-lh-sm" v-show="subtitle">{{ subtitle }}</div>
        </q-toolbar-title>
        <!-- <q-btn dense flat icon="inbox" class="q-ml-sm">
          <q-badge color="red" floating>9</q-badge>
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-white">
      <q-list>
        <q-item dense clickable to="/" class="bg-grey-3">
          <q-item-section>
            <q-item-label header class="text-h6 a-text-dense text-grey-10"> LEILOAR
              <q-item-label caption class="a-text-dense">Gestão de leilões</q-item-label>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/leilao">
          <q-item-section avatar>
            <q-icon name="point_of_sale"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Listar</q-item-label>
            <q-item-label caption>Lista de Leilões em aberto</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/leilaoEdit">
          <q-item-section avatar>
            <q-icon name="post_add"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Criar</q-item-label>
            <q-item-label caption>Programar um novo leilão</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable :to="signOutUrl">
          <q-item-section avatar>
            <q-icon name="highlight_off"/>
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import urls from '../router/urls'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      identityUrl: urls.identity,
      signOutUrl: urls.singOut
    }
  },

  computed: {
    title () { return this.$route.meta.title },
    subtitle () { return this.$route.meta.subtitle },
    user () { return this.$q.cookies.get(urls.cookieName) }
  }
}
</script>
