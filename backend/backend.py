from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)  

client = MongoClient("??????")  
db = client["??????"] 
users_collection = db["??????"]  

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")  
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "กรุณากรอกอีเมลและรหัสผ่าน"}), 400

    user = users_collection.find_one({"email": email})  
    
    if not user:
        return jsonify({"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"}), 401
    
    if user["password"] == password:
        return jsonify({"message": "เข้าสู่ระบบสำเร็จ"}), 200
    else:
        return jsonify({"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"}), 401

if __name__ == '__main__':
    app.run(debug=True)
