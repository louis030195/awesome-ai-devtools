/**
 * OmniDev - Core TypeScript Interface Definitions
 * Standardized data models for Prompts, MCP Servers, AI Models & System Architecture
 */

export interface PromptVariable {
  key: string;
  label: string;
  default: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Architecture' | 'Security' | 'Refactoring' | 'Database' | 'DevOps' | 'API Design' | 'Utilities';
  badge: string;
  description: string;
  variables: PromptVariable[];
  template: string;
}

export interface MCPServerConfig {
  id: string;
  name: string;
  author: string;
  category: string;
  description: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
  featured?: boolean;
}

export interface ClaudeDesktopConfig {
  mcpServers: Record<string, {
    command: string;
    args: string[];
    env?: Record<string, string>;
  }>;
}

export interface AIModelBenchmark {
  name: string;
  provider: string;
  context: string;
  inputPrice: string;
  outputPrice: string;
  codingScore: string;
  speed: string;
  bestFor: string;
  type: 'Proprietary' | 'Open Weights';
  badge: string;
}

export interface SystemCapacityInput {
  dau: number;
  readsPerUserDay: number;
  writesPerUserDay: number;
  avgPayloadKb: number;
}

export interface SystemCapacityOutput {
  readQps: number;
  writeQps: number;
  totalQps: number;
  peakQps: number;
  dailyStorageGb: number;
  yearlyStorageTb: number;
  cacheRamGb: number;
  ingressBandwidthMbps: number;
  egressBandwidthMbps: number;
}
