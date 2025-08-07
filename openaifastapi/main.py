from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.send_messages import router as send_messages_router
from routes.gen_image import router as gen_image_router
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers แยกกัน
app.include_router(send_messages_router)
app.include_router(gen_image_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
