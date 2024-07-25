from db_queries.feature_queries import get_low_cal_recipe
from db_queries.feature_queries import get_high_cal_recipe

def recommend_recipe(bmi):
    if bmi >= 25:
        query = get_low_cal_recipe()
    else:
        query = get_high_cal_recipe()
    return query