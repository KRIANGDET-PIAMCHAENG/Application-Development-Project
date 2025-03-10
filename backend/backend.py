from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import jwt
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["nisit"]
users_collection = db["nisit_data"]

course_db = client["Course"]
courses_collection = course_db["kusrc_computer_engineering_courses_2022"]

SECRET_KEY = os.getenv("SECRET_KEY")

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data.get("email"), data.get("password")

    if not email or not password:
        return jsonify({"error": "กรุณากรอกอีเมลและรหัสผ่าน"}), 400

    user = users_collection.find_one({"email": email})
    if not user or password != user["password"]:
        return jsonify({"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"}), 401

    token = jwt.encode({
        "user_id": str(user["_id"]),
        "email": user["email"],  
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"message": "เข้าสู่ระบบสำเร็จ", "token": token}), 200

@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization', '').replace("Bearer ", "")

    if not token:
        return jsonify({"error": "Token is missing"}), 403

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({"message": f"Welcome user {decoded['user_id']}, email: {decoded['email']}"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

@app.route('/profile', methods=['GET'])
def get_profile():
    token = request.headers.get("Authorization")

    if not token:
        return jsonify({"error": "Token is missing"}), 403

    try:
        token = token.replace("Bearer ", "")
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = decoded["email"]

        user = users_collection.find_one({"email": email}, {"_id": 0, "password": 0})

        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
    
@app.route('/courses', methods=['GET'])
def get_courses():
    category = request.args.get('category')

    query = {}
    if category:
        query["category"] = category  

    courses = courses_collection.find(query, {"_id": 0, "course_code": 1, "course_name": 1, "credit": 1, "description": 1, "category": 1}).sort("course_code")

    return jsonify(list(courses)), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)