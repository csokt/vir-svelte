<script>
  import { notifier } from 'smelte/src/components/Snackbar'
  import Button from 'smelte/src/components/Button'
  import Checkbox from 'smelte/src/components/Checkbox'

</script>

<div>


<p>Also Smelte comes with a simple notification queue implementation.</p>

<Button on:click={() => notifier.alert('message1')}>Add message1 to queue</Button>
<Button on:click={() => notifier.error('message2')}>Add message2 to queue</Button>

</div>
