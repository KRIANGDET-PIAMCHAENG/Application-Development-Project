import json
from collections import OrderedDict

def update_value(data, field_name, new_value):
    if isinstance(data, dict):  
        if field_name in data:
            data[field_name] = new_value 
            
        for key in data:
            data[key] = update_value(data[key], field_name, new_value)
    elif isinstance(data, list): 
        for i in range(len(data)):
            data[i] = update_value(data[i], field_name, new_value)
    return data

with open('information/ku_general_education_entrepreneurship_2019.json', 'r', encoding='utf-8') as file:
    json_data = json.load(file)

field_name = "group"
new_value = "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ (Entrepreneurship)"  
updated_data = update_value(json_data, field_name, new_value)

with open('file_with_updated.json', 'w', encoding='utf-8') as file:
    json.dump(updated_data, file, ensure_ascii=False, indent=4)

print(f"ฟิลด์ '{field_name}' ถูกเปลี่ยนค่าเป็น '{new_value}' ในไฟล์แล้ว")
