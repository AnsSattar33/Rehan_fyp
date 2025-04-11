import psycopg2

try:
    conn = psycopg2.connect(
        host="localhost",
        database="sign_up",
        user="postgres",
        password="Rehan123",
        port=5432
    )
    print("Database connection successful!")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
