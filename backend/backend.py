from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import jwt as pyjwt  # ใช้ alias เพื่อหลีกเลี่ยงปัญหาชื่อซ้ำ
import datetime

# โหลด environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # เปิดใช้งาน CORS สำหรับทุก endpoint

client = MongoClient(os.getenv("MONGO_URI"))

db = client["nisit"]
users_collection = db["user_info"]

course_db = client["Course"]
courses_collection = course_db.list_collection_names()

# รวมข้อมูลจากทุก Collection เป็น merged_course
merged_course = []
for course_name in courses_collection:
    collection = course_db[course_name]
    documents = collection.find({}, {"_id": 0})
    for doc in documents:
        doc["source_collection"] = course_name  
        merged_course.append(doc)  

SECRET_KEY = os.getenv("SECRET_KEY")

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"}), 200

#  Endpoint สำหรับ Login และสร้าง Token
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data.get("email"), data.get("password")

    if not email or not password:
        return jsonify({"error": "กรุณากรอกอีเมลและรหัสผ่าน"}), 400

    user = users_collection.find_one({"email": email})
    if not user or password != user["password"]:
        return jsonify({"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"}), 401

    token = pyjwt.encode({
        "user_id": str(user["_id"]),
        "email": user["email"],  
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    # ดึงข้อมูล Flow จากผู้ใช้
    flow = user.get("flow", {})

    return jsonify({"message": "เข้าสู่ระบบสำเร็จ", "token": token, "flow": flow}), 200

#  Endpoint ที่ต้องใช้ Token
@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization', '').replace("Bearer ", "")

    if not token:
        return jsonify({"error": "Token is missing"}), 403

    try:
        decoded = pyjwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({"message": f"Welcome user {decoded['user_id']}, email: {decoded['email']}"}), 200
    except pyjwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except pyjwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

#  ดึงข้อมูล Profile โดยใช้ Token
@app.route('/profile', methods=['GET'])
def get_profile():
    token = request.headers.get("Authorization")

    if not token:
        return jsonify({"error": "Token is missing"}), 403

    try:
        token = token.replace("Bearer ", "")
        decoded = pyjwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = decoded["email"]

        user = users_collection.find_one({"email": email}, {"_id": 0, "password": 0})
        print(user)

        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except pyjwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except pyjwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

#  ดึงข้อมูล Courses จากทุก Collection
@app.route('/courses', methods=['GET'])
def get_courses():
    category = request.args.get('category')
    course_code = request.args.get('course_code')
    group = request.args.get('group')

    filtered_courses = merged_course

    if category:
        filtered_courses = [course for course in filtered_courses if course.get("category") == category]

    if course_code:
        filtered_courses = [course for course in filtered_courses if course.get("course_code") == course_code]

    if group:
        filtered_courses = [course for course in filtered_courses if course.get("group") == group]

    print(" ส่งข้อมูลกลับไปยัง Frontend:", filtered_courses)  # Debug
    return jsonify(filtered_courses), 200

@app.route('/flow', methods=['GET'])
def getFlow():
    # ดึง Token จาก Header
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Token is missing"}), 403

    try:
        # เอา "Bearer " ออก แล้วถอดรหัส JWT
        token = auth_header.replace("Bearer ", "")
        decoded = pyjwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = decoded.get("email")
    except pyjwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except pyjwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    # ค้นหาผู้ใช้จาก MongoDB โดยใช้ email
    user = users_collection.find_one({"email": email}, {"_id": 0, "flow": 1})

    if not user:
        return jsonify({"error": "User not found"}), 404

    # ดึง Flow และส่งกลับ (ถ้าไม่มี flow จะส่ง `{}`)
    flow = user.get("flow", {})
    print(flow)

    return jsonify({"flow": flow}), 200

@app.route('/get_flow', methods=['GET'])
def get_flow():
    token = request.headers.get('Authorization', '').replace("Bearer ", "")
    if not token:
        return jsonify({"error": "Token is missing"}), 403

    try:
        decoded = pyjwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = decoded["email"]
    except pyjwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except pyjwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    user = users_collection.find_one({"email": email}, {"_id": 0, "flow": 1, "added_courses": 1})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # ส่งข้อมูล flow และ added_courses กลับ
    return jsonify({
        "flow": user.get("flow", {"nodes": [], "edges": []}),
        "addedCourses": user.get("added_courses", [])
    }), 200

@app.route('/update_flow', methods=['POST'])
def update_flow():
    token = request.headers.get('Authorization', '').replace("Bearer ", "")
    if not token:
        return jsonify({"error": "Token is missing"}), 403

    try:
        decoded = pyjwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = decoded["email"]
    except Exception as e:
        return jsonify({"error": str(e)}), 401

    data = request.get_json()
    flow = data.get("flow", {})
    added_courses = data.get("addedCourses", [])

    # อัปเดตข้อมูลใน MongoDB
    users_collection.update_one(
        {"email": email},
        {"$set": {
            "flow": flow,
            "added_courses": added_courses
        }},
        upsert=True
    )

    return jsonify({"message": "Flow updated successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)