const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue'),
        meta: { title: '', subtitle: 'A eficiência em leilões' }
      },
      {
        name: 'leilao',
        path: '/leilao',
        component: () => import('pages/leilao/Leiloes.vue')
      },
      {
        name: 'leilaoEdit',
        path: '/leilaoEdit',
        component: () => import('pages/leilao/LeilaoEdit.vue')
      }
    ]
  },

  // Always leave this as last one,
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
