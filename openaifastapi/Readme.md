# **FastAPI Chat Backend Setup**
![CoreGPT](https://d3erng0hrrd7m4.cloudfront.net/logo.png)  

**Build a FastAPI-powered backend for your AI chat application.**  

![FastAPI](https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png)

---

## **Project Title: AI Chat with FastAPI**

### **Description**  
A fully functional backend API built with **FastAPI and Python** that interacts with the **ChatGPT API**. This setup provides a structured approach to handling chat messages, API requests, and responses efficiently.

### **Project Structure**  

```plaintext
backend/
├── routes/
│   ├── __init__.py
│   └── send_messages.py
├── utils/
│   ├── __init__.py
│   └── openai_helpers.py
├── main.py
├── requirements.txt
├── .env
└── config.py
```

---

## **Technologies Used**  

### **Backend:**  
- FastAPI  
- Python  
- OpenAI API  
- Uvicorn  
- dotenv  

---

## **Setup & Installation**  

### **1. Clone the Repository**  

```bash
git clone https://github.com/your-repo/fastapi-chat-backend.git
cd fastapi-chat-backend
```

### **2. Set Up a Virtual Environment**  

Navigate to the backend folder:

```bash
cd backend
```

Create and activate a virtual environment:

- **On Windows:**  
  ```bash
  python -m venv venv
  venv\Scripts\activate
  ```
- **On macOS/Linux:**  
  ```bash
  python3 -m venv venv
  source .\.venv\Scripts\activate

  ```

### **3. Install Dependencies**  

Run the following command:

```bash
pip install -r requirements.txt
```

### **4. Configure Environment Variables**  

Create a `.env` file and add your OpenAI API key:

```plaintext
OPENAI_API_KEY=your_api_key_here
PORT=8000
```

### **5. Start the Backend Server**  

```bash
uvicorn main:app --reload

