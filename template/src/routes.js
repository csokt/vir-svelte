import Home from './routes/Home.svelte'
import Page from './routes/Page.svelte'
import Card from './routes/Card.svelte'
import QrReader from './routes/QrReader.svelte'
// import QrScanner from './components/QrScanner.svelte'
import Page1 from './routes/Page1.svelte'
import Page2 from './routes/Page2.svelte'
import NotFound from './routes/NotFound.svelte'

const routes = {
  '/': Home,
  '/page/:id': Page,
  '/card/:id': Card,
  '/qr': QrReader,
  '/page1/:page': Page1,
  '/page2': Page2,
  '*': NotFound,
  }

export default routes
