from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# โหลดค่าจากไฟล์ .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# ดึง URI จาก .env
MONGO_URI = os.getenv("MONGO_URI")

# เชื่อมต่อ MongoDB
client = MongoClient(MONGO_URI)
db = client["nisit"]  # ตั้งชื่อ Database ตามที่ต้องการ
users_collection = db["nisit_data"]  # ชื่อ Collection

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")  # ต้องใช้ email
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "กรุณากรอกอีเมลและรหัสผ่าน"}), 400

    user = users_collection.find_one({"email": email})  # ใช้ email ใน MongoDB

    if user and user["password"] == password:
        return jsonify({"message": "เข้าสู่ระบบสำเร็จ"}), 200
    else:
        return jsonify({"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"}), 401
    
if __name__ == '__main__':
    app.run(debug=True, port=5001)

