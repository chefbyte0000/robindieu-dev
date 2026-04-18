<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { themeState } from "$lib/state/theme.svelte";
  import { Zap, MapPin } from "@lucide/svelte";
</script>

<header
  class="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md"
>
  <div
    class="container flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-6"
  >
    <div class="flex items-center gap-10">
      <a
        href="/"
        class="flex items-center space-x-2 transition-opacity hover:opacity-80"
      >
        <img
          src="/logo.svg"
          alt="robindieu.dev Logo"
          class="h-7 w-auto invert dark:invert-0 brightness-0 [data-mode='local']:filter-none [data-mode='saas']:filter"
          style="--tw-brightness: brightness(2); --tw-invert: invert(1);"
        />
      </a>
    </div>

    <div class="flex items-center gap-4">
      <div
        class="bg-muted p-1 rounded-full flex items-center gap-1 border border-border/50 shadow-inner"
      >
        <button
          onclick={(e) => themeState.mode !== "saas" && themeState.toggle(e)}
          class="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 {themeState.mode ===
          'saas'
            ? 'bg-background text-primary shadow-sm neon-glow'
            : 'text-muted-foreground hover:text-foreground'}"
        >
          <Zap class="size-3.5" />
          SaaS OS
        </button>
        <button
          onclick={(e) => themeState.mode !== "local" && themeState.toggle(e)}
          class="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 {themeState.mode ===
          'local'
            ? 'bg-background text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'}"
        >
          <MapPin class="size-3.5" />
          Local Biz
        </button>
      </div>

      <Button
        variant="outline"
        class="hidden sm:inline-flex rounded-full px-6 border-border/50 backdrop-blur-sm bg-background/50"
        href="/admin"
      >
        Portal Login
      </Button>
    </div>
  </div>
</header>
