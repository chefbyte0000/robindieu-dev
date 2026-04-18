<script lang="ts">
  import { T } from "@threlte/core";
  import { Float, OrbitControls } from "@threlte/extras";
  import { estimatorState } from "$lib/state/estimator.svelte";
  import { themeState } from "$lib/state/theme.svelte";
  import { spring } from "svelte/motion";

  // The standard physics
  const coreScale = spring(1, { stiffness: 0.05, damping: 0.4 });
  const lightIntensity = spring(0.5, { stiffness: 0.1, damping: 0.5 });

  // The Blast-Off physics
  const corePositionY = spring(0, { stiffness: 0.04, damping: 0.6 });
  const camZoom = spring(50, { stiffness: 0.03, damping: 0.8 });

  $effect(() => {
    if (estimatorState.isSubmitted) {
      // THE BLAST OFF SEQUENCE
      // 1. Camera dramatically zooms out to show the vastness
      camZoom.set(20);
      // 2. The core flashes brightly (charging up)
      lightIntensity.set(5);

      // 3. Wait 400ms for the flash to peak, then shrink and shoot into the stratosphere
      setTimeout(() => {
        coreScale.set(0.1);
        corePositionY.set(40); // 40 units up is off-screen
      }, 400);
    } else {
      // STANDARD REACTIVE SIZING
      coreScale.set(1 + estimatorState.complexityScore / 100);
      lightIntensity.set(0.5 + estimatorState.complexityScore / 40);
      corePositionY.set(0);
      camZoom.set(50);
    }
  });

  let coreColor = $derived(themeState.mode === "saas" ? "#00FFFF" : "#f59e0b");
</script>

<T.OrthographicCamera makeDefault position={[10, 10, 10]} zoom={$camZoom}>
  <OrbitControls
    enableZoom={false}
    enablePan={false}
    autoRotate
    autoRotateSpeed={estimatorState.isSubmitted ? 8.0 : 1.5}
  />
</T.OrthographicCamera>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight
  position={[5, 10, 5]}
  intensity={$lightIntensity}
  color={coreColor}
/>
<T.DirectionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
<T.Group position={[0, $corePositionY, 0]}>
  <Float
    floatIntensity={estimatorState.isSubmitted ? 0 : 2}
    floatingRange={[-0.2, 0.2]}
    rotationIntensity={0.5}
  >
    {#if themeState.mode === "saas"}
      <T.Mesh scale={$coreScale}>
        <T.BoxGeometry args={[2, 2, 2]} />
        <T.MeshStandardMaterial
          color={coreColor}
          wireframe={estimatorState.complexityScore < 20}
          transparent
          opacity={0.8}
        />
      </T.Mesh>
    {:else}
      <T.Mesh scale={$coreScale}>
        <T.OctahedronGeometry args={[1.5, 0]} />
        <T.MeshStandardMaterial
          color={coreColor}
          metalness={0.8}
          roughness={0.1}
        />
      </T.Mesh>
    {/if}

    {#each estimatorState.selectedPowerUps as pu, index (pu)}
      {@const angle =
        (index * (Math.PI * 2)) / estimatorState.selectedPowerUps.length}
      <T.Group rotation.y={angle}>
        <T.Mesh position={[2.5 + $coreScale * 0.5, 0, 0]}>
          <T.SphereGeometry args={[0.2, 16, 16]} />
          <T.MeshStandardMaterial
            color="#ffffff"
            emissive={coreColor}
            emissiveIntensity={1}
          />
        </T.Mesh>
      </T.Group>
    {/each}
  </Float>
</T.Group>
