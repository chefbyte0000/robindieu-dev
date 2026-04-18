<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  let { children } = $props();
</script>

<div class="relative flex min-h-screen flex-col">
  <Navbar />
  <main class="flex-1">
    {@render children()}
  </main>
  <footer class="border-t py-6 md:py-0">
    <div
      class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 mx-auto"
    >
      <p
        class="text-center text-sm leading-loose text-muted-foreground md:text-left"
      >
        Built by robindieu.dev. The Divine Portal.
      </p>
    </div>
  </footer>
</div>
