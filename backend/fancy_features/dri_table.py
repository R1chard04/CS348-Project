import pandas as pd

# Dietary Reference Intakes (DRIs): Recommended Dietary Allowances and Adequate Intakes, Elements

data = {
    'Life-Stage Group': [
        'Infants', 'Infants', 'Infants', 'Children', 'Children', 'Males', 'Males', 'Males', 'Males', 'Males', 'Males', 'Males', 
        'Females', 'Females', 'Females', 'Females', 'Females', 'Females', 'Pregnancy', 'Pregnancy', 'Pregnancy', 'Lactation', 'Lactation', 'Lactation'
    ],
    'Age': [
        '0–6 mo', '7–12 mo', '', '1–3 y', '4–8 y', '9–13 y', '14–18 y', '19–30 y', '31–50 y', '51–70 y', '> 70 y', '', 
        '9–13 y', '14–18 y', '19–30 y', '31–50 y', '51–70 y', '> 70 y', '14–18 y', '19–30 y', '31–50 y', '14–18 y', '19–30 y', '31–50 y'
    ],
    'Calcium (mg/d)': [
        200, 260, '', 700, 1000, 1300, 1300, 1000, 1000, 1000, 1200, '',
        1300, 1300, 1000, 1000, 1200, '', 1300, 1000, 1000, 1300, 1000, 1000
    ],
    'Chromium (μg/d)': [
        0.2, 5.5, '', 11, 15, 25, 35, 35, 35, 30, 30, '',
        21, 24, 25, 25, 20, '', 29, 30, 30, 44, 45, 45
    ],
    'Copper (μg/d)': [
        200, 220, '', 340, 440, 700, 890, 900, 900, 900, 900, '',
        700, 890, 900, 900, 900, '', 1000, 1000, 1000, 1300, 1300, 1300
    ],
    'Fluoride (mg/d)': [
        0.01, 0.5, '', 0.7, 1, 2, 3, 4, 4, 4, 4, '',
        2, 3, 3, 3, 3, '', 3, 3, 3, 3, 3, 3
    ],
    'Iodine (μg/d)': [
        110, 130, '', 90, 90, 120, 150, 150, 150, 150, 150, '',
        120, 150, 150, 150, 150, '', 220, 220, 220, 290, 290, 290
    ],
    'Iron (mg/d)': [
        0.27, 11, '', 7, 10, 8, 11, 8, 8, 8, 8, '',
        8, 15, 18, 18, 8, '', 27, 27, 27, 10, 9, 9
    ],
    'Magnesium (mg/d)': [
        30, 75, '', 80, 130, 240, 410, 400, 420, 420, 420, '',
        240, 360, 310, 310, 320, '', 400, 350, 360, 360, 310, 320
    ],
    'Manganese (mg/d)': [
        0.003, 0.6, '', 1.2, 1.5, 1.9, 2.2, 2.3, 2.3, 2.3, 2.3, '',
        1.6, 1.6, 1.8, 1.8, 1.8, '', 2, 2, 2, 2.6, 2.6, 2.6
    ],
    'Molybdenum (μg/d)': [
        2, 3, '', 17, 22, 34, 43, 45, 45, 45, 45, '',
        34, 43, 45, 45, 45, '', 50, 50, 50, 50, 50, 50
    ],
    'Phosphorus (mg/d)': [
        100, 275, '', 460, 500, 1250, 1250, 700, 700, 700, 700, '',
        1250, 1250, 700, 700, 700, '', 1250, 700, 700, 1250, 700, 700
    ],
    'Selenium (μg/d)': [
        15, 20, '', 20, 30, 40, 55, 55, 55, 55, 55, '',
        40, 55, 55, 55, 55, '', 60, 60, 60, 70, 70, 70
    ],
    'Zinc (mg/d)': [
        2, 3, '', 3, 5, 8, 11, 11, 11, 11, 11, '',
        8, 9, 8, 8, 8, '', 12, 11, 11, 13, 12, 12
    ],
    'Potassium (mg/d)': [
        400, 860, '', 2000, 2300, 2500, 3000, 3400, 3400, 3400, 3400, '',
        2300, 2300, 2600, 2600, 2600, '', 2600, 2900, 2900, 2500, 2800, 2800
    ],
    'Sodium (mg/d)': [
        110, 370, '', 800, 1000, 1200, 1500, 1500, 1500, 1500, 1500, '',
        1200, 1500, 1500, 1500, 1500, '', 1500, 1500, 1500, 1500, 1500, 1500
    ],
    'Chloride (g/d)': [
        0.18, 0.57, '', 1.5, 1.9, 2.3, 2.3, 2.3, 2.3, 2.0, 1.8, '',
        2.3, 2.3, 2.3, 2.3, 2.0, '', 2.3, 2.3, 2.3, 2.3, 2.3, 2.3
    ]
}

df = pd.DataFrame(data)

print(df)