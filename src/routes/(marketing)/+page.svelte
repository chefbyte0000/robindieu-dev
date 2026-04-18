<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { themeState } from "$lib/state/theme.svelte";
  import { ArrowRight, Box, Target } from "@lucide/svelte";
  import { fly, fade } from "svelte/transition";

  import { scramble } from "$lib/actions/scramble";
  import { reveal } from "@/actions/reveal";
</script>

<div
  class="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
>
  {#if themeState.mode === "saas"}
    <div
      transition:fade={{ duration: 500 }}
      class="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.1)_0%,rgba(0,0,0,0)_100%)]"
    ></div>
  {:else}
    <div
      transition:fade={{ duration: 500 }}
      class="absolute top-0 right-10 w-125 h-125 bg-primary/5 rounded-full blur-[100px] -z-10"
    ></div>
  {/if}

  <section class="container max-w-7xl mx-auto px-6 py-24 z-10">
    <div class="flex flex-col items-center text-center">
      <div
        class="grid [grid-template-areas:'stack'] items-center justify-items-center w-full min-h-87.5"
      >
        {#if themeState.mode === "saas"}
          <div
            class="[grid-area:stack] flex flex-col items-center w-full"
            in:fly={{ y: 20, duration: 600, delay: 100 }}
            out:fade={{ duration: 200 }}
          >
            <div
              class="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 tracking-tight neon-glow backdrop-blur-md"
            >
              <Box class="size-4 mr-2" /> 2026-Grade Scalable Architectures
            </div>

            <h1
              class="font-extrabold tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[0.95] max-w-5xl mx-auto w-full text-center"
            >
              <span use:scramble={"Ship Your MVP Faster."}
                >Ship Your MVP Faster.</span
              > <br />
              <span class="text-primary italic" use:scramble={"Kill Tech Debt."}
                >Kill Tech Debt.</span
              >
            </h1>
            <p
              class="mt-8 max-w-2xl text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium"
            >
              We build lightning-fast, production-ready SaaS platforms using
              Svelte 5 and the Edge.
            </p>
          </div>
        {:else}
          <div
            class="[grid-area:stack] flex flex-col items-center w-full"
            in:fly={{ y: -20, duration: 600, delay: 100 }}
            out:fade={{ duration: 200 }}
          >
            <div
              class="inline-flex items-center rounded-full border border-border bg-background shadow-sm px-4 py-1.5 text-sm text-muted-foreground mb-8 tracking-tight"
            >
              <Target class="size-4 mr-2 text-primary" /> Dominate Your Local Market
            </div>

            <h1
              class="font-serif font-medium tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[0.95] max-w-5xl mx-auto w-full text-center"
            >
              <span use:reveal={"Turn Curiosity into"}>Turn Curiosity into</span
              > <br />
              <span
                class="text-primary italic"
                use:reveal={"High-Value Customers."}>High-Value Customers.</span
              >
            </h1>

            <p
              class="mt-8 max-w-2xl text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light"
            >
              Reliable, high-converting digital presence built for reliability
              and local SEO.
            </p>
          </div>
        {/if}
      </div>

      <div class="mt-12 flex flex-col sm:flex-row gap-4 relative z-20">
        <Button
          size="lg"
          class="rounded-full px-8 h-14 gap-2 font-semibold text-base shadow-lg transition-transform hover:scale-105 {themeState.mode ===
          'saas'
            ? 'neon-glow'
            : ''}"
        >
          Start The Blueprint <ArrowRight class="size-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          class="rounded-full px-8 h-14 text-base backdrop-blur-sm bg-background/50 border-border hover:bg-muted transition-colors"
        >
          View Portfolio
        </Button>
      </div>
    </div>
  </section>
</div>
