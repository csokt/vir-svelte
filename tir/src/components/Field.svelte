<script>
  import { createEventDispatcher } from 'svelte'
  import {push} from 'svelte-spa-router'
  import { Button, Checkbox, Textfield } from 'svelte-mui'
  import QrTextField from './core/QrTextField.svelte'
  import SimpleList from './core/SimpleList.svelte'
  import SimpleObject from './core/SimpleObject.svelte'
  import SimpleTable from './core/SimpleTable.svelte'
  import Tags from './core/Tags.svelte'
  import TimePicker from './core/TimePicker.svelte'

  export let field
  export let disabled
	const dispatch = createEventDispatcher()
</script>

<div hidden={field.hidden} class:w-full="{['text', 'qrtext'].includes(field.type)}" class="{field.class}">
  {#if field.type === "menu"}
    <div class="text-gray-700 text-lg py-2" on:click={() => push(field.path)}>
      {field.name}
    </div>
    <hr>
  {/if}

  {#if field.type === "line"}
    <div class="{field.class ? field.class : 'pt-2'}">
      <hr>
    </div>
  {/if}

  {#if field.type === "button"}
    <div class="py-2">
      <Button
        raised
        color={field.color || 'primary'}
        disabled={disabled || field.disabled}
        {...field.attributes}
        on:click={() => dispatch('event', { event: 'click', fieldid: field.id, func: field.onClick })}
      >
        {field.name}
      </Button>
    </div>
  {/if}

  {#if field.type === "checkbox"}
    <Checkbox
      label={field.name}
      bind:checked={field.value}
      disabled={disabled || field.disabled}
      {...field.attributes}
      on:change={() => dispatch('event', { event: 'change', fieldid: field.id, value: field.value, func: field.onChange })}
    >
      <span>{field.name}</span>
    </Checkbox>
  {/if}

  {#if field.type === "text"}
    <Textfield
      dense
      label={field.name}
      bind:value={field.value}
      disabled={disabled || field.disabled}
      readonly={field.readonly}
      error={field.error}
      {...field.attributes}
      on:change={() => dispatch('event', { event: 'change', fieldid: field.id, value: field.value, func: field.onChange })}
    />
  {/if}

  {#if field.type === "qrtext"}
    <QrTextField
      label={field.name}
      title={field.title || field.name}
      bind:value={field.value}
      disabled={disabled || field.disabled}
      readonly={field.readonly}
      error={field.error}
      attributes={field.attributes}
      on:change={() => dispatch('event', { event: 'change', fieldid: field.id, value: field.value, func: field.onChange })}
    />
  {/if}

  {#if field.type === "time"}
    <TimePicker
      dense
      label={field.name}
      bind:time={field.value}
      disabled={disabled || field.disabled}
      readonly={field.readonly}
      error={field.error}
      {...field.attributes}
      on:change={() => dispatch('event', { event: 'change', fieldid: field.id, value: field.value, func: field.onChange })}
    />
  {/if}

  {#if field.type === "tags"}
    <Tags
      placeholder={field.name}
      bind:tags={field.value}
      disabled={disabled || field.disabled}
      readonly={field.readonly}
      error={field.error}
      attributes={field.attributes}
      on:tags={() => dispatch('event', { event: 'change', fieldid: field.id, value: field.value, func: field.onChange })}
    />
  {/if}

  <!-- {#if field.type === "select"}
    <Select
      label={field.name}
      bind:value={fields[field.id].value}
      items={card.fields[field.id].items}
      append=""
      disabled={disableFields || card.fields[field.id].disabled}
      {...field.attributes}
      on:change={exec_function(field.onChange, {event: 'change', cardid: card.id, fieldid: field.id, value: fields[field.id].value})}
    />
  {/if} -->

  {#if field.type === "simplelist"}
    <SimpleList
      data={field.value}
      rowClass={field.rowClass}
      rows={field.rows}
      {...field.attributes}
      on:select={(event) => dispatch('event', { event: 'select', fieldid: field.id, selected: event.detail, func: field.onSelect })}
    />
  {/if}

  {#if field.type === "simpletable"}
    <SimpleTable
      data={field.value}
      rowClass={field.rowClass}
      columns={field.columns}
      {...field.attributes}
      on:select={(event) => dispatch('event', { event: 'select', fieldid: field.id, selected: event.detail, func: field.onSelect })}
    />
  {/if}

  {#if field.type === "simpleobject"}
    <SimpleObject
      data={field.value}
      fields={field.fields}
      {...field.attributes}
      on:select={(event) => dispatch('event', { event: 'select', fieldid: field.id, selected: event.detail, func: field.onSelect })}
    />
  {/if}
</div>
