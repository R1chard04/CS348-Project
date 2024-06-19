from connect import get_cursor

def richardTest():
    (conn, cur) = get_cursor()
    cur.execute("SELECT * FROM recipes")
    rows = cur.fetchall()
    for row in rows:
        print(row)
    
    cur.close()
    conn.close()


richardTest()
