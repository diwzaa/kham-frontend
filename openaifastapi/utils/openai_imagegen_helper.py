import logging
from fastapi import HTTPException
from typing import Dict
from config import client  # OpenAI client
from langchain.prompts import PromptTemplate

logger = logging.getLogger(__name__)


# Template สำหรับดึงข้อมูลมาเสริม
template = """
ภาพของผ้าฝ้ายทอย้อมครามแบบดั้งเดิมที่แสดงเป็นผืนแบนราบ ผ้ามีลักษณะเนียนแน่น สองมิติ พื้นเป็นสีน้ำเงินครามเข้ม และมีลวดลายทอสีครามอ่อนกว่านิดหน่อย ไม่มีเงา ไม่มีแสง ไม่มีรอยพับ แสดงเพียงพื้นผ้าเรียบๆ เท่านั้น ห้ามสร้างลวดลายที่ซับซ้อนหรือเว่อวัง ให้แสดงเฉพาะลวดลายที่ระบบกำหนดเท่านั้น ภาพนี้ใช้สำหรับนำไปใส่ลวดลายผ้าครามตามที่เลือก และลายที่อยากให้ทำคือ {user_prompt} ทำลายเรียบๆ
"""

rag_prompt = PromptTemplate.from_template(template)

async def image_helper(prompt: str, model: str = "dall-e-3", size: str = "1024x1024"):
    logger.debug(f"image_helper - Received raw prompt: {prompt}")
    
    try:
        # 2. Build enhanced prompt with context (RAG)
        final_prompt = rag_prompt.format(user_prompt=prompt)
        logger.debug(f"image_helper - Final prompt: {final_prompt}")

        # 3. Call DALL·E
        response = client.images.generate(
            model=model,
            prompt=final_prompt,
            size=size,
            quality="standard",
            n=1,
        )

        image_url = response.data[0].url
        logger.debug(f"image_helper - Image URL: {image_url}")
        return {
            "image_url": image_url,
            "prompt": final_prompt
        }

    except Exception as e:
        logger.error(f"image_helper - Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
