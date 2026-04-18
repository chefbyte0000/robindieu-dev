<script lang="ts">
  import {
    LayoutDashboard,
    Mail,
    Users,
    Settings,
    BotMessageSquare,
  } from "@lucide/svelte";
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button";

  const navItems = [
    { name: "Executive Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Divine Outreach", href: "/admin/outreach", icon: Mail },
    { name: "Lead CRM", href: "/admin/leads", icon: Users },
    {
      name: "AI Pricing Engine",
      href: "/admin/engine",
      icon: BotMessageSquare,
    },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];
</script>

<aside
  class="hidden border-r bg-background md:block w-full min-h-screen shrink-0"
>
  <div class="flex h-16 items-center border-b px-6 lg:h-16.25">
    <a href="/" class="flex items-center gap-3">
      <img src="/logo.svg" alt="logo" class="h-6 w-auto" />
      <span class="font-bold tracking-tight text-lg"
        >Command <span class="text-primary">Center</span></span
      >
    </a>
  </div>
  <div class="flex-1 py-6">
    <nav class="grid items-start px-3 text-sm font-medium gap-1.5">
      {#each navItems as item}
        {@const Icon = item.icon}
        {@const isActive = page.url.pathname === item.href}
        <a
          href={item.href}
          class="flex items-center gap-3.5 rounded-lg px-4 py-2.5 transition-all text-base tracking-tight {isActive
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}"
        >
          <Icon
            class="size-5 {isActive ? 'text-primary' : 'text-muted-foreground'}"
          />
          {item.name}
        </a>
      {/each}
    </nav>
  </div>
  <div class="mt-auto p-4 border-t bg-muted/10">
    <div class="bg-muted p-4 rounded-xl text-center border">
      <BotMessageSquare class="size-10 mx-auto text-primary mb-3" />
      <h4 class="font-semibold">Divine Scraper v2</h4>
      <p class="text-xs text-muted-foreground mt-1 mb-3">
        50 new leads found in London.
      </p>
      <Button size="sm" class="w-full rounded-full">Review Now</Button>
    </div>
  </div>
</aside>
