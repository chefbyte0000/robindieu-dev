<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import { themeState } from "$lib/state/theme.svelte";
  let { children } = $props();
</script>

<div
  class="relative flex min-h-screen flex-col selection:bg-primary/30 selection:text-primary"
>
  <Navbar />
  <main class="flex-1 w-full">
    {@render children()}
  </main>

  <footer
    class="relative overflow-hidden border-t border-border/50 bg-background/50 backdrop-blur-xl"
  >
    <div
      class="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
    ></div>
    <div
      class="container flex flex-col items-center justify-between gap-6 md:h-24 md:flex-row px-6 py-8 md:py-0 mx-auto"
    >
      <div class="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt="robindieu.dev Logo"
          class="h-5 w-auto invert dark:invert-0 brightness-0 [data-mode='local']:filter-none [data-mode='saas']:filter opacity-50 grayscale hover:grayscale-0 transition-all duration-300"
          style="--tw-brightness: brightness(2); --tw-invert: invert(1);"
        />
        <p class="text-sm font-medium text-muted-foreground/80 tracking-tight">
          © {new Date().getFullYear()} robindieu.dev. The Divine Portal.
        </p>
      </div>

      <div
        class="flex items-center gap-6 text-sm text-muted-foreground/60 font-medium"
      >
        <a href="/privacy" class="hover:text-primary transition-colors"
          >Privacy</a
        >
        <a href="/terms" class="hover:text-primary transition-colors">Terms</a>
        <span
          class="size-1.5 rounded-full bg-primary/50 {themeState.mode === 'saas'
            ? 'animate-pulse neon-glow'
            : ''}"
        ></span>
        <span
          >System Status: <span class="text-primary font-bold">Operational</span
          ></span
        >
      </div>
    </div>
  </footer>
</div>
