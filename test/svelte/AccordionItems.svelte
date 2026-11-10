<script lang="ts">
  /* An accordion of the kit's own items, built from a parity case's list. */
  import { Accordion, AccordionItem } from '@lyeve-labs/ui-kit';

  let {
    items,
    ...rest
  }: { items: { id: string; title: string; text: string; class?: string }[]; [key: string]: unknown } =
    $props();
</script>

<Accordion {...rest}>
  {#each items as item (item.id)}
    <AccordionItem id={item.id} title={item.title} class={item.class}><span>{item.text}</span></AccordionItem>
  {/each}
</Accordion>
