//! OmniDev CLI - High Performance Rust Developer Utilities
//! Repository: https://github.com/ilynx69/awesome-ai-devtools

use std::collections::HashMap;
use std::env;

#[derive(Debug)]
struct CapacityPlan {
    dau: u64,
    read_qps: u64,
    write_qps: u64,
    total_qps: u64,
    peak_qps: u64,
    yearly_storage_tb: f64,
    ram_cache_gb: u64,
}

fn calculate_capacity(dau: u64, reads_per_user: u64, writes_per_user: u64, payload_kb: f64) -> CapacityPlan {
    let seconds_per_day: f64 = 86400.0;
    let total_reads = (dau as f64) * (reads_per_user as f64);
    let total_writes = (dau as f64) * (writes_per_user as f64);

    let read_qps = (total_reads / seconds_per_day).round() as u64;
    let write_qps = (total_writes / seconds_per_day).round() as u64;
    let total_qps = read_qps + write_qps;
    let peak_qps = ((total_qps as f64) * 2.5).round() as u64;

    let daily_gb = (total_writes * payload_kb) / (1024.0 * 1024.0);
    let yearly_storage_tb = (daily_gb * 365.0) / 1024.0;

    let daily_read_gb = (total_reads * payload_kb) / (1024.0 * 1024.0);
    let ram_cache_gb = (daily_read_gb * 0.2).ceil() as u64;

    CapacityPlan {
        dau,
        read_qps,
        write_qps,
        total_qps,
        peak_qps,
        yearly_storage_tb,
        ram_cache_gb,
    }
}

fn print_mcp_config() {
    println!(r#"{{
  "mcpServers": {{
    "filesystem": {{
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:/Projects"]
    }},
    "github": {{
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {{
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }}
    }},
    "postgres": {{
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/db"]
    }}
  }}
}}"#);
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        println!("⚡ OmniDev Rust CLI v1.5.0");
        println!("Usage:");
        println!("  omnidev-cli capacity <dau> <reads_per_day> <writes_per_day> <payload_kb>");
        println!("  omnidev-cli mcp-export");
        println!("  omnidev-cli info");
        return;
    }

    match args[1].as_str() {
        "capacity" => {
            let dau = args.get(2).and_then(|s| s.parse().ok()).unwrap_or(10_000_000);
            let reads = args.get(3).and_then(|s| s.parse().ok()).unwrap_or(50);
            let writes = args.get(4).and_then(|s| s.parse().ok()).unwrap_or(5);
            let payload_kb = args.get(5).and_then(|s| s.parse().ok()).unwrap_or(2.0);

            let plan = calculate_capacity(dau, reads, writes, payload_kb);
            println!("==================================================");
            println!("📐 System Design Capacity (Calculated in Rust)");
            println!("==================================================");
            println!("DAU:                  {}", plan.dau);
            println!("Average QPS:          {} (read: {}, write: {})", plan.total_qps, plan.read_qps, plan.write_qps);
            println!("Peak QPS (2.5x):      {}", plan.peak_qps);
            println!("Yearly Storage (TB):  {:.2} TB", plan.yearly_storage_tb);
            println!("RAM for Cache (80/20):{} GB", plan.ram_cache_gb);
            println!("==================================================");
        }
        "mcp-export" => {
            print_mcp_config();
        }
        "info" => {
            println!("OmniDev: The Ultimate AI Engineer & Developer Cockpit");
            println!("Author: ilynx69 (https://github.com/ilynx69)");
        }
        _ => {
            eprintln!("Unknown command: {}", args[1]);
        }
    }
}
