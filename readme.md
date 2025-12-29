# 📋 Compliance Report Automation System

A full-stack MERN application designed to streamline and automate compliance reporting processes for organizations. Track, manage, and monitor compliance reports across multiple regulatory frameworks with an intuitive dashboard interface.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Overview

The Compliance Report Automation System enables organizations to efficiently manage their compliance obligations across various regulatory frameworks including ISO, GDPR, SOC2, HIPAA, and PCI-DSS. The system provides real-time tracking, status monitoring, and comprehensive reporting capabilities.

### Key Benefits

- **Centralized Management**: Single dashboard for all compliance reports
- **Real-Time Monitoring**: Live statistics and status tracking
- **Multi-Framework Support**: Handle multiple compliance types simultaneously
- **Automated Workflows**: Streamline report creation and tracking
- **Risk Assessment**: Severity-based categorization of compliance issues
- **Audit Trail**: Complete history of compliance activities

---

## ✨ Features

### 📊 Dashboard
- Real-time compliance statistics (Total, Compliant, Non-Compliant, In Progress, Under Review)
- Color-coded status indicators for quick visual assessment
- Interactive report cards with severity badges
- Inline report creation without page navigation

### 📝 Report Management
- **Create Reports**: Comprehensive form with all necessary fields
- **Edit Reports**: Update existing reports with ease
- **Delete Reports**: Remove outdated or duplicate reports
- **View Details**: Full report information including findings and recommendations

### 🏷️ Categorization
- **Compliance Types**: ISO, GDPR, SOC2, HIPAA, PCI-DSS, Other
- **Status Tracking**: Compliant, Non-Compliant, In Progress, Under Review
- **Severity Levels**: Low, Medium, High, Critical
- **Department Assignment**: Organize by organizational units

### 🔍 Data Tracking
- Detailed findings documentation
- Actionable recommendations
- Reporter information
- Due date management
- Automatic timestamp tracking

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router v6** - Client-side routing
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MongoDB 7.0** - NoSQL document database

### DevOps
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and web server

---

## 📁 Project Structure

```
compliance-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── models/
│   │   │   └── Report.js          # Report schema
│   │   ├── routes/
│   │   │   └── reports.js         # API routes
│   │   └── server.js              # Express server
│   ├── package.json
│   ├── Dockerfile
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx      # Main dashboard
│   │   │   ├── ReportCard.jsx     # Report display card
│   │   │   ├── ReportForm.jsx     # Report creation form
│   │   │   └── ReportCreate.jsx   # Standalone create page
│   │   ├── App.jsx                # Root component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v7.0 or higher)
- Docker & Docker Compose (for containerized deployment)
- npm or yarn package manager

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd compliance-app
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/compliance
PORT=5000" > .env

# Start MongoDB (if not using Docker)
mongod

# Run backend server
npm run dev
```

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Run frontend development server
npm run dev
```

#### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

---

## 🐳 Docker Deployment

### Production Deployment with Docker Compose

#### 1. Build and Start All Services
```bash
docker-compose up -d --build
```

This command will:
- Build frontend and backend Docker images
- Pull MongoDB 7.0 image
- Create a dedicated Docker network
- Start all containers with automatic restart policies

#### 2. View Container Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb
```

#### 3. Stop All Services
```bash
docker-compose down
```

#### 4. Stop and Remove All Data
```bash
docker-compose down -v
```

### Individual Container Management

```bash
# Backend only
docker build -t compliance-backend ./backend
docker run -p 5000:5000 compliance-backend

# Frontend only
docker build -t compliance-frontend ./frontend
docker run -p 80:80 compliance-frontend

# MongoDB only
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

### Access Production Application
- **Application**: http://localhost
- **API Endpoint**: http://localhost/api
- **Health Check**: http://localhost/health

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Reports
```http
GET /reports
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Q4 Security Audit",
    "department": "IT Security",
    "complianceType": "SOC2",
    "status": "In Progress",
    "findings": "Minor vulnerabilities detected...",
    "recommendations": "Implement multi-factor authentication...",
    "reportedBy": "John Doe",
    "severity": "Medium",
    "dueDate": "2025-12-31T00:00:00.000Z",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

#### Get Single Report
```http
GET /reports/:id
```

#### Create Report
```http
POST /reports
Content-Type: application/json

{
  "title": "GDPR Compliance Review",
  "department": "Legal",
  "complianceType": "GDPR",
  "status": "Under Review",
  "findings": "Data processing procedures need updates",
  "recommendations": "Update privacy policy",
  "reportedBy": "Jane Smith",
  "severity": "High",
  "dueDate": "2025-02-28"
}
```

#### Update Report
```http
PUT /reports/:id
Content-Type: application/json

{
  "status": "Compliant",
  "findings": "All issues resolved"
}
```

#### Delete Report
```http
DELETE /reports/:id
```

#### Get Statistics
```http
GET /reports/stats/summary
```

**Response:**
```json
{
  "total": 45,
  "compliant": 30,
  "nonCompliant": 5,
  "inProgress": 7,
  "underReview": 3
}
```

---

## 🎨 UI/UX Features

### Color-Coded Status System

| Status | Color | Meaning |
|--------|-------|---------|
| Compliant | 🟢 Green | All requirements met |
| Non-Compliant | 🔴 Red | Critical issues found |
| In Progress | 🟡 Amber | Being actively worked on |
| Under Review | 🔵 Blue | Awaiting assessment |

### Severity Indicators

| Severity | Color | Priority |
|----------|-------|----------|
| Low | Gray | Minimal risk |
| Medium | Yellow | Moderate attention needed |
| High | Orange | Significant concern |
| Critical | Red | Immediate action required |

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
MONGODB_URI=mongodb://mongodb:27017/compliance
PORT=5000
NODE_ENV=production
```

#### Frontend (.env)
```bash
# Development
VITE_API_URL=http://localhost:5000/api

# Production (.env.production)
VITE_API_URL=/api
```

---

## 📊 Database Schema

### Report Model

```javascript
{
  title: String (required),
  department: String (required),
  complianceType: Enum ['ISO', 'GDPR', 'SOC2', 'HIPAA', 'PCI-DSS', 'Other'],
  status: Enum ['Compliant', 'Non-Compliant', 'In Progress', 'Under Review'],
  findings: String (required),
  recommendations: String,
  reportedBy: String (required),
  severity: Enum ['Low', 'Medium', 'High', 'Critical'],
  dueDate: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### API Testing with cURL

```bash
# Health Check
curl http://localhost:5000/health

# Get All Reports
curl http://localhost:5000/api/reports

# Create Report
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Report",
    "department": "IT",
    "complianceType": "ISO",
    "status": "Under Review",
    "findings": "Test findings",
    "reportedBy": "Test User",
    "severity": "Low"
  }'
```

---

## 🔒 Security Considerations

- Input validation on all forms
- MongoDB injection prevention via Mongoose
- CORS configured for specific origins
- Environment variables for sensitive data
- No credentials stored in code
- Regular dependency updates recommended

---

## 🚧 Roadmap

- [ ] User authentication and authorization
- [ ] Role-based access control (RBAC)
- [ ] Email notifications for due dates
- [ ] PDF export functionality
- [ ] Advanced filtering and search
- [ ] Report templates
- [ ] File attachment support
- [ ] Audit log tracking
- [ ] Dashboard analytics and charts
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Gaurav SR** - *Founder*

---

## 🙏 Acknowledgments

- MongoDB for the robust database solution
- React team for the excellent frontend framework
- Express.js community for the web framework
- Tailwind CSS for the utility-first styling approach
- Docker for containerization technology

---

## 📞 Support

For issues, questions, or contributions:

- **Issues**: [GitHub Issues](https://github.com/yourusername/compliance-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/compliance-app/discussions)
- **Email**: support@example.com

---

## 📸 Screenshots

### Dashboard View
> Coming soon - Add screenshot of main dashboard

### Create Report Form
> Coming soon - Add screenshot of report creation

### Report Details
> Coming soon - Add screenshot of individual report view

---

Made with ❤️ by gsr