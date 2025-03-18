def extract_clothing_data_array(recommendation_string):
    recommendations = []
    lines = recommendation_string.split('\n')
    for line in lines:
        if line.startswith("Office Wear:"):
            wear_type = "Office"
        elif line.startswith("Casual Wear:"):
            wear_type = "Casual"
        elif line.startswith("Party Wear:"):
            wear_type = "Party"
        else:
            continue
        clothing_items_string = line.split(": ")[1]
        clothing_items = clothing_items_string.split("; ")
        for item in clothing_items:
            parts = item.split(",")
            if len(parts) == 3:
                garment = parts[0].strip()
                color = parts[1].strip()
                material = parts[2].strip()
                recommendations.append([garment, color, material, wear_type])
    return recommendations