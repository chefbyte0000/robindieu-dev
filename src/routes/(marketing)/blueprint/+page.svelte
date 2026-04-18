<script lang="ts">
  import { Canvas } from "@threlte/core";
  import ProjectCore from "$lib/components/three/ProjectCore.svelte";
  import { estimatorState } from "$lib/state/estimator.svelte";
  import { themeState } from "$lib/state/theme.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Check, Activity, Clock, Rocket, FileCheck } from "@lucide/svelte";
  import { fly, fade, scale } from "svelte/transition";
  import { scramble } from "$lib/actions/scramble";

  let inputEmail = $state("");

  function handleBlastOff(e: Event) {
    e.preventDefault();
    if (!inputEmail) return;
    estimatorState.submitBlueprint(inputEmail);
  }
</script>

<div
  class="relative min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden pt-16 lg:pt-0"
>
  <div
    class="w-full lg:w-1/2 h-[40vh] lg:h-[calc(100vh-4rem)] lg:fixed lg:left-0 lg:top-16 bg-muted/10 border-b lg:border-b-0 lg:border-r border-border/50 relative"
  >
    <div></div>

    <Canvas>
      <ProjectCore />
    </Canvas>

    {#if !estimatorState.isSubmitted}
      <div
        class="absolute bottom-6 left-6 pointer-events-none"
        transition:fade={{ duration: 300 }}
      >
        <div class="flex items-center gap-2 mb-2">
          <Activity
            class="size-4 {themeState.mode === 'saas'
              ? 'text-primary'
              : 'text-amber-500'}"
          />
          <span
            class="text-xs font-bold tracking-widest uppercase text-muted-foreground"
          >
            Core Complexity: {Math.max(10, estimatorState.complexityScore)}
          </span>
        </div>
        <div class="h-1 w-48 bg-muted rounded-full overflow-hidden">
          <div
            class="h-full {themeState.mode === 'saas'
              ? 'bg-primary'
              : 'bg-amber-500'} transition-all duration-700 ease-out"
            style="width: {Math.min(
              100,
              (estimatorState.complexityScore / 100) * 100,
            )}%"
          ></div>
        </div>
      </div>
    {/if}
  </div>

  {#if !estimatorState.isSubmitted}
    <div
      class="w-full lg:w-1/2 lg:ml-[50%] grid [grid-template-areas:'stack'] min-h-[60vh] lg:min-h-[calc(100vh-4rem)]"
    >
      {#if !estimatorState.isSubmitted}
        <div
          class="[grid-area:stack] w-full p-6 lg:p-12 xl:p-24 overflow-y-auto"
          out:fade={{ duration: 400 }}
        >
          <div class="max-w-xl mx-auto space-y-12 pb-32">
            <div class="space-y-4">
              <h1 class="text-4xl md:text-5xl font-bold tracking-tighter">
                <span use:scramble={"Design The Blueprint."}
                  >Design The Blueprint.</span
                >
              </h1>
              <p class="text-muted-foreground text-lg">
                Construct your architecture. The Core will adapt in real-time.
              </p>
            </div>

            <div class="space-y-4">
              <h3
                class="text-xl font-semibold flex items-center gap-2 border-b pb-2"
              >
                <span
                  class="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold"
                  >1</span
                >
                Base Foundation
              </h3>
              <div class="grid sm:grid-cols-2 gap-4">
                {#each estimatorState.config.bases as base (base.id)}
                  <button
                    in:fly={{ y: 20, duration: 300 }}
                    class="text-left p-4 rounded-xl border-2 transition-all duration-300 ease-out {estimatorState.selectedBase ===
                    base.id
                      ? 'border-primary bg-primary/10 shadow-md scale-[1.02]'
                      : 'border-border/60 hover:border-primary/40 hover:bg-muted/30 hover:-translate-y-1'}"
                    onclick={() => estimatorState.setBase(base.id)}
                  >
                    <div class="flex justify-between items-start mb-2">
                      <span
                        class="font-bold transition-colors duration-300 {estimatorState.selectedBase ===
                        base.id
                          ? 'text-primary'
                          : ''}">{base.label}</span
                      >
                      {#if estimatorState.selectedBase === base.id}
                        <div transition:scale={{ duration: 200, start: 0.5 }}>
                          <Check class="size-5 text-primary" />
                        </div>
                      {/if}
                    </div>
                    <p class="text-xs text-muted-foreground">
                      Base infrastructure & routing.
                    </p>
                  </button>
                {/each}
              </div>
            </div>

            <div class="space-y-4">
              <h3
                class="text-xl font-semibold flex items-center gap-2 border-b pb-2"
              >
                <span
                  class="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold"
                  >2</span
                >
                Service Orbs
              </h3>
              <div class="grid sm:grid-cols-2 gap-4">
                {#each estimatorState.config.powerUps as pu (pu.id)}
                  {@const isSelected = estimatorState.selectedPowerUps.includes(
                    pu.id,
                  )}
                  <button
                    in:fly={{ y: 20, duration: 300, delay: 50 }}
                    class="text-left p-4 rounded-xl border-2 transition-all duration-300 ease-out {isSelected
                      ? 'border-primary bg-primary/10 shadow-md scale-[1.02]'
                      : 'border-border/60 hover:border-primary/40 hover:bg-muted/30 hover:-translate-y-1'}"
                    onclick={() => estimatorState.togglePowerUp(pu.id)}
                  >
                    <div class="flex justify-between items-start mb-2">
                      <span
                        class="font-bold transition-colors duration-300 {isSelected
                          ? 'text-primary'
                          : ''}">{pu.label}</span
                      >
                      {#if isSelected}
                        <div transition:scale={{ duration: 200, start: 0.5 }}>
                          <Check class="size-5 text-primary" />
                        </div>
                      {/if}
                    </div>
                    <p class="text-xs text-muted-foreground">
                      + Complexity / Extended Timeline
                    </p>
                  </button>
                {/each}
              </div>
            </div>

            <div class="space-y-4">
              <h3
                class="text-xl font-semibold flex items-center gap-2 border-b pb-2"
              >
                <span
                  class="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold"
                  >3</span
                >
                Execution Polish
              </h3>
              <div class="grid sm:grid-cols-2 gap-4">
                {#each estimatorState.config.polish as pol (pol.id)}
                  <button
                    in:fly={{ y: 20, duration: 300, delay: 100 }}
                    class="text-left p-4 rounded-xl border-2 transition-all duration-300 ease-out {estimatorState.selectedPolish ===
                    pol.id
                      ? 'border-primary bg-primary/10 shadow-md scale-[1.02]'
                      : 'border-border/60 hover:border-primary/40 hover:bg-muted/30 hover:-translate-y-1'}"
                    onclick={() => estimatorState.setPolish(pol.id)}
                  >
                    <div class="flex justify-between items-start mb-2">
                      <span
                        class="font-bold transition-colors duration-300 {estimatorState.selectedPolish ===
                        pol.id
                          ? 'text-primary'
                          : ''}">{pol.label}</span
                      >
                      {#if estimatorState.selectedPolish === pol.id}
                        <div transition:scale={{ duration: 200, start: 0.5 }}>
                          <Check class="size-5 text-primary" />
                        </div>
                      {/if}
                    </div>
                  </button>
                {/each}
              </div>
            </div>
          </div>

          {#if estimatorState.selectedBase && estimatorState.selectedPolish}
            <div
              class="fixed bottom-0 lg:bottom-6 right-0 lg:right-6 w-full lg:w-[calc(50vw-3rem)] p-4 lg:p-0 z-40"
              in:fly={{ y: 50, duration: 400, delay: 200 }}
              out:fly={{ y: 50, duration: 300 }}
            >
              <div
                class="bg-background/90 backdrop-blur-xl border-t lg:border border-border/50 lg:rounded-2xl shadow-2xl p-4 lg:p-6 flex flex-col xl:flex-row items-center justify-between gap-6"
              >
                <div
                  class="flex items-center gap-6 w-full xl:w-auto shrink-0 justify-center xl:justify-start"
                >
                  <div class="flex flex-col">
                    <span
                      class="text-xs text-muted-foreground font-semibold uppercase tracking-wider"
                      >Timeline</span
                    >
                    <div class="flex items-center gap-1.5 text-lg font-bold">
                      <Clock class="size-4 text-primary" />
                      {estimatorState.timelineDays} Days
                    </div>
                  </div>
                  <div class="w-px h-8 bg-border"></div>
                  <div class="flex flex-col">
                    <span
                      class="text-xs text-muted-foreground font-semibold uppercase tracking-wider"
                      >Complexity</span
                    >
                    <div class="flex items-center gap-1.5 text-lg font-bold">
                      <Activity
                        class="size-4 {themeState.mode === 'saas'
                          ? 'text-primary'
                          : 'text-amber-500'}"
                      />
                      {estimatorState.complexityScore}
                    </div>
                  </div>
                </div>

                <form
                  class="flex w-full gap-2 relative"
                  onsubmit={handleBlastOff}
                >
                  <div class="relative w-full">
                    <input
                      type="email"
                      bind:value={inputEmail}
                      placeholder="Where should we send the PDF?"
                      required
                      class="w-full h-12 rounded-full bg-muted/50 border border-border/50 px-6 text-sm outline-none focus:border-primary focus:bg-background transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    class="h-12 rounded-full px-6 gap-2 shrink-0 {themeState.mode ===
                    'saas'
                      ? 'neon-glow'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'}"
                  >
                    <span class="hidden sm:inline">Initialize</span>
                    <Rocket class="size-4" />
                  </Button>
                </form>
              </div>
            </div>
          {/if}
        </div>
      {:else}
        <div
          class="[grid-area:stack] w-full h-full flex flex-col items-center justify-center p-6 lg:p-12 text-center"
          in:fade={{ duration: 600, delay: 400 }}
        >
          <div
            class="size-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 {themeState.mode ===
            'saas'
              ? 'neon-glow'
              : ''}"
          >
            <FileCheck class="size-10 text-primary" />
          </div>
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Blueprint Transmitted.
          </h2>
          <p class="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            The architecture for your project has been successfully compiled and
            blasted directly to <span class="font-bold text-foreground"
              >{estimatorState.email}</span
            >.
          </p>

          <div class="flex gap-4">
            <Button
              variant="outline"
              class="rounded-full px-8"
              onclick={() => estimatorState.reset()}
            >
              Build Another
            </Button>
            <Button class="rounded-full px-8" href="/admin">
              View Command Center
            </Button>
          </div>
        </div>
      {/if}
    </div>

    {#if estimatorState.selectedBase && estimatorState.selectedPolish}
      <div
        class="fixed bottom-0 lg:bottom-6 right-0 lg:right-6 w-full lg:w-[calc(50vw-3rem)] p-4 lg:p-0 z-40"
        in:fly={{ y: 50, duration: 400, delay: 200 }}
        out:fly={{ y: 50, duration: 300 }}
      >
        <div
          class="bg-background/90 backdrop-blur-xl border-t lg:border border-border/50 lg:rounded-2xl shadow-2xl p-4 lg:p-6 flex flex-col xl:flex-row items-center justify-between gap-6"
        >
          <div
            class="flex items-center gap-6 w-full xl:w-auto shrink-0 justify-center xl:justify-start"
          >
            <div class="flex flex-col">
              <span
                class="text-xs text-muted-foreground font-semibold uppercase tracking-wider"
                >Timeline</span
              >
              <div class="flex items-center gap-1.5 text-lg font-bold">
                <Clock class="size-4 text-primary" />
                {estimatorState.timelineDays} Days
              </div>
            </div>
            <div class="w-px h-8 bg-border"></div>
            <div class="flex flex-col">
              <span
                class="text-xs text-muted-foreground font-semibold uppercase tracking-wider"
                >Complexity</span
              >
              <div class="flex items-center gap-1.5 text-lg font-bold">
                <Activity
                  class="size-4 {themeState.mode === 'saas'
                    ? 'text-primary'
                    : 'text-amber-500'}"
                />
                {estimatorState.complexityScore}
              </div>
            </div>
          </div>

          <form class="flex w-full gap-2 relative" onsubmit={handleBlastOff}>
            <div class="relative w-full">
              <input
                type="email"
                bind:value={inputEmail}
                placeholder="Where should we send the PDF?"
                required
                class="w-full h-12 rounded-full bg-muted/50 border border-border/50 px-6 text-sm outline-none focus:border-primary focus:bg-background transition-all"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              class="h-12 rounded-full px-6 gap-2 shrink-0 {themeState.mode ===
              'saas'
                ? 'neon-glow'
                : 'bg-amber-500 hover:bg-amber-600 text-white'}"
            >
              <span class="hidden sm:inline">Initialize</span>
              <Rocket class="size-4" />
            </Button>
          </form>
        </div>
      </div>
    {/if}
  {:else}
    <div
      class="w-full lg:w-1/2 lg:ml-[50%] flex flex-col items-center justify-center p-6 lg:p-12 text-center min-h-[50vh] lg:min-h-0"
      in:fade={{ duration: 600, delay: 500 }}
    >
      <div
        class="size-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 {themeState.mode ===
        'saas'
          ? 'neon-glow'
          : ''}"
      >
        <FileCheck class="size-10 text-primary" />
      </div>
      <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        Blueprint Transmitted.
      </h2>
      <p class="text-muted-foreground text-lg max-w-md mx-auto mb-8">
        The architecture for your project has been successfully compiled and
        blasted directly to <span class="font-bold text-foreground"
          >{estimatorState.email}</span
        >.
      </p>

      <div class="flex gap-4">
        <Button
          variant="outline"
          class="rounded-full px-8"
          onclick={() => estimatorState.reset()}
        >
          Build Another
        </Button>
        <Button class="rounded-full px-8" href="/admin">
          View Command Center
        </Button>
      </div>
    </div>
  {/if}
</div>
