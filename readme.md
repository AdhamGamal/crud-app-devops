# CRUD App with Real-Time Updates

This project is a **full-stack CRUD (Create, Read, Update, Delete) web application** built with **React.js, Node.js (Express), MongoDB, and Socket.io**. It follows best practices for **modern web development**, making it suitable for local development and future deployment in **Kubernetes** and CI/CD pipelines using **GitHub Actions** and **Docker**.

---

## **🚀 Features**

✅ **CRUD Operations**: Add, read, update, and delete items.
✅ **Real-Time Updates**: Changes appear instantly using Socket.io.
✅ **Search Functionality**: Users can filter records dynamically.
✅ **Popup Modals**: Clean UI for adding and updating items.
✅ **RESTful API**: A structured backend to interact with the database.
✅ **Docker Ready**: Designed for local containerized development.
✅ **Secure Configurations**: Uses environment variables instead of `.env`.

---

## **📂 Project Structure**

```
crud-app/
│── backend/                  # Server-side code
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express API routes
│   ├── server.js             # Main Express server
│── frontend/                 # Client-side React app
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page-level components
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # Entry point for React
│── docker-compose.yml        # Docker Compose configuration for local setup
│── Dockerfile                # Docker configuration
│── README.md                 # Project documentation
```

---

## **🛠️ Tech Stack**

### **Frontend:**
- **React.js** (Component-based UI)
- **Axios** (API requests)
- **Tailwind CSS** (Styling)
- **Socket.io-client** (Real-time updates)

### **Backend:**
- **Node.js + Express.js** (REST API)
- **MongoDB (Mongoose)** (Database)
- **Socket.io** (WebSockets for real-time updates)

### **Database:**
- **MongoDB (Local containerized instance using Docker)**

---

## **🔧 Setup Instructions**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/AdhamGamal/crud-app-devops.git
cd crud-app-devops
```

### **2️⃣ MongoDB Setup**
```sh
docker run --name mongo-container -d -p 27017:27017 mongo
```
This command will start a **MongoDB container** on port `27017`.

### **3️⃣ Backend Setup (Manual Without Docker)**
```sh
cd backend
npm install
npm start
```
- Ensure MongoDB is running locally or via Docker.

### **4️⃣ Frontend Setup (Manual Without Docker)**
```sh
cd frontend
npm install
npm start
```
- Open `http://localhost:3000` in your browser.

---

## **💡 Best Practices Followed**

- **Separation of Concerns:** Organized code structure.
- **Environment Variables:** No hardcoded secrets.
- **Real-Time Updates:** Uses WebSockets efficiently.
- **Containerized Database:** Uses MongoDB in a local Docker container.

---

## **📌 Next Steps**

🔹 Containerization of backend and frontend using Docker 🐳
🔹 Set up a CI/CD pipeline with GitHub Actions 🚀
🔹 Deploy the application on Kubernetes (K8s) ☸️

🔹 Implement authentication (JWT or OAuth) 🔐  
🔹 Add unit and integration tests 🧪  

---

🚀 **Happy Coding!** 😃

---

## **📦 Deployment Roadmap**

### **1️⃣ Containerization**
- Create Dockerfiles for both frontend and backend.
- Build and push Docker images to a container registry (Docker Hub/GitHub Container Registry).

### **3️⃣ CI/CD with GitHub Actions**
- Automate builds and tests.
- Deploy new versions to Kubernetes automatically on push to `main` branch.

### **2️⃣ Kubernetes Deployment**
- Define Kubernetes manifests (Deployment, Service, and Ingress).
- Use ConfigMaps and Secrets for managing environment variables.