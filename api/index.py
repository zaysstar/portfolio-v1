from http.server import BaseHTTPRequestHandler
import json
import time

# --- OOP SKILL: Python Class ---
class SystemMonitor:
    def __init__(self):
        self.status = "OPERATIONAL"
        self.version = "v1.0.5"
    
    def get_diagnostics(self):
        # Logic: Get current server time
        current_time = time.strftime("%H:%M:%S UTC", time.gmtime())
        
        return {
            "status": self.status,
            "system_time": current_time,
            "latency": "24ms",
            "encryption": "AES-256"
        }

# --- Vercel Serverless Handler ---
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Instantiate our monitor
        monitor = SystemMonitor()
        data = monitor.get_diagnostics()
        
        # Send headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Send JSON response
        self.wfile.write(json.dumps(data).encode('utf-8'))
        return