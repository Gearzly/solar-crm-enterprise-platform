# Enterprise Grade Solar CRM - System Patterns

## System Architecture

The Enterprise Grade Solar CRM follows a modern, cloud-native architecture designed for scalability, maintainability, and security.

### High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client Layer   │────▶│   API Layer     │────▶│  Service Layer  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │   Data Layer    │
                                              │                 │
                                              └─────────────────┘
```

1. **Client Layer**
   - React-based SPA with Next.js for server-side rendering
   - Responsive design for desktop and mobile access
   - Progressive Web App (PWA) capabilities for offline functionality

2. **API Layer**
   - RESTful API endpoints for CRUD operations
   - GraphQL for complex data queries and real-time updates
   - API Gateway for routing, authentication, and rate limiting

3. **Service Layer**
   - Microservices architecture for domain-specific functionality
   - Event-driven communication between services
   - Background processing for long-running tasks

4. **Data Layer**
   - Relational database for transactional data
   - Document database for flexible schema requirements
   - Time-series database for performance monitoring
   - Caching layer for frequently accessed data

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Cloud Provider                         │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐   │
│  │             │   │             │   │                 │   │
│  │  Frontend   │   │ API Services│   │ Microservices   │   │
│  │  (CDN)      │   │ (Containers)│   │ (Containers)    │   │
│  │             │   │             │   │                 │   │
│  └─────────────┘   └─────────────┘   └─────────────────┘   │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐   │
│  │             │   │             │   │                 │   │
│  │  Database   │   │   Cache     │   │ Message Queue   │   │
│  │  Cluster    │   │             │   │                 │   │
│  │             │   │             │   │                 │   │
│  └─────────────┘   └─────────────┘   └─────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Technical Decisions

### Frontend Framework
- **Next.js with React**: Chosen for its server-side rendering capabilities, improved SEO, and optimized performance
- **TypeScript**: Used for type safety and improved developer experience
- **Material-UI**: Component library for consistent design and rapid development

### API Design
- **REST API**: For standard CRUD operations and compatibility
- **GraphQL**: For complex data fetching requirements and real-time updates
- **OpenAPI/Swagger**: For API documentation and client generation

### Backend Services
- **Node.js/Fastify**: Standardized framework for all microservices, replacing Express for improved performance and plugin system
- **Prisma ORM**: For database operations across all microservices
- **Python/FastAPI**: For data processing and integration services
- **Containerization**: Docker for consistent deployment environments
- **Orchestration**: Kubernetes for service management and scaling

### Data Storage
- **MySQL**: Primary relational database for transactional data
- **MongoDB**: Document database for flexible schema requirements
- **AWS S3**: Cloud storage for documents, files, and attachments
- **InfluxDB**: Time-series database for monitoring and performance data
- **Redis**: In-memory cache for performance optimization

### Authentication & Authorization
- **OAuth 2.0/OIDC**: For authentication and single sign-on
- **JWT**: For stateless authentication between services
- **Role-Based Access Control (RBAC)**: For fine-grained permission management

### Integration
- **Webhook System**: For real-time notifications and integrations
- **Bidirectional Synchronization**: Pattern implemented for third-party integrations like OpenSolar
  - Configurable sync direction (bidirectional, inbound-only, outbound-only)
  - Conflict resolution strategies
  - Stateful synchronization with tracking of sync operations
  - Idempotent operations to prevent duplicates
  - **OpenSolar Webhook Integration**: Implemented with the following patterns:
    - **Webhook Registration**: Intelligent registration that checks for existing webhooks before creating new ones
    - **Signature Verification**: HMAC-SHA256 signature verification for webhook security
    - **Event Processing**: Event-driven architecture with specialized handlers for different event types
    - **Idempotent Processing**: Ensures duplicate webhook events don't cause data inconsistencies
    - **Status Synchronization**: Bidirectional status updates between CRM and OpenSolar
  - **E-Signature Integration with Dropbox Sign**: Implemented with the following patterns:
    - **Secure API Integration**: Uses API keys with environment-based configuration
    - **Webhook Handling**: Real-time signature status updates via webhooks
    - **Signature Verification**: HMAC-SHA256 signature verification for webhook security
    - **Idempotent Processing**: Prevents duplicate processing of signature events
    - **Retry Handling**: Exponential backoff retry logic for handling temporary API failures
    - **Payload Validation**: Comprehensive schema validation for webhook payloads
    - **Secure Storage**: Encrypted storage for signed contracts with access controls
    - **Status Tracking**: Automated contract status updates based on signature events
    - **Notification Integration**: Automated notifications for signature status changes
- **Message Queue**: For asynchronous processing and service communication
- **API Adapters**: For third-party system integration

## Design Patterns

### Architectural Patterns

1. **Microservices Architecture**
   - Domain-driven service boundaries
   - Independent deployment and scaling
   - Polyglot persistence (service-appropriate data stores)

2. **Event-Driven Architecture**
   - Publish-subscribe pattern for service communication
   - Event sourcing for critical business processes
   - Command Query Responsibility Segregation (CQRS) for complex domains

3. **API Gateway Pattern**
   - Centralized entry point for client applications
   - Request routing and composition
   - Cross-cutting concerns (authentication, logging, rate limiting)

4. **Backend for Frontend (BFF) Pattern**
   - Specialized API layers for different client types
   - Optimized data transfer for specific client needs

### Frontend Patterns

1. **Component-Based Architecture**
   - Reusable UI components with clear interfaces
   - Composition over inheritance
   - Atomic design methodology

2. **Flux/Redux Pattern**
   - Unidirectional data flow
   - Centralized state management
   - Predictable state updates

3. **Container/Presenter Pattern**
   - Separation of data fetching and presentation
   - Improved component reusability
   - Simplified testing

4. **Responsive Design Patterns**
   - Mobile-first approach
   - Fluid layouts and flexible images
   - Progressive enhancement

### Backend Patterns

1. **Repository Pattern**
   - Abstraction layer over data access
   - Consistent interface for data operations
   - Simplified testing through mocking

2. **Service Layer Pattern**
   - Encapsulation of business logic
   - Coordination of multiple repositories
   - Transaction management

3. **Mediator Pattern**
   - Decoupling of services through central mediator
   - Simplified service-to-service communication

4. **Circuit Breaker Pattern**
   - Graceful handling of service failures
   - Preventing cascading failures
   - Self-healing system capabilities

5. **Service Composition Pattern**
   - Specialized services with clear responsibilities
   - Services collaborate through well-defined interfaces
   - Example: Lead Management service delegates workflow scheduling to the Workflow Scheduler service

## Component Relationships

### Core Domain Modules

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Lead Module    │────▶│  Opportunity    │────▶│  Project        │
│                 │     │  Module         │     │  Module         │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Customer       │◀───▶│  Support        │◀───▶│  Analytics      │
│  Module         │     │  Module         │     │  Module         │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Service Interactions

1. **Lead Management Flow**
   - Lead Capture Service → Lead Scoring Service → Lead Assignment Service → Workflow Scheduler Service
   - Integration with marketing automation platforms
   - Workflow scheduling for lead nurturing and follow-up activities
   - Webhook notifications for new and updated leads

2. **Sales Process Flow**
   - Opportunity Service → Proposal Service → Contract Service
   - Integration with solar design and financing services
   - Document generation and e-signature workflows

3. **Solar Project Management Flow**
   - Project Creation Service → Design Service → Permitting Service → Installation Service
   - Integration with OpenSolar API for bi-directional data synchronization
   - Automated milestone tracking and notification workflows
   - Permit application and approval management
   - Installation scheduling and resource allocation

4. **Installation Flow**
   - Project Planning Service → Permit Service → Installation Service → Activation Service
   - Integration with scheduling and inventory systems
   - Mobile app integration for field technicians

4. **Support Flow**
   - Monitoring Service → Alert Service → Ticket Service → Resolution Service
   - Integration with communication platforms (email, SMS, chat)
   - Knowledge base and self-service portal integration
   - SLA monitoring and escalation system with:
     - Priority-based response and resolution time thresholds
     - Scheduled job for automatic SLA monitoring every 15 minutes
     - SLA status checking on ticket creation and updates
     - Automatic escalation based on configurable rules
     - Integration with notification system for SLA breach and escalation alerts
   - Unified Notification Service integration with:
     - User notification preferences with multi-channel support
     - Hierarchical control (global, category, and event-specific settings)
     - Notification calls for ticket events (created, updated, comment-added, status-changed, assigned)
     - In-app and email notifications based on user preferences

## Critical Implementation Paths

### Authentication and Authorization

1. **User Authentication**
   - OAuth 2.0/OIDC implementation
   - Multi-factor authentication
   - Session management and token refresh

2. **Permission Management**
   - Role definition and assignment with comprehensive API endpoints
   - Resource-based access control with permission checking
   - Permission assignment to users with validation
   - Role-based user filtering and retrieval
   - User role verification and permission checking
   - Schema validation for role assignments
   - Organization hierarchy-based access control
     - Multi-level organizational structure support
     - Organization units (departments, teams, divisions, branches, regions)
     - Unit membership with role management (member, lead, manager, director)
     - Hierarchical permission inheritance

### Security Architecture

1. **Defense-in-Depth Strategy**
   - Network security (firewalls, WAF, DDoS protection)
   - Application security (input validation, output encoding, CSRF protection)
   - Data security (encryption at rest and in transit)
   - Identity security (strong authentication, least privilege)

2. **OWASP Top 10 Mitigation**
   - Injection prevention
   - Broken authentication protection
   - Sensitive data exposure prevention
   - XML External Entities (XXE) protection
   - Broken access control mitigation
   - Security misconfiguration prevention
   - Cross-Site Scripting (XSS) protection
   - Insecure deserialization prevention
   - Using components with known vulnerabilities prevention
   - Insufficient logging & monitoring prevention

3. **Multi-Tenant Security**
   - Tenant isolation at data layer
   - Row-level security implementation
   - Tenant context management
   - Cross-tenant access controls

### Data Management

1. **Data Modeling**
   - Entity relationship design
   - Schema versioning and migration
   - Data validation and integrity

2. **Data Access Layer**
   - Repository implementations
   - Query optimization with connection pooling and aggregation functions
   - Caching strategies with TTL, invalidation, and bypass options
   - Performance tracking for database operations
   - Transaction management for data consistency
   - Comprehensive error handling and input validation

### Integration Framework

1. **API Integration**
   - Third-party API clients
   - Webhook handlers
   - Rate limiting and retry logic

2. **Event Processing**
   - Event producers and consumers
   - Message serialization and deserialization
   - Dead letter queues and error handling

3. **OpenSolar Integration**
   - Bi-directional data synchronization
   - Design import/export capabilities
   - Proposal and contract integration
   - Project status synchronization

4. **Integration Patterns**
   - API Gateway for centralized access control
   - Adapter pattern for third-party systems
   - Circuit breaker for resilient integration
   - Saga pattern for distributed transactions

### User Interface

1. **Component Library**
   - Design system implementation
   - Accessibility compliance
   - Responsive behavior

2. **State Management**
   - Redux store configuration
   - Selector optimization
   - Asynchronous action handling

3. **Form Management**
   - Form validation
   - Field dependencies
   - Multi-step form workflows