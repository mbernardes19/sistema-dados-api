import Menu from "./interfaces/menu"

export const menu: Menu[] = [
    { 
        id: 'SEARCH',
        text: 'Consultar pedidos',
        href: '/consultar-pedidos'
    },
]

export const adminMenu: Menu[] = [
    { 
        id: 'SEARCH',
        text: 'Consultar pedidos',
        href: '/consultar-pedidos'
    },
    { 
        id: 'PERSON_ADD',
        text: 'Cadastrar usuário',
        href: '/cadastrar'
    },
    { 
        id: 'UPDATE',
        text: 'Atualizar dados',
        href: '/atualizar-dados'
    },
]