from http.server import BaseHTTPRequestHandler
import json
import random
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import pandas as pd # <--- THE NEW SKILL

class SystemMonitor:
    def __init__(self):
        self.status = "OPERATIONAL"
        self.tz = ZoneInfo("America/New_York") 
    
    def generate_analysis(self):
        # 1. Generate Raw Data
        events = [
            {"type": "INFO", "msg": "Connection established"},
            {"type": "WARN", "msg": "Port scan detected"},
            {"type": "SUCCESS", "msg": "Encryption key rotated"},
            {"type": "CRITICAL", "msg": "SQL Injection Attempt"},
            {"type": "INFO", "msg": "Packet tracing initiated"},
        ]
        
        # Create a larger dataset for Pandas to chew on
        data_points = []
        current_time = datetime.now(self.tz)
        
        for _ in range(20): # Simulate 20 recent events
            event = random.choice(events)
            log_time = current_time - timedelta(minutes=random.randint(1, 60))
            data_points.append({
                "time_obj": log_time,
                "timestamp": log_time.strftime("%H:%M:%S"),
                "type": event["type"],
                "msg": event["msg"]
            })
            
        # 2. LOAD INTO PANDAS DATAFRAME
        df = pd.DataFrame(data_points)
        
        # 3. USE PANDAS FOR ANALYTICS
        # Calculate distribution of event types
        type_counts = df['type'].value_counts().to_dict()
        
        # Calculate "Threat Level" based on CRITICAL count
        critical_count = type_counts.get("CRITICAL", 0)
        threat_score = min(100, critical_count * 20) 
        
        # Sort by time using Pandas (more efficient)
        df = df.sort_values(by='time_obj', ascending=False)
        
        # Convert back to list for JSON
        recent_logs = df.head(5)[['timestamp', 'type', 'msg']].to_dict(orient='records')
        
        return {
            "status": self.status,
            "system_time": current_time.strftime("%I:%M %p %Z"),
            "last_sync": current_time.strftime("%m/%d/%Y"),
            "security_logs": recent_logs,
            "analytics": {
                "distribution": type_counts,
                "threat_score": threat_score
            }
        }

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        monitor = SystemMonitor()
        data = monitor.generate_analysis()
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
        return