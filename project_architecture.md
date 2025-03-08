graph TD
    subgraph Frontend
        FE[React App] --> Router[React Router]
        Router --> Pages[Page Components]
        Pages --> Components[UI Components]
        Components --> Hooks[Custom Hooks]
        Hooks --> Services[API Services]
        Services --> ApiClient[Axios Client]
    end
    
    subgraph Backend
        ApiClient --> FastAPI[FastAPI App]
        FastAPI --> Routes[API Routes]
        Routes --> Services[Business Logic]
        Services --> DB[Database Models]
        Services --> Core[Core Intelligence]
        Core --> Factory[Agent Factory]
        Core --> AgentManager[Agent Manager]
    end
    
    subgraph ProtectedIP
        Factory --> Templates[Agent Templates]
        Core --> Configuration[Agent Configurations]
    end
    
    subgraph Storage
        DB --> SQLite[SQLite Database]
    end