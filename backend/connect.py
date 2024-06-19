import psycopg2
from config import load_config

def connect(config):
    conn = None
    try:
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**config)
        print('Connection successful')
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    return conn

def get_cursor():
    config = load_config()
    conn = connect(config)
    cur = conn.cursor()
    return (conn, cur)
