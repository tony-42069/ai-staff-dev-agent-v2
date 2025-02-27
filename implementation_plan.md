# 90-Minute Implementation Plan

## Priority Order

1. **Backend Core (25 mins)**
   - Database Models
   - Core Intelligence Engine (simplified)
   - Main FastAPI App

2. **Backend API (20 mins)**
   - Agent Routes
   - Agent Service

3. **Frontend Essentials (30 mins)**
   - Setup and Configuration
   - API Client
   - Agents Page with List and Create Form

4. **Deployment and Testing (15 mins)**
   - Run Backend Server
   - Run Frontend Dev Server
   - Test End-to-End Functionality

## Detailed Breakdown

### Phase 1: Backend Core (25 mins)

#### 1. Database Models (5 mins)
- Set up SQLAlchemy models for agents
- Create database connection

#### 2. Core Intelligence (10 mins)
- Simplified intelligence engine
- Basic agent factory

#### 3. FastAPI Setup (10 mins)
- Main app with CORS
- Health endpoints
- Database session dependencies

### Phase 2: Backend API (20 mins)

#### 1. Agent Routes (10 mins)
- GET /agents
- POST /agents
- GET /agents/{id}
- DELETE /agents/{id}

#### 2. Agent Service (10 mins)
- Business logic for agent operations
- Database interactions

### Phase 3: Frontend Essentials (30 mins)

#### 1. Setup & Configuration (10 mins)
- Install dependencies
- Configure vite, React, Chakra UI

#### 2. API Client (5 mins)
- Axios setup
- Agent service

#### 3. Agent Components (15 mins)
- Agent list
- Agent creation form
- Basic layout

### Phase 4: Deployment & Testing (15 mins)

#### 1. Run Servers (5 mins)
- Start backend
- Start frontend

#### 2. Testing (10 mins)
- Create agent
- List agents
- Delete agent

## Critical Files to Implement (In Order)

1. `backend/db/models.py`
2. `backend/core/intelligence.py`
3. `backend/main.py`
4. `backend/api/agents.py`
5. `backend/services/agent_service.py`
6. `frontend/package.json` (dependencies)
7. `frontend/vite.config.ts`
8. `frontend/src/services/api.ts`
9. `frontend/src/components/agents/AgentList.tsx`
10. `frontend/src/components/agents/AgentForm.tsx`
11. `frontend/src/pages/AgentsPage.tsx`
12. `frontend/src/App.tsx`

## Minimum Feature Set for MVP

- Create agent with name, description, capabilities
- List all agents
- Delete agent
- Basic UI with navigation

## Optional Features (If Time Permits)

- Agent details page
- Update agent
- Start/stop agent
- Execute agent tasks