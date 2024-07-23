import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

if os.environ.get('DATABASE_ADDRESS'):
    DATABASE_ADDRESS = os.environ['DATABASE_ADDRESS']
else:
    DATABASE_ADDRESS = "localhost"


# establishing connection to DB
def create_connection():
    return psycopg2.connect(
        database="limes", user='limes', password='pass123', host=DATABASE_ADDRESS, port= '5432'
    )

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# Get all quotes
@app.route('/api/quote', methods=['GET'])
def getQuote():
    conn = create_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM quotes")
    conn.commit()

    data = cursor.fetchall()

    conn.close()
    return jsonify({"quotes": data}), 200

# Create a quote
@app.route('/api/quote', methods=['POST'])
def createQuote():
    try:
        data = request.get_json()  
        if not data.get('name') or not data.get('quote'):
            return jsonify({"status": "error", "message": "Invalid input"}), 400

        conn = create_connection()
        cursor = conn.cursor()

        print("NAME: ", data.get('name'))
        print("QUOTE: ", data.get('quote'))

        cursor.execute("INSERT INTO quotes (name, quote) VALUES (%s, %s)", (data.get('name'), data.get('quote')))
        conn.commit()
        
        conn.close()
        return jsonify({"status": "ok"}), 200
    
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Delete a quote
@app.route('/api/quote', methods=['DELETE'])
def deleteQuote():
    try:
        data = request.get_json()  
        if not data.get('quote'):
            return jsonify({"status": "error", "message": "Invalid input"}), 400

        conn = create_connection()
        cursor = conn.cursor()

        print("QUOTE: ", data.get('quote'))

        cursor.execute("DELETE FROM quotes WHERE quote = %s", (data.get('quote'),))
        conn.commit()
        
        conn.close()
        return jsonify({"status": "ok"}), 200
    
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)