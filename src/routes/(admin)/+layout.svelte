<script lang="ts">
  import AdminSidebar from "$lib/components/layout/AdminSidebar.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Bell, LogOut, Search } from "@lucide/svelte";
  let { children } = $props();
</script>

<div
  class="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]"
>
  <AdminSidebar />
  <div class="flex flex-col bg-muted/30">
    <header
      class="flex h-16 items-center gap-4 border-b bg-background px-6 lg:h-16.25"
    >
      <div class="w-full flex-1">
        <form>
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
            />
            <input
              type="search"
              placeholder="Search leads or metrics..."
              class="w-full max-w-md rounded-lg bg-muted px-9 py-2 text-sm border focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </form>
      </div>

      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          class="rounded-full text-muted-foreground"
        >
          <Bell class="size-5" />
        </Button>
        <div class="h-6 w-px bg-border mx-1"></div>

        <div class="flex items-center gap-3 pl-2">
          <div class="flex flex-col text-right">
            <span class="text-sm font-semibold">Robin Dieu</span>
            <span class="text-xs text-muted-foreground">Admin OS</span>
          </div>
          <div
            class="size-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground border-2 border-primary/20"
          >
            RD
          </div>
          <Button variant="ghost" size="icon" class="text-muted-foreground">
            <LogOut class="size-4" />
          </Button>
        </div>
      </div>
    </header>
    <main class="flex flex-1 flex-col gap-6 p-6 lg:p-8">
      {@render children()}
    </main>
  </div>
</div>
