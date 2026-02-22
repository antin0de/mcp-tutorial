export interface TutorialModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  order: number;
  sections: TutorialSection[];
}

export interface TutorialSection {
  id: string;
  slug: string;
  title: string;
  order: number;
  contentPath: string;
}

export interface CodeExample {
  filename?: string;
  language: string;
  code: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export interface Callout {
  type: 'info' | 'warning' | 'tip' | 'error' | 'success';
  title?: string;
  content: string;
}

export const TUTORIAL_STRUCTURE: TutorialModule[] = [
  {
    id: 'prerequisites',
    title: 'Prerequisites',
    description: 'Set up your development environment',
    estimatedTime: 45,
    order: 1,
    sections: [
      {
        id: 'welcome',
        slug: 'welcome',
        title: 'Welcome to MCP',
        order: 1,
        contentPath: 'src/content/tutorials/prerequisites/welcome.mdx'
      },
      {
        id: 'nodejs',
        slug: 'nodejs-setup',
        title: 'Node.js Setup',
        order: 2,
        contentPath: 'src/content/tutorials/prerequisites/nodejs.mdx'
      },
      {
        id: 'typescript',
        slug: 'typescript-setup',
        title: 'TypeScript Setup',
        order: 3,
        contentPath: 'src/content/tutorials/prerequisites/typescript.mdx'
      },
      {
        id: 'docker',
        slug: 'docker-setup',
        title: 'Docker Setup',
        order: 4,
        contentPath: 'src/content/tutorials/prerequisites/docker.mdx'
      },
      {
        id: 'validation',
        slug: 'environment-validation',
        title: 'Environment Validation',
        order: 5,
        contentPath: 'src/content/tutorials/prerequisites/validation.mdx'
      }
    ]
  },
  {
    id: 'mcp-concepts',
    title: 'MCP Concepts',
    description: 'Understand the Model Context Protocol architecture',
    estimatedTime: 45,
    order: 2,
    sections: [
      {
        id: 'what-is-mcp',
        slug: 'what-is-mcp',
        title: 'What is MCP?',
        order: 1,
        contentPath: 'src/content/tutorials/mcp-concepts/01-what-is-mcp.mdx'
      },
      {
        id: 'architecture',
        slug: 'architecture',
        title: 'Architecture Deep Dive',
        order: 2,
        contentPath: 'src/content/tutorials/mcp-concepts/02-architecture.mdx'
      },
      {
        id: 'resources',
        slug: 'resources',
        title: 'Core Concepts: Resources',
        order: 3,
        contentPath: 'src/content/tutorials/mcp-concepts/03-resources.mdx'
      },
      {
        id: 'tools',
        slug: 'tools',
        title: 'Core Concepts: Tools',
        order: 4,
        contentPath: 'src/content/tutorials/mcp-concepts/04-tools.mdx'
      },
      {
        id: 'prompts',
        slug: 'prompts',
        title: 'Core Concepts: Prompts',
        order: 5,
        contentPath: 'src/content/tutorials/mcp-concepts/05-prompts.mdx'
      },
      {
        id: 'transports',
        slug: 'transports',
        title: 'Core Concepts: Transports',
        order: 6,
        contentPath: 'src/content/tutorials/mcp-concepts/06-transports.mdx'
      },
      {
        id: 'capabilities',
        slug: 'capabilities',
        title: 'MCP Capabilities & Negotiation',
        order: 7,
        contentPath: 'src/content/tutorials/mcp-concepts/07-capabilities.mdx'
      }
    ]
  },
  {
    id: 'first-server',
    title: 'First Server',
    description: 'Build your first MCP server',
    estimatedTime: 45,
    order: 3,
    sections: [
      {
        id: 'project-init',
        slug: 'project-init',
        title: 'Project Initialization',
        order: 1,
        contentPath: 'src/content/tutorials/first-server/01-project-init.mdx'
      },
      {
        id: 'server-structure',
        slug: 'server-structure',
        title: 'Basic Server Structure',
        order: 2,
        contentPath: 'src/content/tutorials/first-server/02-server-structure.mdx'
      },
      {
        id: 'first-tool',
        slug: 'first-tool',
        title: 'Adding Your First Tool',
        order: 3,
        contentPath: 'src/content/tutorials/first-server/03-first-tool.mdx'
      },
      {
        id: 'running-locally',
        slug: 'running-locally',
        title: 'Running Locally',
        order: 4,
        contentPath: 'src/content/tutorials/first-server/04-running-locally.mdx'
      },
      {
        id: 'mcp-inspector',
        slug: 'mcp-inspector',
        title: 'Testing with MCP Inspector',
        order: 5,
        contentPath: 'src/content/tutorials/first-server/05-mcp-inspector.mdx'
      },
      {
        id: 'debugging',
        slug: 'debugging',
        title: 'Debugging Basics',
        order: 6,
        contentPath: 'src/content/tutorials/first-server/06-debugging.mdx'
      }
    ]
  },
  {
    id: 'tools-resources',
    title: 'Tools & Resources',
    description: 'Build powerful tools and resources',
    estimatedTime: 60,
    order: 4,
    sections: [
      {
        id: 'understanding-tools',
        slug: 'understanding-tools',
        title: 'Understanding Tools',
        order: 1,
        contentPath: 'src/content/tutorials/tools-resources/01-understanding-tools.mdx'
      },
      {
        id: 'calculator-tool',
        slug: 'calculator-tool',
        title: 'Calculator Tool Example',
        order: 2,
        contentPath: 'src/content/tutorials/tools-resources/02-calculator-tool.mdx'
      },
      {
        id: 'tool-errors',
        slug: 'tool-errors',
        title: 'Tool Error Handling',
        order: 3,
        contentPath: 'src/content/tutorials/tools-resources/03-tool-errors.mdx'
      },
      {
        id: 'understanding-resources',
        slug: 'understanding-resources',
        title: 'Understanding Resources',
        order: 4,
        contentPath: 'src/content/tutorials/tools-resources/04-understanding-resources.mdx'
      },
      {
        id: 'file-resource',
        slug: 'file-resource',
        title: 'File Reading Resource',
        order: 5,
        contentPath: 'src/content/tutorials/tools-resources/05-file-resource.mdx'
      },
      {
        id: 'resource-subscriptions',
        slug: 'resource-subscriptions',
        title: 'Resource Subscriptions',
        order: 6,
        contentPath: 'src/content/tutorials/tools-resources/06-resource-subscriptions.mdx'
      },
      {
        id: 'best-practices',
        slug: 'best-practices',
        title: 'Best Practices',
        order: 7,
        contentPath: 'src/content/tutorials/tools-resources/07-best-practices.mdx'
      }
    ]
  },
  {
    id: 'prompts',
    title: 'Prompts',
    description: 'Create template interactions',
    estimatedTime: 30,
    order: 5,
    sections: [
      {
        id: 'what-are-prompts',
        slug: 'what-are-prompts',
        title: 'What are Prompts?',
        order: 1,
        contentPath: 'src/content/tutorials/prompts/01-what-are-prompts.mdx'
      },
      {
        id: 'static-prompts',
        slug: 'static-prompts',
        title: 'Defining Static Prompts',
        order: 2,
        contentPath: 'src/content/tutorials/prompts/02-static-prompts.mdx'
      },
      {
        id: 'dynamic-prompts',
        slug: 'dynamic-prompts',
        title: 'Dynamic Prompts with Arguments',
        order: 3,
        contentPath: 'src/content/tutorials/prompts/03-dynamic-prompts.mdx'
      },
      {
        id: 'prompt-templates',
        slug: 'prompt-templates',
        title: 'Prompt Templates',
        order: 4,
        contentPath: 'src/content/tutorials/prompts/04-prompt-templates.mdx'
      },
      {
        id: 'use-cases',
        slug: 'use-cases',
        title: 'Use Cases and Examples',
        order: 5,
        contentPath: 'src/content/tutorials/prompts/05-use-cases.mdx'
      }
    ]
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Deploy your MCP server',
    estimatedTime: 60,
    order: 6,
    sections: [
      {
        id: 'local-dev',
        slug: 'local-dev',
        title: 'Local Development Setup',
        order: 1,
        contentPath: 'src/content/tutorials/deployment/01-local-dev.mdx'
      },
      {
        id: 'environment-config',
        slug: 'environment-config',
        title: 'Environment Configuration',
        order: 2,
        contentPath: 'src/content/tutorials/deployment/02-environment-config.mdx'
      },
      {
        id: 'production-build',
        slug: 'production-build',
        title: 'Building for Production',
        order: 3,
        contentPath: 'src/content/tutorials/deployment/03-production-build.mdx'
      },
      {
        id: 'docker',
        slug: 'docker',
        title: 'Docker Containerization',
        order: 4,
        contentPath: 'src/content/tutorials/deployment/04-docker.mdx'
      },
      {
        id: 'docker-compose',
        slug: 'docker-compose',
        title: 'Docker Compose Setup',
        order: 5,
        contentPath: 'src/content/tutorials/deployment/05-docker-compose.mdx'
      },
      {
        id: 'vps-deployment',
        slug: 'vps-deployment',
        title: 'VPS Deployment (Linux)',
        order: 6,
        contentPath: 'src/content/tutorials/deployment/06-vps-deployment.mdx'
      },
      {
        id: 'cloud-deployment',
        slug: 'cloud-deployment',
        title: 'Cloud Deployment Options',
        order: 7,
        contentPath: 'src/content/tutorials/deployment/07-cloud-deployment.mdx'
      },
      {
        id: 'monitoring',
        slug: 'monitoring',
        title: 'Monitoring and Logging',
        order: 8,
        contentPath: 'src/content/tutorials/deployment/08-monitoring.mdx'
      }
    ]
  }
];