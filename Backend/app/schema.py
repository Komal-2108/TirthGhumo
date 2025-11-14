from pydantic import BaseModel, EmailStr , Field , validator
from typing import Optional
from datetime import date , datetime

class TripRequestBase(BaseModel):
    # Basic Info
    full_name: str
    email: EmailStr
    phone: Optional[str]
    adults: Optional[int] = 1
    children: Optional[int] = 0

    # Trip Details
    destination: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    trip_type: Optional[str]

    # Budget & Stay
    per_person_budget: Optional[int]
    total_budget: Optional[int]
    stay_category: Optional[str]
    stay_type: Optional[str]
    room_type: Optional[str]
    meal_plan: Optional[str]
    transport_mode: Optional[str]

    # Activities
    activities: Optional[str]
    custom_activities: Optional[str]

    # Special Requests
    special_requirements: Optional[str]
    custom_addons: Optional[str]
    other_info: Optional[str]

    # Pickup & Drop
    pickup_location: Optional[str]
    drop_location: Optional[str]

    # Agreement
    agreed_terms: bool = False


class TripRequestCreate(TripRequestBase):
    pass


class TripRequestResponse(TripRequestBase):
    id: int

    class Config:
        from_attributes = True

#One Day trek 
class ODTBase(BaseModel):
    full_name: str
    email_address: str
    age: int
    gender: str
    contact_number: str
    whatsapp_number: str
    college_name:str
    pick_up_loc: str
    drop_loc: str
    meal_preference: str
    trip_exp_level: Optional[str] = None
    medical_details: Optional[str] = None
    payment_screenshot: Optional[str] = None
    agree: bool

    @validator(
        "full_name", "email_address", "gender", "contact_number",
        "whatsapp_number", "college_name", "pick_up_loc", "drop_loc",
        "meal_preference"
    )
    def no_empty_or_blank(cls, v):
        if v is None or not v.strip():
            raise ValueError("Field cannot be empty or blank")
        return v


class ODTCreate(ODTBase):
    pass  # same as base for now

class ODTResponse(ODTBase):
    id: int
    submitted_at: datetime

    class Config:
        from_attributes = True

