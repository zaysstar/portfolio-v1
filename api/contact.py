from http.server import BaseHTTPRequestHandler
import json
import os
import psycopg2
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 1. Parse the incoming JSON data
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # 2. Connect to Neon (Vercel Postgres)
        try:
            # Vercel provides this env var automatically when linked
            conn = psycopg2.connect(os.environ.get("POSTGRES_URL"))
            cur = conn.cursor()

            # 3. Auto-Create Table (One-time setup)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    email VARCHAR(100),
                    message TEXT,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)

            # 4. Insert the Message
            cur.execute(
                "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)",
                (name, email, message)
            )
            
            conn.commit()
            cur.close()
            conn.close()

            # 5. Success Response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {"status": "TRANSMISSION_RECEIVED", "code": 200}
            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {"status": "UPLINK_FAILED", "error": str(e)}
            self.wfile.write(json.dumps(response).encode('utf-8'))