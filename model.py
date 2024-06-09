from pydantic import BaseModel

class Visit(BaseModel):
    id: int
    item: str
    timestamp: str  # 문자열로 변경
