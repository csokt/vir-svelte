<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  import { Textfield } from 'svelte-mui'
  import Switcher from './Switcher.svelte'

  const HOURS = new Array(24).fill(0).map((v, i) => v + i)
  const MINUTES = new Array(60).fill(0).map((v, i) => v + i)

  export let label
  export let time
  export let disabled = false   // not implemented yet
  export let readonly = null    // not implemented yet
  let visible = false

  $: _time = time || new Date()
  $: timeStr = time ? time.toLocaleTimeString('hu', {timeStyle: 'short'}) : ''

  let timeChanged = (event) => {
    // console.log(event.detail)

    let {type, changedData} = event.detail
    let newTime = new Date()

    if (type === 'hours'){
      newTime.setHours(changedData)
      newTime.setMinutes(_time.getMinutes())

    } else if (type === 'minutes'){

      newTime.setHours(_time.getHours())
      newTime.setMinutes(changedData)
    }

    _time = newTime
  }
</script>

<style>
.touch-time-popup{
  z-index: 1;
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: rgba(0, 0, 0, 0.3);
  touch-action: pan-down;
}
.touch-time-popup > div{
  background: var(--svtt-popup-bg-color, white);
  color: var(--svtt-popup-color, black);
  margin-top: 30vh;
  width: 85%;
  margin-left: 7%;
  border-radius: var(--svtt-popup-radius, 10px);
}
.touch-time-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--svtt-font-size, 20px);
  padding: 1.5rem;
}

.touch-time-picker {
  display: flex;
  padding: 50px 20px;
  margin: 10px 0;
  overflow: hidden;
}

.touch-time-reset > button {
  width: 100px;
  height: 30px;
  border-radius: 15px;
  border: var(--svtt-border, 1px solid grey);
  outline: none;
  color: var(--svtt-button-color, black);
  background-color: var(--svtt-button-bg-color, transparent);
  box-shadow: var(--svtt-button-box-shadow, none) ;
  font-weight: 300;
}
.touch-time-reset button:nth-child(1):active {
  -webkit-transform: scale(0.95);
          transform: scale(0.95);
}

</style>

<Textfield
  dense
  {label}
  value={timeStr}
  readonly=true
  on:focus={() => {visible = !visible}}
/>

{#if visible}
  <div class="touch-time-popup" >
    <div>
      <div class="touch-time-wrapper">
          <div class='touch-time-picker'>
            <Switcher type='hours' data={HOURS} selected={_time.getHours()} on:timeChange={timeChanged}/>
            <Switcher type='minutes' data={MINUTES} selected={_time.getMinutes() } on:timeChange={timeChanged}/>
          </div>
        <div class='touch-time-reset'>
          <button on:click={() => {time = _time; visible = !visible; dispatch('change')}}>Ment</button>
          <button on:click={() => {_time = time; visible = !visible}}>Elvet</button>
        </div>
      </div>
    </div>
  </div>


{/if}

