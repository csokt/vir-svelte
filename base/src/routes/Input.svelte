<main>
  <p class="bg-black text-white">Input components</p>

  <TInput bind:value label="Default"></TInput>
  <TInput bind:value type="search" label="Search"></TInput>
  <TInput bind:value type="number" label="Number"></TInput>
  <TInput bind:value readonly qrcode label="Readonly"></TInput>
  <TInput bind:value disabled label="Disabled"></TInput>
  <TInput bind:value type="password" label="Password"></TInput>
  <TInput bind:value placeholder="No label"></TInput>

  <!--
  <t-checkbox v-model="member" label="Checkbox"></t-checkbox>
  <t-checkbox v-model="member" readonly label="Readonly"></t-checkbox>
  <t-checkbox v-model="member" disabled label="Disabled"></t-checkbox>
  -->
</main>

<script>
  import TInput from '../components/ui/TInput.svelte'

  let value = null
// import TCheckbox from '@/components/ui/TCheckbox.vue'


//   methods: {
//     onClick() {
//       // eslint-disable-next-line
//       console.log('Clicked')
//     }
//   }
// }
</script>
