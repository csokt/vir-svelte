<main>
  <p class="bg-black text-white">Input components</p>

  <TInput bind:value={value} label="Default"></TInput>
  <TInput {value} label="Search"></TInput>

  <!--
  <t-input v-model="username" @click="onClick" label="Default"></t-input>
  <t-input v-model="username" type="search" label="Search"></t-input>
  <t-input v-model="username" type="number" label="Number"></t-input>
  <t-input v-model="username" readonly qrcode label="Readonly"></t-input>
  <t-input v-model="username" disabled label="Disabled"></t-input>
  <t-input v-model="username" type="password" label="Password"></t-input>
  <t-input v-model="username" placeholder="No label"></t-input>
  <t-checkbox v-model="member" label="Checkbox"></t-checkbox>
  <t-checkbox v-model="member" readonly label="Readonly"></t-checkbox>
  <t-checkbox v-model="member" disabled label="Disabled"></t-checkbox>
  -->
</main>

<script>
  import TInput from '../components/ui/TInput.svelte'

  let value = 'null'
// import TInput from '@/components/ui/TInput.vue'
// import TCheckbox from '@/components/ui/TCheckbox.vue'

// export default {
//   name: 'Input',
//   components: {
//     TInput,
//     TCheckbox
//   },

//   data() {
//     return {
//       username: '',
//       member: true
//     }
//   },

//   methods: {
//     onClick() {
//       // eslint-disable-next-line
//       console.log('Clicked')
//     }
//   }
// }
</script>
