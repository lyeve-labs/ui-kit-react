<script lang="ts">
  /* An icon stand-in that shows the size and class a component hands it. */
  let { size = 24, class: klass = undefined }: { size?: number; class?: string } = $props();
</script>

<svg data-icon="test" width={size} height={size} class={klass}></svg>
