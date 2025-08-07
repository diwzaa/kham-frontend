from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from utils.openai_imagegen_helper import image_helper
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# สร้าง schema สำหรับข้อความ prompt
class ImagePrompt(BaseModel):
    userInput: str

@router.post("/gen-image")
async def send_image(prompt_data: ImagePrompt):
    logger.debug(f"/gen-image - Received prompt: {prompt_data.userInput}")
    try:
        result = await image_helper(prompt=prompt_data.userInput)
        logger.debug(f"/gen-image - Returning result: {result}")
        return JSONResponse(content=result)
    except Exception as e:
        logger.error(f"/gen-image - Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
