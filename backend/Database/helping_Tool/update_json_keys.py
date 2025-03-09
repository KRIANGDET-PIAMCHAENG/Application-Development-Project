import json
from collections import OrderedDict

def replace_key(data, old_key, new_key):
    if isinstance(data, dict):  
        ordered_data = OrderedDict()
        for key, value in data.items():
            if key == old_key:
                ordered_data[new_key] = value  
            else:
                ordered_data[key] = replace_key(value, old_key, new_key)
        return ordered_data
    elif isinstance(data, list):  
        return [replace_key(item, old_key, new_key) for item in data]
    return data

with open('information/ku_general_education_wellness_courses_2019.json', 'r', encoding='utf-8') as file:
    json_data = json.load(file, object_pairs_hook=OrderedDict)  

updated_data = replace_key(json_data, 'x', 'y')

with open('file_updated.json', 'w', encoding='utf-8') as file:
    json.dump(updated_data, file, ensure_ascii=False, indent=4)

print("Update done!!!")
