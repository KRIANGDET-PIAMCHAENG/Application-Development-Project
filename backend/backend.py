from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import bcrypt
import jwt
import datetime

# โหลดค่าจากไฟล์ .env
load_dotenv()

app = Flask(__name__)

# ตั้งค่า CORS ให้อนุญาตการเชื่อมต่อจาก http://localhost:5178
CORS(app, origins=["http://localhost:5178"], supports_credentials=True)  # supports_credentials=True สำหรับการส่ง cookies หรือ Authorization header

# ดึง URI จาก .env
MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")  # ลับสำหรับการเข้ารหัส JWT

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

    if not user:
        return jsonify({"error": "อีเมลไม่ถูกต้อง"}), 401

    if bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        # สร้าง JWT token
        token = jwt.encode({
            "user_id": str(user["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # หมดอายุใน 1 ชั่วโมง
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({"message": "เข้าสู่ระบบสำเร็จ", "token": token}), 200
    else:
        return jsonify({"error": "รหัสผ่านไม่ถูกต้อง"}), 401

@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({"error": "Token is missing"}), 403

    try:
        # Remove "Bearer " from the token
        token = token.replace("Bearer ", "")
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]

        # สามารถใช้ user_id เพื่อดึงข้อมูลของผู้ใช้จาก MongoDB
        return jsonify({"message": f"Welcome user {user_id}"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5001)
