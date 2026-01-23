# What's Cooking - AI Agent Guidelines

## Project Overview
What's Cooking is a full-stack app for tracking meals you've cooked. Django REST backend (`backend/`) with React TypeScript frontend (`frontend/`). Users can log meals linked to recipes, rate them, and add comments.

## Architecture & Data Flow

### Backend (Django REST Framework)
- **Core Models** ([backend/api/models.py](backend/api/models.py)): 
  - `Recipe`: Base recipe data (name, url_source, source, ratings_sum)
  - `Meal`: Cooked meal record tied to a Recipe (includes rating, date_cooked)
  - `Comment`: OneToOne to Meal, Foreign Key to Recipe (tied to specific meal instances)
- **ViewSets** ([backend/api/views.py](backend/api/views.py)): Custom ViewSets handle CRUD for each model with manual serialization
- **Authentication**: Knox token-based auth. Login returns token stored in localStorage by frontend. Endpoints use `IsAuthenticatedOrReadOnly` permission.
- **CORS**: Configured for `http://localhost:5173` only ([backend/controller/settings.py](backend/controller/settings.py))

### Frontend (React + TypeScript + Vite)
- **API Client** ([frontend/src/api/apiClient.ts](frontend/src/api/apiClient.ts)): Fetch-based HTTP client with TypeScript interfaces (Meal, Recipe, Comment)
- **Auth Context** ([frontend/src/components/loginManager/LoginContext.tsx](frontend/src/components/loginManager/LoginContext.tsx)): Provides token and username globally
- **Pages**: Home (meal picker), Admin (meal/recipe management)
- **Styling**: SCSS modules per component (e.g., [Frontend/src/pages/home/Home.scss](Frontend/src/pages/home/Home.scss))

## Critical Workflows

### Backend Setup & Commands
```bash
# Virtual environment (macOS)
cd backend
python -m venv myenv
source myenv/bin/activate

# Dependencies & DB
pip install -r requirements.txt
python manage.py makemigrations && python manage.py migrate

# Run & Test
python manage.py runserver          # Runs on http://127.0.0.1:8000/
pytest api/tests/ -q --disable-warnings
```

### Frontend Setup & Commands
```bash
cd frontend
npm install
npm run dev           # Runs on http://localhost:5173/
npm run lint          # ESLint check
npm run lint-fix      # Auto-fix linting issues
npm run test          # Jest tests
```

## Key Patterns & Conventions

- **Single-User App**: This is designed for one user only. Models (Recipe, Meal, Comment) intentionally have no user FK; all data is global/shared.
- **Manual ViewSet Implementation**: Avoid ModelViewSet; implement `list()`, `create()`, `partial_update()` manually with explicit error handling
- **Read-Only Relations**: Serializers use `SlugRelatedField(read_only=True)` for nested objects (e.g., Recipe.comments, Meal.comment)
- **Token Auth**: Frontend retrieves token from login endpoint, stores in localStorage, includes `Authorization: Token <token>` header on authenticated requests
- **401 Handling**: Frontend redirects to "/" and clears token on 401 response ([frontend/src/api/apiClient.ts](frontend/src/api/apiClient.ts))
- **Frontend Type Safety**: Use strict TypeScript types for API responses. Define request/response types explicitly (e.g., `MealRequest`, `Recipe`, `CommentRequest`). Avoid `any` types; leverage discriminated unions for form states like `FormStatus`

## Dependencies & Integration Points

| Component | Key Libraries |
|-----------|---------------|
| Backend | Django 5.2.7, DRF 3.16, Knox 5.0 auth, django-cors-headers |
| Frontend | React 19.2, React Router 7.9, react-hook-form, react-select, SCSS |
| Testing | Backend: pytest 8.4; Frontend: Jest 30.2, @testing-library/react 16.3 |

## Common Tasks

**Adding a new model**: Update models.py → create migration → add serializer → add ViewSet with list/create/partial_update → register in router
**API endpoint changes**: Frontend types in apiClient.ts must match backend serializer fields
**Frontend component testing**: Use Jest + @testing-library/react (see [frontend/src/pages/admin/Admin.test.tsx](frontend/src/pages/admin/Admin.test.tsx) as reference)
