# Enterprise Grade Solar CRM - Technical Context

## Technologies Used

### Frontend Technologies

| Technology | Purpose | Version |
|------------|---------|--------|
| Next.js | React framework with SSR capabilities | 14.x |
| React | UI component library | 18.x |
| TypeScript | Type-safe JavaScript | 5.x |
| Mantine UI | Component library | 7.x |
| Redux Toolkit | State management | 2.x |
| React Query | Data fetching and caching | 5.x |
| Mantine Form | Form management | 7.x |
| Zod | Form validation | 3.x |
| Chart.js | Data visualization | 4.x |
| Leaflet | Interactive maps | 1.x |
| Jest | Unit testing | 29.x |
| Cypress | End-to-end testing | 13.x |
| ESLint | Code linting | 8.x |
| Prettier | Code formatting | 3.x |

### Backend Technologies

| Technology | Purpose | Version |
|------------|---------|--------|
| Node.js | JavaScript runtime | 20.x LTS |
| Fastify | Web framework for microservices | 4.x |
| Express | Legacy web framework (being phased out) | 4.x |
| FastAPI | Python API framework | 0.104.x |
| MySQL | Relational database | 8.x |
| MongoDB | Document database | 7.x |
| Redis | Caching and pub/sub | 7.x |
| InfluxDB | Time-series database | 2.x |
| RabbitMQ | Message broker | 3.12.x |
| Prisma | ORM for Node.js | 5.x |
| SQLAlchemy | ORM for Python | 2.x |
| Passport | Authentication middleware | 0.6.x |
| JWT | Token-based authentication | - |
| Winston | Logging | 3.x |
| Joi | Validation | 17.x |
| Jest | Unit testing | 29.x |
| Supertest | API testing | 6.x |
| Pytest | Python testing | 7.x |

### DevOps & Infrastructure

| Technology | Purpose | Version |
|------------|---------|--------|
| Docker | Containerization | 24.x |
| Kubernetes | Container orchestration | 1.28.x |
| Terraform | Infrastructure as code | 1.6.x |
| GitHub Actions | CI/CD | - |
| AWS | Cloud provider | - |
| AWS S3 | Document storage | - |
| Nginx | Web server/reverse proxy | 1.25.x |
| Prometheus | Monitoring | 2.48.x |
| Grafana | Visualization | 10.x |
| ELK Stack | Logging and analysis | 8.x |
| Vault | Secrets management | 1.15.x |

### Security Tools

| Technology | Purpose | Version |
|------------|---------|--------|
| OWASP ZAP | Dynamic Application Security Testing | Latest |
| SonarQube | Static Code Analysis | 10.x |
| Snyk | Dependency Vulnerability Scanning | - |
| Trivy | Container Vulnerability Scanner | Latest |
| Falco | Runtime Security Monitoring | Latest |
| Keycloak | Identity and Access Management | 22.x |
| Cert-Manager | Certificate Management | Latest |
| Open Policy Agent | Policy Enforcement | Latest |
| Security Headers | Comprehensive implementation of security headers and CSP | - |

### Integration Technologies

| Technology | Purpose | Version |
|------------|---------|--------|
| Kong | API Gateway | 3.x |
| Kafka | Event Streaming | 3.5.x |
| Camel | Integration Framework | 4.x |
| Swagger/OpenAPI | API Documentation | 3.0 |
| GraphQL | API Query Language | - |
| Webhook Manager | Webhook Processing | Custom |
| OAuth 2.0 | API Authentication | - |
| OpenID Connect | Identity Layer | - |
| OpenSolar API | Solar Project Management Integration | v1 |
| Scheduler Service | Configurable Synchronization Jobs | Custom |
| Sync Controller | Bidirectional API Synchronization | Custom |

## Development Setup

### Local Development Environment

#### Prerequisites
- Node.js 20.x LTS
- Python 3.11+
- Docker Desktop
- Git
- VS Code or preferred IDE
- MySQL (local or containerized)
- MongoDB (local or containerized)

#### Repository Structure

```
/
├── frontend/               # Next.js application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-specific components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Next.js pages
│   │   ├── services/      # API client services
│   │   ├── store/         # Redux store configuration
│   │   ├── styles/        # Global styles
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── tests/             # Frontend tests
│   ├── .eslintrc.js       # ESLint configuration
│   ├── .prettierrc        # Prettier configuration
│   ├── jest.config.js     # Jest configuration
│   ├── next.config.js     # Next.js configuration
│   ├── package.json       # Dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration
│
├── backend/                # Backend services
│   ├── api-gateway/       # API Gateway service
│   ├── auth-service/      # Authentication service
│   ├── lead-service/      # Lead management service
│   ├── opportunity-service/ # Opportunity management service
│   ├── project-service/   # Project management service
│   ├── customer-service/  # Customer management service
│   ├── support-service/   # Support management service
│   ├── notification-service/ # Notification service
│   ├── integration-service/ # Third-party integration service
│   ├── analytics-service/ # Analytics and reporting service
│   └── shared/            # Shared libraries and utilities
│
├── infrastructure/         # Infrastructure as code
│   ├── terraform/         # Terraform configurations
│   ├── kubernetes/        # Kubernetes manifests
│   └── docker/            # Docker configurations
│
├── scripts/                # Development and deployment scripts
├── docs/                   # Documentation
└── .github/               # GitHub workflows and templates
```

#### Development Workflow

1. **Setup**
   - Clone repository
   - Install dependencies for frontend and backend services
   - Set up local environment variables
   - Start required services with Docker Compose

2. **Development**
   - Frontend development server: `npm run dev` in frontend directory
   - Backend services: Run individual services or use Docker Compose
   - Database migrations: Run through ORM tools (Prisma/SQLAlchemy)

3. **Testing**
   - Unit tests: `npm test` or `pytest` for respective services
   - Integration tests: Run against containerized dependencies
   - End-to-end tests: Cypress for frontend flows

4. **Code Quality**
   - Linting: ESLint for JavaScript/TypeScript, Flake8 for Python
   - Formatting: Prettier for JavaScript/TypeScript, Black for Python
   - Pre-commit hooks for automated checks

5. **Deployment**
   - CI/CD pipeline through GitHub Actions
   - Staging and production environments
   - Blue/green deployment strategy

## Technical Constraints

### Performance Requirements

- Page load time: < 2 seconds for initial load, < 500ms for subsequent interactions
- API response time: < 200ms for simple queries, < 1s for complex operations
- Support for concurrent users: Up to 1000 simultaneous users
- Database query performance: < 100ms for 95% of queries
- Mobile responsiveness: Optimized for devices down to 320px width

### Security Requirements

- HTTPS for all communications
- Authentication: OAuth 2.0/OIDC compliant
- Authorization: Role-based access control with fine-grained permissions
  - Organization hierarchy-based access control
  - Multi-level organizational structure support
  - Organization units with role-based membership
  - Hierarchical permission inheritance
- Data protection: Encryption at rest and in transit
- Input validation: Server-side validation for all inputs with Zod schemas
- Output encoding: Prevention of XSS and injection attacks
- API security: Rate limiting, CORS configuration, and API keys
- Audit logging: Comprehensive logging of security events
- Compliance: GDPR, CCPA, and industry-specific regulations
- Multi-tenant data isolation with row-level security
- Security scanning in CI/CD pipeline (SAST, DAST, SCA)
- Container security and image scanning
- Secrets management with HashiCorp Vault
- Regular security assessments and penetration testing

### Scalability Requirements

- Horizontal scaling of services based on load
- Database sharding for high-volume data
- Caching strategy for frequently accessed data
- Asynchronous processing for long-running tasks
- CDN integration for static assets
- Load balancing across multiple regions

### Reliability Requirements

- Service availability: 99.9% uptime
- Data durability: No data loss with proper backup strategies
- Fault tolerance: Graceful degradation during partial outages
- Disaster recovery: RPO < 1 hour, RTO < 4 hours
- Monitoring and alerting for system health

## Dependencies

### External Services

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| OpenSolar | System sizing and design | Bi-directional API |
| Weather Data Services | Solar production forecasting | API |
| Mapping Services | Property visualization | API |
| Payment Processors | Customer billing | API |
| E-Signature Services | Contract signing | API |
| Email Service | Customer communications | SMTP/API |
| SMS Gateway | Mobile notifications | API |
| Solar Monitoring Systems | Performance tracking | Webhook/API |
| Utility Company APIs | Interconnection and billing | API |
| Permitting Platforms | Permit application and tracking | API |
| Inventory Management | Equipment tracking | API |
| Field Service Management | Technician scheduling | API |
| Calendar Services | Appointment scheduling | API |

### Third-Party Libraries

Critical dependencies are listed in the Technologies section. Additional libraries will be evaluated based on:

- Active maintenance and community support
- Security track record
- Performance impact
- Licensing compatibility
- Documentation quality

## Tool Usage Patterns

### Development Tools

- **VS Code**: Primary IDE with extensions for React, TypeScript, Python
- **Postman/Insomnia**: API testing and documentation
- **Docker**: Local environment setup and service isolation
- **Git Flow**: Branching strategy for feature development
- **npm/pip**: Package management

### Monitoring and Observability

- **Prometheus**: Metrics collection
- **Grafana**: Metrics visualization and dashboards
- **ELK Stack**: Log aggregation and analysis
- **Jaeger**: Distributed tracing
- **Sentry**: Error tracking and reporting

### Deployment and Operations

- **GitHub Actions**: CI/CD pipeline
- **Terraform**: Infrastructure provisioning
- **Kubernetes**: Container orchestration
- **Helm**: Kubernetes package management
- **ArgoCD**: GitOps deployment