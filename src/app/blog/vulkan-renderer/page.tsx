import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Building a Vulkan Renderer from Scratch',
  description:
    'A deep dive into building a custom PBR rendering engine with the Vulkan API — from pipeline architecture to a 35% performance optimization.',
};

export default function VulkanRendererPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900">
      <article className="container mx-auto px-6 py-20 max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFCC00] transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent leading-tight">
            Building a Vulkan Renderer from Scratch
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <time>November 2025</time>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>10 min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {['C++', 'Vulkan API', 'GLSL', 'PBR', 'CMake'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm border border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">
          {/* Intro */}
          <p className="text-lg">
            Every graphics programmer eventually asks the same question: how does a triangle actually
            get from application memory to the screen? After years of working inside engines that
            abstract that pipeline away, I decided to find out by building a Vulkan renderer from
            the ground up.
          </p>

          {/* Why Vulkan */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Why Vulkan Over OpenGL
          </h2>
          <p>
            OpenGL served the industry well for decades, but its driver-managed state machine hides
            critical decisions from the developer. Vulkan inverts that relationship. You control
            memory allocation, synchronization, and command recording explicitly. That extra
            responsibility is exactly the point — you cannot optimize what you cannot see.
          </p>
          <p>
            For a portfolio project meant to demonstrate graphics engineering depth, Vulkan was the
            obvious choice. It forces you to understand every stage of the pipeline, from device
            selection and queue families through render pass compatibility and descriptor set
            layouts.
          </p>

          {/* Pipeline Architecture */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            PBR Pipeline Architecture
          </h2>
          <p>
            The renderer uses a physically-based rendering (PBR) pipeline following the
            metallic-roughness workflow. The core loop looks deceptively simple: record commands,
            submit to a queue, present the swapchain image. The complexity lives in what gets
            recorded.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 my-6 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre">
{`// Simplified render loop structure
void Renderer::drawFrame() {
    vkWaitForFences(device, 1, &inFlightFence, VK_TRUE, UINT64_MAX);

    uint32_t imageIndex;
    vkAcquireNextImageKHR(device, swapchain, UINT64_MAX,
                          imageAvailableSemaphore, VK_NULL_HANDLE,
                          &imageIndex);

    recordCommandBuffer(commandBuffer, imageIndex);

    VkSubmitInfo submitInfo{};
    submitInfo.sType = VK_STRUCTURE_TYPE_SUBMIT_INFO;
    // ... semaphore configuration ...
    submitInfo.commandBufferCount = 1;
    submitInfo.pCommandBuffers = &commandBuffer;

    vkQueueSubmit(graphicsQueue, 1, &submitInfo, inFlightFence);
    // Present swapchain image
}`}
            </pre>
          </div>

          <p>
            Each frame, the command buffer records draw calls that bind the PBR pipeline, set
            descriptor sets containing material parameters (albedo, metallic, roughness, normal
            maps), and issue indexed draws. The fragment shader samples those textures and runs the
            Cook-Torrance BRDF to compute final lighting.
          </p>

          {/* Shader Compilation */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Shader Compilation and SPIR-V
          </h2>
          <p>
            Vulkan does not accept GLSL directly. Shaders must be compiled to SPIR-V bytecode, and
            I integrated <code className="font-mono text-[#FFCC00] bg-slate-800 px-1.5 py-0.5 rounded text-sm">glslangValidator</code> into
            the CMake build so shaders recompile automatically when modified. This caught syntax
            errors at build time rather than at runtime — a small workflow win that saved real
            debugging hours.
          </p>
          <p>
            The PBR fragment shader alone runs around 200 lines of GLSL. It handles image-based
            lighting with a prefiltered environment map, a BRDF lookup texture, and an irradiance
            cubemap for diffuse ambient. Getting the energy conservation right between specular and
            diffuse terms was one of the most satisfying debugging sessions of the entire project.
          </p>

          {/* Memory Management */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Memory Management Challenges
          </h2>
          <p>
            Vulkan&apos;s explicit memory model means every buffer and image needs a
            backing <code className="font-mono text-[#FFCC00] bg-slate-800 px-1.5 py-0.5 rounded text-sm">VkDeviceMemory</code> allocation.
            Naively allocating per-resource hits driver limits fast — most implementations cap total
            allocations around 4096.
          </p>
          <p>
            I built a custom allocation layer that sub-allocates from larger memory blocks, grouping
            resources by usage type (vertex/index buffers in device-local memory, uniform buffers in
            host-visible memory). This pattern mirrors what production engines like Unreal use
            internally, and it eliminated allocation-related crashes on lower-end hardware during
            testing.
          </p>

          {/* Frame Graph */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Frame Graph Design
          </h2>
          <p>
            Rather than hardcoding render pass order, I implemented a lightweight frame graph that
            declares resource dependencies between passes. The graph resolves execution order,
            inserts pipeline barriers for image layout transitions, and reuses transient attachments
            where lifetimes don&apos;t overlap.
          </p>
          <p>
            For a renderer this size, a frame graph is arguably overkill. But it made adding shadow
            mapping trivial — I declared a depth-only pass, the graph inserted the correct barriers,
            and the shadow map was available as a sampled image in the lighting pass without any
            manual synchronization code.
          </p>

          {/* Performance */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            35% Performance Optimization
          </h2>
          <p>
            The initial implementation ran at about 90 FPS on my test scene (a few hundred meshes
            with PBR materials). Profiling with RenderDoc revealed two bottlenecks: redundant
            pipeline state changes and per-frame command buffer allocation.
          </p>
          <p>
            <strong className="text-white">Pipeline state caching</strong> eliminated redundant{' '}
            <code className="font-mono text-[#FFCC00] bg-slate-800 px-1.5 py-0.5 rounded text-sm">vkCmdBindPipeline</code> calls
            by sorting draw calls by material, then only binding when the pipeline handle actually
            changed. This alone recovered about 15% of frame time.
          </p>
          <p>
            <strong className="text-white">Command buffer reuse</strong> replaced the pattern of
            allocating and recording fresh command buffers every frame. By pre-recording static
            geometry into secondary command buffers and only re-recording the dynamic portions, I
            cut CPU-side recording time roughly in half. Combined with descriptor set pooling for
            efficient GPU resource binding, total throughput improved by 35%.
          </p>

          {/* Takeaway */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            What I Took Away
          </h2>
          <p>
            Building a renderer from scratch changed how I think about every engine I use
            professionally. When I work in Unreal Engine now, I understand why certain material
            configurations are expensive, why draw call batching matters, and what the RHI
            abstraction layer is actually doing underneath.
          </p>
          <p>
            The project is open source. If you&apos;re considering your own Vulkan journey, the
            repository includes validation layer setup, the full PBR shader source, and the CMake
            build configuration with automatic SPIR-V compilation.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-3">Explore the Source</h3>
          <p className="text-gray-400 mb-6">
            The full Vulkan Renderer source code is available on GitHub, including PBR shaders,
            CMake configuration, and validation layer setup.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/GrizzwaldHouse/Vulkan-Renderer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCC00] hover:bg-[#D50032] text-slate-900 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              View on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/projects/vulkan-renderer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              View Project Details
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
