import Home from './routes/Home.svelte'
import Table from './routes/Table.svelte'
import Page from './routes/Page.svelte'
import Card from './routes/Card.svelte'
import NotFound from './routes/NotFound.svelte'

const routes = {
  '/': Home,
  '/page/:id': Page,
  '/menu1/:id': Page,
  '/menu2/:id': Page,
  '/menu3/:id': Page,
  '/card/:id': Card,
  '/cmenu1/:id': Card,
  '/cmenu2/:id': Card,
  '/cmenu3/:id': Card,
  '/setup/:id': Card,
  '/table/:id': Table,
  '*': NotFound,
  }

export default routes
