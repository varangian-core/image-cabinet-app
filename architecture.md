# Image Cabinet Application Architecture

## Overview

This document outlines the technical architecture and implementation phases for the Image Cabinet application, a hybrid local/web system that provides intelligent image classification and organization using Ollama AI.

## System Architecture

### High-Level Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Web Frontend  │────▶│  Local Backend   │────▶│     Ollama      │
│   (React SPA)   │◀────│  (Python API)    │◀────│  (Vision Model) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                         
         │                       ▼                         
         │              ┌─────────────────┐               
         └─────────────▶│    Firestore    │               
                        │   (Metadata DB)  │               
                        └─────────────────┘               
```

### Component Architecture

#### 1. Frontend (Web SPA)
- **Technology**: React 18+ with TypeScript
- **State Management**: Zustand for global state
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Communication**: Axios for HTTP, Socket.io for WebSocket
- **Build Tool**: Vite

#### 2. Local Backend Service
- **Technology**: Python 3.10+ with FastAPI
- **Process Management**: Uvicorn ASGI server
- **File Operations**: Python pathlib + aiofiles
- **Image Processing**: Pillow for thumbnails
- **Packaging**: PyInstaller for distribution

#### 3. Ollama Integration
- **Model**: llava (vision-language model)
- **API**: HTTP REST at localhost:11434
- **Management**: Subprocess control via Python

#### 4. Database Layer
- **Primary DB**: Google Firestore (NoSQL)
- **Local Cache**: SQLite for offline metadata
- **File Storage**: User's local filesystem

## Data Flow Architecture

### Image Upload Flow
```
1. User drags images to UI
2. Frontend sends to local backend via multipart/form-data
3. Backend stores files in staging directory
4. Backend creates Firestore entries with status: UPLOADING
5. Backend generates thumbnails
6. Backend updates status to PENDING_CLASSIFICATION
```

### Classification Flow
```
1. Backend retrieves pending images
2. Converts images to base64
3. Sends to Ollama API with classification prompt
4. Parses structured response (categories + confidence)
5. Updates Firestore with suggestions
6. Notifies frontend via WebSocket
```

### Organization Flow
```
1. User reviews/modifies classifications
2. User applies naming pattern
3. Backend calculates new filename
4. Backend moves/renames files
5. Updates Firestore metadata
6. Updates UI filing cabinet view
```

## Technical Components

### Frontend Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── ContentArea.tsx
│   ├── upload/
│   │   ├── DropZone.tsx
│   │   └── UploadProgress.tsx
│   ├── gallery/
│   │   ├── ImageGrid.tsx
│   │   ├── ImageCard.tsx
│   │   └── ImagePreview.tsx
│   ├── classification/
│   │   ├── BatchProcessor.tsx
│   │   ├── CategorySelector.tsx
│   │   └── ConfidenceDisplay.tsx
│   ├── settings/
│   │   ├── PathConfig.tsx
│   │   ├── OllamaConsole.tsx
│   │   └── NamingPatternBuilder.tsx
│   └── common/
│       ├── Modal.tsx
│       ├── Button.tsx
│       └── LoadingSpinner.tsx
├── hooks/
│   ├── useWebSocket.ts
│   ├── useFirestore.ts
│   └── useLocalBackend.ts
├── stores/
│   ├── imageStore.ts
│   ├── categoryStore.ts
│   └── settingsStore.ts
├── services/
│   ├── api.ts
│   ├── firestore.ts
│   └── websocket.ts
└── utils/
    ├── namingPattern.ts
    ├── fileHelpers.ts
    └── categoryUtils.ts
```

### Backend Structure
```
backend/
├── api/
│   ├── routes/
│   │   ├── images.py
│   │   ├── categories.py
│   │   ├── settings.py
│   │   └── ollama.py
│   ├── middleware/
│   │   ├── cors.py
│   │   └── error_handler.py
│   └── websocket/
│       └── events.py
├── services/
│   ├── ollama_service.py
│   ├── file_service.py
│   ├── image_processor.py
│   └── firestore_service.py
├── models/
│   ├── image.py
│   ├── category.py
│   └── settings.py
├── utils/
│   ├── file_utils.py
│   ├── image_utils.py
│   └── naming_utils.py
└── main.py
```

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
**Goal**: Basic infrastructure and connectivity

1. **Local Backend Setup**
   - FastAPI server with CORS configuration
   - Basic file system operations
   - Health check endpoints
   - WebSocket server initialization

2. **Frontend Scaffold**
   - React project with TypeScript
   - Routing structure
   - Basic layout components
   - Tailwind CSS configuration

3. **Database Setup**
   - Firestore project initialization
   - Basic data models
   - Authentication setup

**Deliverables**:
- Running local backend executable
- Basic web UI that connects to backend
- Firestore integration

### Phase 2: Core File Operations (Weeks 3-4)
**Goal**: File upload and management

1. **Upload System**
   - Drag-and-drop interface
   - Multipart upload handling
   - Progress tracking
   - Thumbnail generation

2. **Gallery View**
   - Image grid display
   - Pagination/virtual scrolling
   - Basic filtering
   - Image preview modal

3. **File System Integration**
   - Directory configuration UI
   - File browsing API
   - Safe file operations

**Deliverables**:
- Working image upload
- Gallery with thumbnails
- Local storage configuration

### Phase 3: Ollama Integration (Weeks 5-6)
**Goal**: AI-powered classification

1. **Ollama Management**
   - Installation checker
   - Model download interface
   - Server process control
   - Console output streaming

2. **Classification Pipeline**
   - Batch processing queue
   - Ollama API integration
   - Response parsing
   - Error handling

3. **Classification UI**
   - Suggestion display
   - Confidence visualization
   - Manual override controls

**Deliverables**:
- Ollama setup wizard
- Automatic classification
- Review interface

### Phase 4: Organization Features (Weeks 7-8)
**Goal**: Category management and naming

1. **Category System**
   - CRUD operations
   - Category assignment UI
   - Multi-category support
   - Custom suffix management

2. **Naming Pattern Engine**
   - Visual pattern builder
   - Pattern preview
   - Batch renaming
   - Conflict resolution

3. **Filing Cabinets**
   - Virtual folder visualization
   - Category-based filtering
   - Bulk operations

**Deliverables**:
- Full category management
- Flexible naming system
- Organized filing view

### Phase 5: Polish & Optimization (Weeks 9-10)
**Goal**: Production readiness

1. **Performance**
   - Image lazy loading
   - Caching strategy
   - Batch operation optimization
   - WebSocket reliability

2. **User Experience**
   - Loading states
   - Error boundaries
   - Keyboard shortcuts
   - Accessibility

3. **Packaging**
   - PyInstaller configuration
   - Auto-update mechanism
   - Installation wizard
   - Documentation

**Deliverables**:
- Optimized application
- Installer package
- User documentation

## Security Considerations

### Local Backend
- Bind to localhost only (no external access)
- Token-based authentication for API
- File path validation and sandboxing
- Input sanitization

### Frontend
- Content Security Policy
- XSS prevention
- Secure WebSocket connection
- API key management

### Firestore
- Security rules for user isolation
- Field-level access control
- Data validation rules

## Performance Targets

- **Image Upload**: <2s per image (including thumbnail)
- **Classification**: <5s per image (Ollama dependent)
- **Gallery Load**: <1s for 100 images
- **Search/Filter**: <100ms response
- **File Operations**: <500ms per operation

## Monitoring & Logging

### Application Metrics
- Upload success/failure rates
- Classification accuracy
- Performance timings
- Error frequencies

### System Logs
- Structured JSON logging
- Log rotation
- Debug/Info/Error levels
- Ollama subprocess logs

## Development Workflow

### Version Control
- Git with feature branches
- Semantic versioning
- Automated changelog

### Testing Strategy
- Unit tests for utilities
- Integration tests for API
- E2E tests for critical paths
- Manual testing checklist

### CI/CD Pipeline
- GitHub Actions for builds
- Automated testing
- PyInstaller packaging
- Release artifact generation

## Future Architecture Considerations

### Scalability
- Multi-threading for batch operations
- Background job queue
- Incremental synchronization
- Pagination optimization

### Extensibility
- Plugin architecture for classifiers
- Custom metadata extractors
- Export format plugins
- Theme system

### Advanced Features
- Version history for images
- Collaborative features
- Cloud backup option
- Mobile companion app

This architecture provides a solid foundation for building the Image Cabinet application while maintaining flexibility for future enhancements.