import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MCP Command Panel: Bridging AI to Unreal Editor',
  description:
    'How I built a C++ plugin and Python backend that lets AI models send commands directly to the Unreal Editor through the Model Context Protocol.',
};

export default function McpCommandPanelPost() {
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
            MCP Command Panel: Bridging AI to Unreal Editor
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <time>January 2026</time>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>9 min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {['C++', 'Python', 'FastAPI', 'Unreal Engine', 'MCP'].map((tag) => (
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
            What if your AI coding assistant could reach into the Unreal Editor and create actors,
            modify properties, or trigger builds — without you clicking a single button? That
            question drove me to build the MCP Command Panel, a full-stack bridge between AI models
            and the Unreal Engine editor.
          </p>

          {/* What is MCP */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            What Is the Model Context Protocol
          </h2>
          <p>
            The Model Context Protocol (MCP) is an open standard for connecting AI models to
            external tools and data sources. Instead of LLMs just generating text, MCP lets them
            invoke real operations — reading files, querying databases, or in this case, controlling
            a game editor.
          </p>
          <p>
            For game development, MCP is transformative. Level designers could describe a scene in
            natural language and have the editor assemble it. Programmers could ask an AI to scaffold
            a gameplay system and have the boilerplate code and Blueprints generated in-engine. The
            MCP Command Panel makes that interaction layer concrete.
          </p>

          {/* Architecture */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Architecture: Two Languages, One Pipeline
          </h2>
          <p>
            The system has two halves that communicate over HTTP and TCP.
          </p>
          <p>
            <strong className="text-white">The C++ Unreal plugin</strong> lives inside the editor
            as a standard engine plugin. It registers an HTTP client that connects to the Python
            backend, receives JSON-RPC command payloads, validates them against a schema, and
            dispatches them to the appropriate editor subsystem. An Editor Utility Widget provides a
            live dashboard showing incoming commands, execution status, and logs.
          </p>
          <p>
            <strong className="text-white">The Python FastAPI backend</strong> acts as the
            orchestration layer. It exposes MCP-compatible tool endpoints that AI providers (Claude,
            Gemini) can call. When a command comes in, the backend translates it into Unreal&apos;s
            expected format, forwards it to the plugin over TCP, and streams the result back to the
            AI model.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 my-6 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre">
{`# Simplified FastAPI endpoint for MCP tool registration
@app.post("/mcp/tools/execute")
async def execute_tool(request: ToolRequest):
    """
    Receives an MCP tool call from the AI model,
    translates it into an Unreal command, and
    forwards it to the C++ plugin via TCP.
    """
    command = translate_to_unreal(request.tool_name, request.arguments)
    result = await unreal_bridge.send_command(command)
    return ToolResponse(
        status="success",
        result=result.to_dict()
    )`}
            </pre>
          </div>

          {/* C++ Bridge */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            The C++ Bridge: Editor Integration
          </h2>
          <p>
            The plugin side was the harder engineering challenge. Unreal&apos;s editor runs on the
            game thread, and network operations must not block it. I used Unreal&apos;s built-in
            HTTP module for the initial handshake, then established a persistent TCP connection with
            keepalive for low-latency command delivery.
          </p>
          <p>
            Commands arrive as JSON-RPC payloads. Each command type maps to a handler function that
            interacts with the editor API — spawning actors, modifying component properties,
            compiling Blueprints, or triggering PIE (Play In Editor) sessions. The handler validates
            inputs against a schema before execution, preventing malformed AI output from crashing
            the editor.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 my-6 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre">
{`// Command dispatch in the C++ plugin
void FMCPCommandHandler::ProcessCommand(
    const FString& Method,
    const TSharedPtr<FJsonObject>& Params)
{
    if (Method == TEXT("editor.spawnActor"))
    {
        HandleSpawnActor(Params);
    }
    else if (Method == TEXT("editor.setProperty"))
    {
        HandleSetProperty(Params);
    }
    else if (Method == TEXT("editor.compileBP"))
    {
        HandleCompileBlueprint(Params);
    }
    // ... additional handlers
}`}
            </pre>
          </div>

          <p>
            Automatic reconnection was essential. During long development sessions the TCP
            connection would occasionally drop — the plugin detects disconnection within two
            keepalive intervals and re-establishes the link without user intervention.
          </p>

          {/* Python Layer */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Python Orchestration Layer
          </h2>
          <p>
            The Python side handles the complexity of multiple AI providers. Each provider has
            slightly different tool-calling conventions, so the orchestration layer normalizes
            those into a consistent internal format before forwarding to Unreal.
          </p>
          <p>
            FastAPI&apos;s async support was critical here. Commands from the AI model are
            non-blocking, and the WebSocket channel to the editor streams results back as they
            complete. This means the AI model can issue a batch of operations — &quot;create a
            directional light, set its intensity to 5.0, rotate it 45 degrees&quot; — and receive
            confirmation for each step individually.
          </p>

          {/* Real World Usage */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Real-World Usage
          </h2>
          <p>
            In practice, the most useful commands turned out to be surprisingly mundane. Bulk
            property editing across dozens of actors, scaffolding standard gameplay components from
            a description, and automated PIE testing saved more time than any flashy level-generation
            demo. The tool shines at repetitive editor tasks that eat hours during production.
          </p>
          <p>
            I also use it during my own development workflow. When working on Island Escape, I had
            the AI set up test scenarios — spawning enemy waves with specific configurations —
            through MCP commands rather than manually placing actors. That feedback loop of
            &quot;describe, execute, observe&quot; is genuinely faster than the traditional
            editor workflow for iteration-heavy tasks.
          </p>

          {/* What is Next */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Looking Ahead
          </h2>
          <p>
            AI-assisted game development is not replacing developers. It is eliminating busywork so
            developers can focus on creative and architectural decisions that actually matter. The
            MCP Command Panel is my bet on what that workflow looks like in practice — a clean
            bridge between natural language intent and editor operations.
          </p>
          <p>
            The next milestone is Blueprint graph manipulation. Right now the tool handles property
            editing and actor management, but generating visual scripting nodes programmatically
            would open up an entirely new category of AI-assisted workflows.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-3">Check Out the Project</h3>
          <p className="text-gray-400 mb-6">
            The MCP Command Panel source code is available on GitHub, including the C++ Unreal
            plugin and the Python FastAPI backend.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/GrizzwaldHouse/mcp-command-panel"
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
              href="/projects/mcp-command-panel"
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
