from flask import Flask, request, jsonify, make_response, redirect, url_for
import psycopg2
from flask_cors import CORS
import bcrypt
import jwt
from datetime import datetime, timedelta
import os

secret_key = os.getenv("SECRET_KEY", "default_secret_key")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # CORS setup for React frontend

# Connect to PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="sign_up",  # Replace with your database name
        user="postgres",      # Replace with your PostgreSQL username
        password="Rehan123",  # Replace with your PostgreSQL password
        port=5432             # Default PostgreSQL port
    )
    return conn

# Signup Route
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    phone_number = data.get('phoneNumber')

    # Check if required fields are present
    if not all([email, password, first_name, last_name, phone_number]):
        return jsonify({'error': 'Missing required fields'}), 400

    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Insert the user data with the hashed password into the database
        cursor.execute("""
            INSERT INTO users (email, password, first_name, last_name, phone_number)
            VALUES (%s, %s, %s, %s, %s)
        """, (email, hashed_password, first_name, last_name, phone_number))
        conn.commit()

        # Redirect to the login page after successful signup
        return jsonify({'message': 'User registered successfully, please login.'}), 201

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
    finally:
        cursor.close()
        conn.close()

# Login Route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Missing email or password'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT password, id FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user is None:
            return jsonify({'error': 'Invalid email or password'}), 401

        # Compare the provided password with the stored hashed password
        stored_password_hash = user[0]

        if bcrypt.checkpw(password.encode('utf-8'), stored_password_hash.encode('utf-8')):
            # Generate JWT token
            token = jwt.encode({
                'user_id': user[1],
                'exp': datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
            }, secret_key, algorithm='HS256')

            # Create the response and set the token as a cookie
            response = jsonify({'message': 'Login successful'})
            response.set_cookie('auth_token', token, httponly=True, secure=False)  # Set the cookie

            return response, 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
    finally:
        cursor.close()
        conn.close()

# Logout Route
@app.route('/api/logout', methods=['POST'])
def logout():
    # Remove the auth_token cookie to log the user out
    response = jsonify({'message': 'Logout successful'})
    response.delete_cookie('auth_token')  # Delete the cookie

    return response, 200

# Protected Route
@app.route('/api/protected', methods=['GET'])
def protected():
    token = request.cookies.get('auth_token')  # Get the token from cookies

    if not token:
        return jsonify({'error': 'Token is missing'}), 403

    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        # The token is valid, you can access user data from decoded_token
        return jsonify({'message': 'Access granted', 'user_id': decoded_token['user_id']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run the Flask server on port 5000
