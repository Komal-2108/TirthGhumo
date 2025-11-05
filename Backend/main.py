from fastapi import FastAPI ,  HTTPException , Response , status , Depends , APIRouter , Form , File , UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app import models , schema  
from sqlalchemy.orm import Session
from app.database import engine , get_db
from app.config import settings  
from app.email_utills import send_booking_email
import shutil, os

models.Base.metadata.create_all(bind=engine) 


origins = ["*"]
app = FastAPI()


UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# @app.post("/trip_request" ,status_code=status.HTTP_201_CREATED , response_model= schema.TripRequestResponse)
# def trip_detail(details : schema.TripRequestBase , db:Session = Depends(get_db)):
#     details = models.TripRequest(**details.dict())

#     db.add(details)
#     db.commit() 
#     db.refresh(details)

#     return details 

@app.post("/odt_booking" , status_code = status.HTTP_201_CREATED)
async def odt_booking(full_name: str = Form(...),
    email_address: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...),
    contact_number: str = Form(...),
    whatsapp_number: str = Form(...),
    college_name: str = Form(None),
    pick_up_loc: str = Form(...),
    drop_loc: str = Form(...),
    meal_preference: str = Form(...),
    trip_exp_level: str = Form(None),
    medical_details: str = Form(None),
    agree: bool = Form(...),
    payment_screenshot: UploadFile = File(None),  db:Session = Depends(get_db)):

    file_location = None

    if payment_screenshot:
        file_name = f"{email_address}_payment_{payment_screenshot.filename}"
        file_location = os.path.join(UPLOAD_DIR, file_name)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(payment_screenshot.file, buffer)
    
    details = models.ODT(
        full_name=full_name,
        email_address=email_address,
        age=age,
        gender=gender,
        contact_number=contact_number,
        whatsapp_number=whatsapp_number , 
        college_name=college_name,
        pick_up_loc=pick_up_loc,
        drop_loc=drop_loc,
        meal_preference=meal_preference,
        trip_exp_level=trip_exp_level,
        medical_details=medical_details,
        agree=agree,
       payment_screenshot=file_location
    ) 
   
   
  
    db.add(details) 
    db.commit() 
    db.refresh(details)
    await send_booking_email(details , file_location)

    return {"message" : "Payment Successful"}



@app.get("/")
async def root():
    return {"message" : "Hello Tirthghumo"}