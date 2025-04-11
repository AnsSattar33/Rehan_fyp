# import jwt
# from datetime import datetime, timedelta
# from flask import Flask, request, jsonify
# import psycopg2
# from flask_cors import CORS
# import bcrypt
# import os

# secret_key = os.getenv("SECRET_KEY", "default_secret_key")

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # CORS setup for React frontend

# # Connect to PostgreSQL
# def get_db_connection():
#     conn = psycopg2.connect(
#         host="localhost",
#         database="sign_up",  # Replace with your database name
#         user="postgres",      # Replace with your PostgreSQL username
#         password="Rehan123",  # Replace with your PostgreSQL password
#         port=5432             # Default PostgreSQL port
#     )
#     return conn

# @app.route('/')
# def home():
#     return 'Hello, Flask is running!'

# @app.route('/api/login', methods=['POST'])
# def login():
#     data = request.get_json()

#     email = data.get('email')
#     password = data.get('password')

#     if not all([email, password]):
#         return jsonify({'error': 'Missing email or password'}), 400

#     conn = get_db_connection()
#     cursor = conn.cursor()

#     try:
#         cursor.execute("SELECT password, id FROM users WHERE email = %s", (email,))
#         user = cursor.fetchone()

#         if user is None:
#             return jsonify({'error': 'Invalid email or password'}), 401

#         if not bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
#             return jsonify({'error': 'Invalid email or password'}), 401

#         # Generate JWT token
#         token = jwt.encode({
#             'user_id': user[1],
#             'exp': datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
#         }, secret_key, algorithm='HS256')

#         return jsonify({'message': 'Login successful', 'token': token}), 200

#     except Exception as e:
#         print(f"Error occurred: {str(e)}")  # Print the detailed error message in your terminal
#         return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
#     finally:
#         cursor.close()
#         conn.close()

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)  # Run the Flask server on port 5001
