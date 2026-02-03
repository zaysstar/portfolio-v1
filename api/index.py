from http.server import BaseHTTPRequestHandler
import json
from datetime import datetime
from zoneinfo import ZoneInfo # Standard in Python 3.9+

class SystemMonitor:
    def __init__(self):
        self.status = "OPERATIONAL"
        # Set the timezone to Eastern Time (South Carolina)
        self.tz = ZoneInfo("America/New_York") 
    
    def get_diagnostics(self):
        # Get current time in your specific timezone
        local_time = datetime.now(self.tz)
        
        # Format: 12-hour clock (e.g., 04:30 PM EST)
        formatted_time = local_time.strftime("%I:%M %p %Z")
        
        return {
            "status": self.status,
            "system_time": formatted_time,
            "latency": "24ms",
            "encryption": "AES-256"
        }

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        monitor = SystemMonitor()
        data = monitor.get_diagnostics()
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
        return