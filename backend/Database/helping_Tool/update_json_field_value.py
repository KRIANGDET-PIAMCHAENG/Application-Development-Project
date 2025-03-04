import json
from collections import OrderedDict

# ฟังก์ชันสำหรับการเปลี่ยนค่าในฟิลด์ที่ระบุ
def update_value(data, field_name, new_value):
    if isinstance(data, dict):  # ถ้าเป็น dictionary
        # ตรวจสอบว่าเจอฟิลด์ที่ต้องการเปลี่ยนค่าไหม
        if field_name in data:
            data[field_name] = new_value  # เปลี่ยนค่าของฟิลด์
        # ทำการตรวจสอบคีย์ใน dictionary และอัพเดตค่า
        for key in data:
            data[key] = update_value(data[key], field_name, new_value)
    elif isinstance(data, list):  # ถ้าเป็น list
        for i in range(len(data)):
            data[i] = update_value(data[i], field_name, new_value)
    return data

# อ่านไฟล์ JSON
with open('information/ku_general_education_entrepreneurship_2019.json', 'r', encoding='utf-8') as file:
    json_data = json.load(file)

# เรียกใช้ฟังก์ชันเพื่อเปลี่ยนค่าในฟิลด์ 'course_name'
field_name = "group"
new_value = "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ (Entrepreneurship)"  # ค่าใหม่ที่ต้องการให้เปลี่ยน
updated_data = update_value(json_data, field_name, new_value)

# บันทึกผลลัพธ์กลับไปที่ไฟล์
with open('file_with_updated.json', 'w', encoding='utf-8') as file:
    json.dump(updated_data, file, ensure_ascii=False, indent=4)

print(f"ฟิลด์ '{field_name}' ถูกเปลี่ยนค่าเป็น '{new_value}' ในไฟล์แล้ว")
