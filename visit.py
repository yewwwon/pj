from fastapi import APIRouter, Path
from model import Visit
from datetime import datetime

visit_router = APIRouter()

visit_list = []
visit_counter = 0

@visit_router.post("/visit")
async def add_visit(visit: Visit) -> dict:
    global visit_counter
    visit.id = visit_counter = visit_counter + 1
    visit.timestamp = datetime.now().isoformat()  # 현재 시간을 ISO 형식으로 저장
    visit_list.append(visit)
    return {
        "msg": "visit added successfully"
    }

@visit_router.get("/visit")
async def retrieve_visits() -> dict:
    return {
        "visits": visit_list
    }

@visit_router.get("/visit/{visit_id}")
async def get_single_visit(visit_id: int = Path(..., title="the ID of the visit to retrieve")) -> dict:
    for visit in visit_list:
        if visit.id == visit_id:
            return {"visit": visit}
    return {"msg": "visit with supplied ID doesn't exist"}

@visit_router.delete("/visit/{visit_id}")
async def delete_visit(visit_id: int = Path(..., title="the ID of the visit to delete")) -> dict:
    for index, visit in enumerate(visit_list):
        if visit.id == visit_id:
            del visit_list[index]
            return {"msg": f"Visit with ID {visit_id} deleted successfully"}
    return {"msg": "Visit with supplied ID doesn't exist"}
