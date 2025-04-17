from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from utils.gemini import process_audio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default dev port
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-audio/")
async def upload_audio(file: UploadFile = File(...)):
    file_location = f"temp/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(await file.read())

    result = process_audio(file_location)
    return result
