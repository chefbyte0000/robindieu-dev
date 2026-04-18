<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { themeState } from "$lib/state/theme.svelte";
  import { Zap, MapPin } from "@lucide/svelte";
</script>

<header
  class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
  <div
    class="container flex h-18 max-w-screen-2xl items-center justify-between mx-auto px-6 py-4"
  >
    <div class="flex items-center gap-10">
      <a
        href="/"
        class="flex items-center space-x-2 transition-opacity hover:opacity-80"
      >
        <img
          src="/logo.svg"
          alt="robindieu.dev Logo"
          class="h-8 w-auto invert dark:invert-0 brightness-0 [data-mode='local']:filter-none [data-mode='saas']:filter"
          style="--tw-brightness: brightness(2); --tw-invert: invert(1);"
        />
      </a>
      <nav
        class="hidden lg:flex items-center gap-7 text-sm font-medium tracking-tight"
      >
        <a
          href="/blueprint"
          class="transition-colors hover:text-foreground text-muted-foreground"
          >The Blueprint</a
        >
        <a
          href="/forge"
          class="transition-colors hover:text-foreground text-muted-foreground"
          >The Forge</a
        >
        <a
          href="/about"
          class="transition-colors hover:text-foreground text-muted-foreground"
          >About</a
        >
      </nav>
    </div>

    <div class="flex items-center gap-4">
      <div
        class="bg-muted p-1 rounded-full flex items-center gap-1 border border-border"
      >
        <button
          onclick={() => themeState.setMode("saas")}
          class="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all {themeState.mode ===
          'saas'
            ? 'bg-background text-primary neon-glow'
            : 'text-muted-foreground hover:text-foreground'}"
        >
          <Zap class="size-3.5" />
          SaaS OS
        </button>
        <button
          onclick={() => themeState.setMode("local")}
          class="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all {themeState.mode ===
          'local'
            ? 'bg-background text-primary'
            : 'text-muted-foreground hover:text-foreground'}"
        >
          <MapPin class="size-3.5" />
          Local Biz
        </button>
      </div>

      <Button variant="outline" class="rounded-full px-6" href="/admin"
        >Portal Login</Button
      >
    </div>
  </div>
</header>
