#!/usr/bin/env python3
"""
OmniDev CLI - The AI Engineer & Modern Developer Command-Line Suite
Part of the OmniDev Open-Source Ecosystem: https://github.com/ilynx69/awesome-ai-devtools
"""

import argparse
import json
import math
import sys
import urllib.parse
import urllib.request
from typing import Dict, Any

# Ensure safe output on Windows terminal codepages (cp1251, cp437, etc.)
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

PROMPTS = [
    {
        "id": "p1",
        "title": "Senior Software Architect - System Design",
        "category": "Architecture",
        "template": "Act as a Principal Software Architect. Design {system_name} for scale {scale} under constraints: {constraints}."
    },
    {
        "id": "p2",
        "title": "Zero-Vulnerability Security & Code Audit",
        "category": "Security",
        "template": "Act as Lead AppSec Engineer. Audit this {language} code for OWASP vulnerabilities:\n\n{code}"
    },
    {
        "id": "p3",
        "title": "Clean Code & Performance Refactorer",
        "category": "Refactoring",
        "template": "Act as a Staff Engineer. Refactor this {language} code to SOLID principles:\n\n{code}"
    }
]

MCP_SERVERS = {
    "mcpServers": {
        "filesystem": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:/Projects"]
        },
        "github": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-github"],
            "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"}
        },
        "postgres": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/mydb"]
        },
        "brave-search": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-brave-search"],
            "env": {"BRAVE_API_KEY": "YOUR_BRAVE_API_KEY"}
        }
    }
}

def list_prompts():
    print("=" * 60)
    print("⚡ OmniDev Curated Production Prompts")
    print("=" * 60)
    for p in PROMPTS:
        print(f"[{p['id']}] {p['title']} ({p['category']})")
    print("\nRun: python omnidev.py compile-prompt <id> to view.")

def compile_prompt(prompt_id: str, variables: Dict[str, str]):
    target = next((p for p in PROMPTS if p["id"] == prompt_id), None)
    if not target:
        print(f"Error: Prompt {prompt_id} not found.", file=sys.stderr)
        return
    template = target["template"]
    for k, v in variables.items():
        template = template.replace(f"{{{k}}}", v)
    print("--- Compiled Prompt Output ---")
    print(template)

def export_mcp(output_path: str = None):
    cfg = json.dumps(MCP_SERVERS, indent=2)
    if output_path:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(cfg)
        print(f"✓ Exported MCP configuration to {output_path}")
    else:
        print(cfg)

def calc_capacity(dau: float, reads: float, writes: float, payload_kb: float):
    seconds_per_day = 86400
    total_reads = dau * reads
    total_writes = dau * writes

    read_qps = round(total_reads / seconds_per_day)
    write_qps = round(total_writes / seconds_per_day)
    total_qps = read_qps + write_qps
    peak_qps = round(total_qps * 2.5)

    daily_gb = (total_writes * payload_kb) / (1024 * 1024)
    yearly_tb = (daily_gb * 365) / 1024
    cache_ram_gb = math.ceil(((total_reads * payload_kb) / (1024 * 1024)) * 0.2)

    print("=" * 55)
    print("📐 OmniDev System Design Capacity Planning")
    print("=" * 55)
    print(f"Daily Active Users (DAU) : {int(dau):,}")
    print(f"Average Throughput (QPS)  : {total_qps:,} QPS ({read_qps:,} read / {write_qps:,} write)")
    print(f"Peak Throughput (2.5x)    : {peak_qps:,} QPS")
    print(f"Yearly Storage Growth     : {yearly_tb:.2f} TB / year ({daily_gb:.2f} GB / day)")
    print(f"RAM for Caching (80/20)   : {cache_ram_gb} GB RAM")
    print("=" * 55)

def ask_ai(query: str):
    print(f"🤖 Querying OmniDev Free AI Copilot: '{query}'...")
    encoded = urllib.parse.quote(query)
    url = f"https://text.pollinations.ai/prompt/{encoded}"
    req = urllib.request.Request(url, headers={"User-Agent": "OmniDev-CLI/1.5"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            text = resp.read().decode("utf-8")
            print("\n" + "=" * 50)
            print(text)
            print("=" * 50)
    except Exception as e:
        print(f"\n[Offline Fallback Mode] Could not reach cloud AI ({e}).")
        print("Analysis: Ensure decoupled service boundaries, parameterized inputs, and comprehensive unit tests.")

def main():
    parser = argparse.ArgumentParser(description="OmniDev CLI Suite")
    subparsers = parser.add_subparsers(dest="command")

    # prompts
    subparsers.add_parser("list-prompts", help="List all curated production prompts")
    compile_p = subparsers.add_parser("compile-prompt", help="Compile prompt template")
    compile_p.add_argument("id", help="Prompt ID (e.g. p1)")

    # mcp
    mcp_p = subparsers.add_parser("export-mcp", help="Generate claude_desktop_config.json")
    mcp_p.add_argument("--output", "-o", help="File output destination")

    # capacity
    calc_p = subparsers.add_parser("calc-capacity", help="Calculate system architecture capacity")
    calc_p.add_argument("--dau", type=float, default=10000000, help="Daily Active Users")
    calc_p.add_argument("--reads", type=float, default=50, help="Reads per user/day")
    calc_p.add_argument("--writes", type=float, default=5, help="Writes per user/day")
    calc_p.add_argument("--payload", type=float, default=2.0, help="Payload size in KB")

    # ai
    ai_p = subparsers.add_parser("ask-ai", help="Query free AI assistant from terminal")
    ai_p.add_argument("query", help="Question or prompt to send")

    args = parser.parse_args()

    if args.command == "list-prompts":
        list_prompts()
    elif args.command == "compile-prompt":
        compile_prompt(args.id, {"system_name": "Distributed Messaging Core", "scale": "10M DAU", "constraints": "P99 < 50ms"})
    elif args.command == "export-mcp":
        export_mcp(args.output)
    elif args.command == "calc-capacity":
        calc_capacity(args.dau, args.reads, args.writes, args.payload)
    elif args.command == "ask-ai":
        ask_ai(args.query)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
