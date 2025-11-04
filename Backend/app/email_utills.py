from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.config import settings 
conf = ConnectionConfig(
    MAIL_USERNAME= settings.mail_username,
    MAIL_PASSWORD=settings.mail_password,
    MAIL_FROM=settings.mail_from,
    MAIL_PORT=settings.mail_port,
    MAIL_SERVER=settings.mail_server,
    MAIL_STARTTLS=settings.mail_starttls,
    MAIL_SSL_TLS=settings.mail_ssl_tls,
    USE_CREDENTIALS=settings.use_credentials,
)

async def send_booking_email(data ,  image_path: str | None = None):
    message = MessageSchema(
        subject="New Trekking Package Booking",
        recipients=["tirthghumo@gmail.com"],
        body=f"""
        Full Name: {data.full_name}
    Email Address: {data.email_address}
    Age: {data.age}
    Gender: {data.gender}
    Contact Number: {data.contact_number}
    Whatsapp Number: {data.whatsapp_number}
    College Name: {data.college_name}
    Pick-up Location: {data.pick_up_loc}
    Drop Location: {data.drop_loc}
    Meal Preference: {data.meal_preference}
    Experience Level: {data.trip_exp_level}
    Medical Details: {data.medical_details}
    Agree to Terms: {data.agree}
    """,
       attachments = [image_path],
        subtype="plain" 
    )

    fm = FastMail(conf)
    await fm.send_message(message)