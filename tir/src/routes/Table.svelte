<script>
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { data } from '../stores.js'
  import Aktualishetigyartasiterv from './tables/Aktualishetigyartasiterv.svelte'
  import Cikknormai from './tables/Cikknormai.svelte'
  import Havikodolas from './tables/Havikodolas.svelte'
  import Havilezartteljesitmeny from './tables/Havilezartteljesitmeny.svelte'
  import Kodolasok from './tables/Kodolasok.svelte'
  import Kovetkezohetigyartasiterv from './tables/Kovetkezohetigyartasiterv.svelte'
  import Mitkodoltamma from './tables/Mitkodoltamma.svelte'
  import Muveletekosszegzese from './tables/Muveletekosszegzese.svelte'
  import Napikodolas from './tables/Napikodolas.svelte'
  import Napiteljesitmeny from './tables/Napiteljesitmeny.svelte'
  import Szabaszatleadas from './tables/Szabaszatleadas.svelte'
  import Utovasaloleadas from './tables/Utovasaloleadas.svelte'
  import Varrodaleadas from './tables/Varrodaleadas.svelte'

  export let params = {}

  const components = {
    aktualishetigyartasiterv: Aktualishetigyartasiterv,
    cikknormai: Cikknormai,
    havikodolas: Havikodolas,
    havilezartteljesitmeny: Havilezartteljesitmeny,
    kodolasok: Kodolasok,
    kovetkezohetigyartasiterv: Kovetkezohetigyartasiterv,
    mitkodoltamma: Mitkodoltamma,
    muveletekosszegzese: Muveletekosszegzese,
    napikodolas: Napikodolas,
    napiteljesitmeny: Napiteljesitmeny,
    szabaszatleadas: Szabaszatleadas,
    utovasaloleadas: Utovasaloleadas,
    varrodaleadas: Varrodaleadas,
  }

function seasearch(params) {
  data.params.seasearch = params.detail.trim()
  push('/menu2/seasearch')
}
</script>

<svelte:component
  this={components[params.id]}
  on:seasearch={ seasearch }
/>
