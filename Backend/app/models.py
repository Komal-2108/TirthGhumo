from sqlalchemy import  Column , Integer , String , Boolean, Text , ForeignKey  , Date , text
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base
from datetime  import date , datetime 

class TripRequest(Base):
    __tablename__ = "trip_requests"

    id = Column(Integer, primary_key=True, index=True)

    # Basic Traveler Info
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False , unique=True)
    phone = Column(String(20))

    adults = Column(Integer, default=1)
    children = Column(Integer, default=0)

    # Travel Details
    destination = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date)
    trip_type = Column(String(30))

    # Budget & Stay Preferences
    per_person_budget = Column(Integer)
    total_budget = Column(Integer)
    stay_category = Column(String(20))
    stay_type = Column(String(20))
    room_type = Column(String(30))
    meal_plan = Column(String(50))
    transport_mode = Column(String(30))

    # Activities & Experience
    activities = Column(Text)
    custom_activities = Column(Text)

    # Special Requests
    special_requirements = Column(Text)
    custom_addons = Column(Text)
    other_info = Column(Text)

    # Pickup & Drop
    pickup_location = Column(Text)
    drop_location = Column(Text)

    # Agreement
    agreed_terms = Column(Boolean, default=False)

    # Timestamp
    submitted_at = Column(TIMESTAMP(timezone=True) , nullable= False ,server_default = text('now()') ) 

class ODT(Base):
    __tablename__ = "odt_bookings"

    id = Column(Integer , primary_key= True , index=  True )
    full_name = Column(String(100), nullable=False )
    email_address = Column(String(100), nullable=False )
    age = Column(Integer, nullable=False)
    gender = Column(String(20), nullable=False)
    contact_number = Column(String(20), nullable=False)
    whatsapp_number = Column(String(20), nullable=False)
    college_name = Column(String(200))
    pick_up_loc = Column(String(50), nullable=False)
    drop_loc = Column(String(50), nullable=False)
    meal_preference = Column(String(30), nullable=False)
    trip_exp_level = Column(String(40))
    medical_details = Column(String(100))
    payment_screenshot = Column(String(255), nullable=False)
    agree = Column(Boolean, default=False)
    submitted_at = Column(TIMESTAMP(timezone=True) , nullable= False ,server_default = text('now()') ) 