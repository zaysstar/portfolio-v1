from http.server import BaseHTTPRequestHandler
import json
import random
import os
import requests
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import pandas as pd

# --- COMPONENT 1: REAL GITHUB DATA FETCHING ---
class GitHubFetcher:
    def __init__(self):
        # Uses Vercel Env Var or defaults to None (Public API limit 60/hr)
        self.token = os.environ.get("GITHUB_TOKEN")
        self.username = "zaysstar"
        self.tz = ZoneInfo("America/New_York")

    def get_last_commit_date(self, repo_name):
        # Helper to fetch real data from GitHub API
        url = f"https://api.github.com/repos/{self.username}/{repo_name}"
        headers = {"Authorization": f"token {self.token}"} if self.token else {}
        
        try:
            response = requests.get(url, headers=headers, timeout=5)
            if response.status_code == 200:
                data = response.json()
                pushed_at = data.get("pushed_at")
                
                # Convert ISO 8601 string to Python DateTime
                # Format: "2026-02-05T12:00:00Z"
                dt = datetime.strptime(pushed_at, "%Y-%m-%dT%H:%M:%SZ")
                
                # Convert to EST timezone and Format: "Feb 05, 2026"
                return dt.replace(tzinfo=ZoneInfo("UTC")).astimezone(self.tz).strftime("%b %d, %Y")
            else:
                return "Private/Error"
        except Exception as e:
            print(f"Error fetching {repo_name}: {e}")
            return "N/A"

# --- COMPONENT 2: PANDAS DATA ANALYTICS ---
class SystemMonitor:
    def __init__(self):
        self.status = "OPERATIONAL"
        self.tz = ZoneInfo("America/New_York") 
    
    def generate_analysis(self):
        # 1. Setup Fake Events
        events = [
            {"type": "INFO", "msg": "Connection established"},
            {"type": "WARN", "msg": "Port scan detected"},
            {"type": "SUCCESS", "msg": "Encryption key rotated"},
            {"type": "CRITICAL", "msg": "SQL Injection Attempt"},
            {"type": "INFO", "msg": "Packet tracing initiated"},
        ]
        
        data_points = []
        utc_now = datetime.now(ZoneInfo("UTC"))

        # 2. Simulate 20 recent events
        # (This code was previously unreachable!)
        for _ in range(20): 
            event = random.choice(events)
            # Random time within last 60 minutes
            log_time = utc_now - timedelta(minutes=random.randint(1, 60))
            
            data_points.append({
                "time_obj": log_time,
                "timestamp": log_time.astimezone(self.tz).strftime("%H:%M:%S"), # Convert to EST for display
                "type": event["type"],
                "msg": event["msg"]
            })
            
        # 3. Load into Pandas DataFrame
        df = pd.DataFrame(data_points)
        
        # 4. Perform Analytics
        type_counts = df['type'].value_counts().to_dict()
        
        # Calculate a "Threat Score"
        critical_count = type_counts.get("CRITICAL", 0)
        threat_score = min(100, critical_count * 20) 
        
        # Sort by time (newest first)
        df = df.sort_values(by='time_obj', ascending=False)
        
        # Convert top 5 rows back to Dictionary for JSON
        recent_logs = df.head(5)[['timestamp', 'type', 'msg']].to_dict(orient='records')
        
        # 5. Return the Full Payload
        return {
            "status": self.status,
            "system_time": utc_now.isoformat(),
            "security_logs": recent_logs,
            "analytics": {
                "distribution": type_counts,
                "threat_score": threat_score
            }
        }

# --- COMPONENT 3: SERVERLESS HANDLER ---
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # A. Initialize classes
        fetcher = GitHubFetcher()
        monitor = SystemMonitor()
        
        # B. Get the Real Repo Dates
        # The KEYS (left side) must match the 'repoId' in React EXACTLY.
        # The VALUES (inside fetcher) must match your actual GitHub URL name.
        repo_dates = {
            # React ID: "codepath-crewmate-creator"
            "codepath-crewmate-creator": fetcher.get_last_commit_date("codepath-crewmate-creator"),
            
            # React ID: "portfolio-v1"
            "portfolio-v1": fetcher.get_last_commit_date("portfolio-v1"),
            
            # React ID: "flipcard"
            "flipcard": fetcher.get_last_commit_date("flipcard"), 
        }

        # C. Get the Pandas Analytics
        payload = monitor.generate_analysis()
        
        # D. Merge them together
        payload["repo_dates"] = repo_dates

        # E. Send Response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode('utf-8'))
        return