export interface TutorialSection {
  id: string
  slug: string
  title: string
  description: string
  order: number
}

export interface TutorialModule {
  id: string
  title: string
  description: string
  order: number
  estimatedTime: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  sections: TutorialSection[]
}

// Module 1: Prerequisites
const prerequisitesModule: TutorialModule = {
  id: 'prerequisites',
  title: 'Prerequisites',
  description: 'Set up your development environment and understand the core concepts needed for MCP development.',
  order: 1,
  estimatedTime: '45 min',
  difficulty: 'beginner',
  sections: [
    {
      id: 'node-setup',
      slug: 'node-setup',
      title: 'Node.js & TypeScript Setup',
      description: 'Install Node.js, TypeScript, and configure your development environment.',
      order: 1,
    },
    {
      id: 'mcp-basics',
      slug: 'mcp-basics',
      title: 'What is MCP?',
      description: 'Understand the Model Context Protocol and its role in AI applications.',
      order: 2,
    },
    {
      id: 'development-tools',
      slug: 'development-tools',
      title: 'Essential Development Tools',
      description: 'Set up Git, VS Code, and other essential tools for MCP development.',
      order: 3,
    },
    {
      id: 'project-structure',
      slug: 'project-structure',
      title: 'Understanding Project Structure',
      description: 'Learn how MCP projects are organized and why it matters.',
      order: 4,
    }
  ]
}

// Module 2: MCP Concepts
const mcpConceptsModule: TutorialModule = {
  id: 'mcp-concepts',
  title: 'MCP Concepts',
  description: 'Deep dive into MCP architecture, communication patterns, and core building blocks.',
  order: 2,
  estimatedTime: '60 min',
  difficulty: 'beginner',
  sections: [
    {
      id: 'architecture',
      slug: 'architecture',
      title: 'MCP Architecture',
      description: 'Understand the client-server model and how components interact.',
      order: 1,
    },
    {
      id: 'json-rpc',
      slug: 'json-rpc',
      title: 'JSON-RPC Communication',
      description: 'Learn about the JSON-RPC 2.0 protocol used for MCP communication.',
      order: 2,
    },
    {
      id: 'resources',
      slug: 'resources',
      title: 'Resources',
      description: 'Explore how to expose and manage data through resources.',
      order: 3,
    },
    {
      id: 'tools',
      slug: 'tools',
      title: 'Tools',
      description: 'Understand how to define and implement callable tools.',
      order: 4,
    },
    {
      id: 'prompts',
      slug: 'prompts',
      title: 'Prompts',
      description: 'Learn about prompt templates and how to use them effectively.',
      order: 5,
    }
  ]
}

// Module 3: First MCP Server
const firstServerModule: TutorialModule = {
  id: 'first-server',
  title: 'Building Your First MCP Server',
  description: 'Create a functional MCP server from scratch with resources, tools, and prompts.',
  order: 3,
  estimatedTime: '90 min',
  difficulty: 'intermediate',
  sections: [
    {
      id: 'project-initialization',
      slug: 'project-initialization',
      title: 'Project Initialization',
      description: 'Set up a new MCP server project with TypeScript and dependencies.',
      order: 1,
    },
    {
      id: 'basic-server',
      slug: 'basic-server',
      title: 'Creating a Basic Server',
      description: 'Implement a minimal MCP server that can connect to clients.',
      order: 2,
    },
    {
      id: 'adding-resources',
      slug: 'adding-resources',
      title: 'Adding Resources',
      description: 'Expose data through resources and handle resource requests.',
      order: 3,
    },
    {
      id: 'adding-tools',
      slug: 'adding-tools',
      title: 'Adding Tools',
      description: 'Implement tools that clients can call to perform actions.',
      order: 4,
    },
    {
      id: 'testing-server',
      slug: 'testing-server',
      title: 'Testing Your Server',
      description: 'Test your server locally and verify all features work correctly.',
      order: 5,
    }
  ]
}

// Module 4: Tools and Resources
const toolsResourcesModule: TutorialModule = {
  id: 'tools-resources',
  title: 'Advanced Tools & Resources',
  description: 'Master advanced patterns for tools, resources, and data management.',
  order: 4,
  estimatedTime: '75 min',
  difficulty: 'intermediate',
  sections: [
    {
      id: 'dynamic-resources',
      slug: 'dynamic-resources',
      title: 'Dynamic Resources',
      description: 'Create resources that update dynamically and support subscriptions.',
      order: 1,
    },
    {
      id: 'tool-parameters',
      slug: 'tool-parameters',
      title: 'Advanced Tool Parameters',
      description: 'Define complex tool schemas with validation and optional parameters.',
      order: 2,
    },
    {
      id: 'error-handling',
      slug: 'error-handling',
      title: 'Error Handling',
      description: 'Implement robust error handling and provide meaningful error messages.',
      order: 3,
    },
    {
      id: 'async-operations',
      slug: 'async-operations',
      title: 'Asynchronous Operations',
      description: 'Handle long-running operations and implement proper async patterns.',
      order: 4,
    },
    {
      id: 'best-practices',
      slug: 'best-practices',
      title: 'Tools & Resources Best Practices',
      description: 'Learn proven patterns and common pitfalls to avoid.',
      order: 5,
    }
  ]
}

// Module 5: Prompts
const promptsModule: TutorialModule = {
  id: 'prompts',
  title: 'Working with Prompts',
  description: 'Create effective prompt templates and leverage them for AI interactions.',
  order: 5,
  estimatedTime: '45 min',
  difficulty: 'intermediate',
  sections: [
    {
      id: 'prompt-templates',
      slug: 'prompt-templates',
      title: 'Prompt Templates',
      description: 'Create reusable prompt templates with dynamic content.',
      order: 1,
    },
    {
      id: 'prompt-arguments',
      slug: 'prompt-arguments',
      title: 'Prompt Arguments',
      description: 'Define and use arguments to customize prompt templates.',
      order: 2,
    },
    {
      id: 'prompt-strategies',
      slug: 'prompt-strategies',
      title: 'Prompt Strategies',
      description: 'Learn effective strategies for structuring and using prompts.',
      order: 3,
    }
  ]
}

// Module 6: Deployment
const deploymentModule: TutorialModule = {
  id: 'deployment',
  title: 'Deployment & Distribution',
  description: 'Package, test, and distribute your MCP server to users.',
  order: 6,
  estimatedTime: '60 min',
  difficulty: 'advanced',
  sections: [
    {
      id: 'packaging',
      slug: 'packaging',
      title: 'Packaging Your Server',
      description: 'Prepare your server for distribution with proper configuration.',
      order: 1,
    },
    {
      id: 'npm-distribution',
      slug: 'npm-distribution',
      title: 'NPM Distribution',
      description: 'Publish your server to npm for easy installation.',
      order: 2,
    },
    {
      id: 'configuration',
      slug: 'configuration',
      title: 'Server Configuration',
      description: 'Handle configuration options and environment variables.',
      order: 3,
    },
    {
      id: 'documentation',
      slug: 'documentation',
      title: 'Documentation',
      description: 'Write clear documentation for users and developers.',
      order: 4,
    },
    {
      id: 'maintenance',
      slug: 'maintenance',
      title: 'Maintenance & Updates',
      description: 'Strategies for maintaining and updating your server over time.',
      order: 5,
    }
  ]
}

// All modules
export const tutorialModules: TutorialModule[] = [
  prerequisitesModule,
  mcpConceptsModule,
  firstServerModule,
  toolsResourcesModule,
  promptsModule,
  deploymentModule
]

// Utility functions
export function getModule(moduleId: string): TutorialModule | undefined {
  return tutorialModules.find(m => m.id === moduleId)
}

export function getSection(moduleId: string, sectionSlug: string): TutorialSection | undefined {
  const tutorialModule = getModule(moduleId)
  return tutorialModule?.sections.find(s => s.slug === sectionSlug)
}

export function getNextSection(
  moduleId: string,
  sectionId: string
): { module: TutorialModule; section: TutorialSection } | undefined {
  const currentModule = getModule(moduleId)
  if (!currentModule) return undefined

  const currentSectionIndex = currentModule.sections.findIndex(s => s.id === sectionId)
  if (currentSectionIndex === -1) return undefined

  // Try next section in current module
  if (currentSectionIndex < currentModule.sections.length - 1) {
    return {
      module: currentModule,
      section: currentModule.sections[currentSectionIndex + 1]
    }
  }

  // Try first section of next module
  const currentModuleIndex = tutorialModules.findIndex(m => m.id === moduleId)
  if (currentModuleIndex < tutorialModules.length - 1) {
    const nextModule = tutorialModules[currentModuleIndex + 1]
    return {
      module: nextModule,
      section: nextModule.sections[0]
    }
  }

  return undefined
}

export function getPrevSection(
  moduleId: string,
  sectionId: string
): { module: TutorialModule; section: TutorialSection } | undefined {
  const currentModule = getModule(moduleId)
  if (!currentModule) return undefined

  const currentSectionIndex = currentModule.sections.findIndex(s => s.id === sectionId)
  if (currentSectionIndex === -1) return undefined

  // Try previous section in current module
  if (currentSectionIndex > 0) {
    return {
      module: currentModule,
      section: currentModule.sections[currentSectionIndex - 1]
    }
  }

  // Try last section of previous module
  const currentModuleIndex = tutorialModules.findIndex(m => m.id === moduleId)
  if (currentModuleIndex > 0) {
    const prevModule = tutorialModules[currentModuleIndex - 1]
    return {
      module: prevModule,
      section: prevModule.sections[prevModule.sections.length - 1]
    }
  }

  return undefined
}
