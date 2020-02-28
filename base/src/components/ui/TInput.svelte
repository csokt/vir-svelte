<script>
  export let value = null
  export let type = 'text'
  export let placeholder = null
  export let readonly = false
  export let disabled = false
  export let label = null
  export let baseClass =
    'flex-grow bg-transparent border-b border-gray-700 w-auto mb-px text-gray-800 pb-1 focus:outline-none focus:border-b-2 focus:border-blue-400 focus:mb-0'
  let focused = false

  const handleInput = event => {
    value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
  }
  // import htmlInput from '@/mixins/htmlInput.js'
  // import TQread from '@/components/ui/TQread.vue'

  // export default {
  //   components: {
  //     TQread
  //   },
  //   mixins: [htmlInput],

  //   props: {
  //     qrcode: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },

  //   data() {
  //     return { dialog: false }
  //   },
  // }
</script>

<main>
  <div class="max-w-sm mt-4">

    {#if label}
      <div class="text-xs text-gray-600">
        {#if value || (focused && !readonly)}
          <label>{label}</label>
        {/if}
        &nbsp;
      </div>
    {/if}
    <div class="flex w-full">
      <input
        on:input={handleInput}
        on:change={handleInput}
        on:focus={() => (focused = true)}
        on:blur={() => (focused = false)}
        placeholder={focused && !readonly ? '' : placeholder || label}
        {value}
        {type}
        {readonly}
        {disabled}
        class="{baseClass}
        {disabled ? 'opacity-75 cursor-not-allowed' : ''}"
      />
    </div>
    <!--
    <div class="flex w-full">
      <button v-if="qrcode" @click="dialog = true" class="text-xl">
        &#x1f532;
      </button>
      <TQread
        :dialog="dialog"
        @input="
          dialog = false
          $emit('input', $event)
        "
        @close="dialog = false"
        :header="label"
      >
      </TQread>
    </div> -->
  </div>
</main>
