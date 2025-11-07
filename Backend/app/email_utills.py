from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.config import settings 
import requests
import resend 
import base64
import os
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

# async def send_booking_email(data ,  image_path: str | None = None):
#     message = MessageSchema(
#         subject="New Trekking Package Booking",
#         recipients=["tirthghumo@gmail.com"],
#         body=f"""
#         Full Name: {data.full_name}
#     Email Address: {data.email_address}
#     Age: {data.age}
#     Gender: {data.gender}
#     Contact Number: {data.contact_number}
#     Whatsapp Number: {data.whatsapp_number}
#     College Name: {data.college_name}
#     Pick-up Location: {data.pick_up_loc}
#     Drop Location: {data.drop_loc}
#     Meal Preference: {data.meal_preference}
#     Experience Level: {data.trip_exp_level}
#     Medical Details: {data.medical_details}
#     Agree to Terms: {data.agree}
#     """,
#        attachments = [image_path],
#         subtype="plain" 
#     )

#     fm = FastMail(conf)
#     await fm.send_message(message)

#CORRECT WLA UPR H 

resend.api_key = settings.resend_api_key

async def send_booking_email(data, image_path: str | None = None):
    """Send booking details via Resend API with optional image attachment."""

    email_body = f"""
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
    """

    attachments = []

    # ✅ Attach local file as Base64 (no 'path' key)
    if image_path and os.path.exists(image_path):
        with open(image_path, "rb") as f:
            file_data = base64.b64encode(f.read()).decode("utf-8")
            file_name = os.path.basename(image_path)
            attachments.append({
                "content": file_data,
                "filename": file_name,
                "type": "image/jpeg" if image_path.lower().endswith((".jpg", ".jpeg")) else "image/png"
            })

    email = {
        "from":  "Tirth Ghumo <onboarding@resend.dev>",
        "to": ["tirthghumo@gmail.com"],
        "subject": "New Trekking Package Booking",
        "text": email_body.strip(),
    }

    # Only add attachments if present
    if attachments:
        email["attachments"] = attachments

    try:
        resend.Emails.send(email)
        return {"status": "Email sent successfully"}
    except Exception as e:
        raise Exception(f"Email sending failed: {str(e)}")

# async def send_booking_email(data, image_path: str | None = None):
#     print("RESEND_API_KEY:", settings.RESEND_API_KEY)
#     payload = {
#         "from":"TirthGhumo <onboarding@resend.dev>",
#         "to": ["tirthghumo@gmail.com"],
#         "subject": "New Trekking Package Booking",
#         "html": f"""
#         <p><strong>Full Name:</strong> {data.full_name}</p>
#         <p><strong>Email Address:</strong> {data.email_address}</p>
#         <p><strong>Age:</strong> {data.age}</p>
#         <p><strong>Gender:</strong> {data.gender}</p>
#         <p><strong>Contact Number:</strong> {data.contact_number}</p>
#         <p><strong>Whatsapp Number:</strong> {data.whatsapp_number}</p>
#         <p><strong>College Name:</strong> {data.college_name}</p>
#         <p><strong>Pick-up Location:</strong> {data.pick_up_loc}</p>
#         <p><strong>Drop Location:</strong> {data.drop_loc}</p>
#         <p><strong>Meal Preference:</strong> {data.meal_preference}</p>
#         <p><strong>Experience Level:</strong> {data.trip_exp_level}</p>
#         <p><strong>Medical Details:</strong> {data.medical_details}</p>
#         <p><strong>Agree to Terms:</strong> {data.agree}</p>
#         """,
#     }
    

#     response = requests.post(
#         "https://api.resend.com/emails",
#         headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
#         json=payload,
#     )
#     response.raise_for_status()