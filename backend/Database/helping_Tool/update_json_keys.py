import json
from collections import OrderedDict

# ฟังก์ชันสำหรับการเปลี่ยนชื่อฟิลด์โดยรักษาลำดับ
def replace_key(data, old_key, new_key):
    if isinstance(data, dict):  # ถ้าเป็น dictionary
        # ใช้ OrderedDict เพื่อรักษาลำดับ
        ordered_data = OrderedDict()
        for key, value in data.items():
            if key == old_key:
                ordered_data[new_key] = value  # เปลี่ยนชื่อฟิลด์
            else:
                ordered_data[key] = replace_key(value, old_key, new_key)
        return ordered_data
    elif isinstance(data, list):  # ถ้าเป็น list
        return [replace_key(item, old_key, new_key) for item in data]
    return data

# อ่านไฟล์ JSON
with open('information/ku_general_education_wellness_courses_2019.json', 'r', encoding='utf-8') as file:
    json_data = json.load(file, object_pairs_hook=OrderedDict)  # ใช้ OrderedDict เพื่อรักษาลำดับ

# เรียกใช้ฟังก์ชันเพื่อเปลี่ยน 'x' เป็น 'y'
updated_data = replace_key(json_data, 'x', 'y')

# บันทึกผลลัพธ์กลับไปที่ไฟล์
with open('file_updated.json', 'w', encoding='utf-8') as file:
    json.dump(updated_data, file, ensure_ascii=False, indent=4)

print("Update done!!!")
