<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { themeState } from "$lib/state/theme.svelte";
  import { ArrowRight, Box, Target } from "@lucide/svelte";
</script>

<div class="relative isolation-content">
  {#if themeState.mode === "saas"}
    <div
      class="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,hsl(var(--primary)/0.08)_0%,rgba(0,0,0,0)_100%)]"
    ></div>
  {:else}
    <div
      class="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-3xl -z-10"
    ></div>
  {/if}

  <section class="container max-w-7-xl mx-auto px-6 py-24 md:py-32 lg:py-40">
    <div class="flex flex-col items-center text-center">
      {#if themeState.mode === "saas"}
        <div
          class="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6 tracking-tight neon-glow"
        >
          <Box class="size-4 mr-2" /> 2026-Grade Scalable Architectures
        </div>
        <h1
          class="font-extrabold tracking-tighter text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-4xl"
        >
          Ship Your <span class="text-primary">MVP</span> Faster. Kill Tech Debt.
        </h1>
        <p class="mt-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
          We build lightning-fast, production-ready SaaS platforms using Svelte
          5 and the Edge.
        </p>
      {:else}
        <div
          class="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground mb-6 tracking-tight"
        >
          <Target class="size-4 mr-2 text-primary" /> Dominate Your Local Market
        </div>
        <h1
          class="font-serif font-medium tracking-tight text-5xl md:text-7xl leading-tight max-w-3xl"
        >
          Turn local curiosity into <span class="text-primary italic"
            >High-Value</span
          > customers.
        </h1>
        <p
          class="mt-8 max-w-xl text-xl text-muted-foreground font-light leading-relaxed"
        >
          Reliable, high-converting digital presence built for reliability and
          local SEO.
        </p>
      {/if}

      <div class="mt-12 flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          class="rounded-full px-8 gap-2 font-semibold text-base {themeState.mode ===
          'saas'
            ? 'neon-glow'
            : ''}"
        >
          Start The Blueprint <ArrowRight class="size-5" />
        </Button>
        <Button size="lg" variant="outline" class="rounded-full px-8 text-base">
          View Portfolio
        </Button>
      </div>
    </div>
  </section>
</div>
