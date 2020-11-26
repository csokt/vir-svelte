import Home from './routes/Home.svelte'
import Page from './routes/Page.svelte'
import Card from './routes/Card.svelte'
import NotFound from './routes/NotFound.svelte'
import Napiteljesitmeny from './routes/tables/Napiteljesitmeny.svelte'
import Havilezartteljesitmeny from './routes/tables/Havilezartteljesitmeny.svelte'
import Kodolasok from './routes/tables/Kodolasok.svelte'
import Napikodolas from './routes/tables/Napikodolas.svelte'
import Mitkodoltamma from './routes/tables/Mitkodoltamma.svelte'
import Havikodolas from './routes/tables/Havikodolas.svelte'
import Cikknormai from './routes/tables/Cikknormai.svelte'
import Szabaszatleadas from './routes/tables/Szabaszatleadas.svelte'
import Varrodaleadas from './routes/tables/Varrodaleadas.svelte'
import Aktualishetigyartasiterv from './routes/tables/Aktualishetigyartasiterv.svelte'
import Kovetkezohetigyartasiterv from './routes/tables/Kovetkezohetigyartasiterv.svelte'

const routes = {
  '/': Home,
  '/menu1/:id': Page,
  '/menu2/:id': Page,
  '/menu3/:id': Page,
  '/page/:id': Page,
  '/setup/:id': Card,
  '/card/:id': Card,
  '/table/napiteljesitmeny': Napiteljesitmeny,
  '/table/havilezartteljesitmeny': Havilezartteljesitmeny,
  '/table/kodolasok': Kodolasok,
  '/table/napikodolas': Napikodolas,
  '/table/mitkodoltamma': Mitkodoltamma,
  '/table/havikodolas': Havikodolas,
  '/table/cikknormai': Cikknormai,
  '/table/szabaszatleadas': Szabaszatleadas,
  '/table/varrodaleadas': Varrodaleadas,
  '/table/aktualishetigyartasiterv': Aktualishetigyartasiterv,
  '/table/kovetkezohetigyartasiterv': Kovetkezohetigyartasiterv,
  '*': NotFound,
  }

export default routes
