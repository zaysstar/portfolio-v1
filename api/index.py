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
        # Looks for the token in Vercel Environment Variables
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
                dt = datetime.strptime(pushed_at, "%Y-%m-%dT%H:%M:%SZ")
                # Convert to EST timezone
                return dt.replace(tzinfo=ZoneInfo("UTC")).astimezone(self.tz).strftime("%m/%d/%Y")
        except Exception as e:
            print(f"Error fetching {repo_name}: {e}")
        return "N/A" # Fallback if API fails

# --- COMPONENT 2: PANDAS DATA ANALYTICS ---
class SystemMonitor:
    def __init__(self):
        self.status = "OPERATIONAL"
        self.tz = ZoneInfo("America/New_York") 
    
    def generate_analysis(self):
        # 1. Generate Fake Raw Log Data
        events = [
            {"type": "INFO", "msg": "Connection established"},
            {"type": "WARN", "msg": "Port scan detected"},
            {"type": "SUCCESS", "msg": "Encryption key rotated"},
            {"type": "CRITICAL", "msg": "SQL Injection Attempt"},
            {"type": "INFO", "msg": "Packet tracing initiated"},
        ]
        
        data_points = []
        current_time = datetime.now(self.tz)
        
        # Simulate 20 recent events
        for _ in range(20): 
            event = random.choice(events)
            log_time = current_time - timedelta(minutes=random.randint(1, 60))
            data_points.append({
                "time_obj": log_time,
                "timestamp": log_time.strftime("%H:%M:%S"),
                "type": event["type"],
                "msg": event["msg"]
            })
            
        # 2. Load into Pandas DataFrame
        df = pd.DataFrame(data_points)
        
        # 3. Perform Analytics
        type_counts = df['type'].value_counts().to_dict()
        
        # Calculate a "Threat Score"
        critical_count = type_counts.get("CRITICAL", 0)
        threat_score = min(100, critical_count * 20) 
        
        # Sort by time (newest first)
        df = df.sort_values(by='time_obj', ascending=False)
        
        # Convert top 5 rows back to Dictionary for JSON
        recent_logs = df.head(5)[['timestamp', 'type', 'msg']].to_dict(orient='records')
        
        return {
            "status": self.status,
            "system_time": current_time.strftime("%I:%M %p %Z"),
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
        # Note: 'repoId' in React must match these keys
        repo_dates = {
            "crewmate-creator": fetcher.get_last_commit_date("crewmate-creator"),
            "portfolio-v1": fetcher.get_last_commit_date("portfolio-v1"),
            # If you have a flashcards repo, add it here:
            # "flashcards": fetcher.get_last_commit_date("flashcards-repo-name"),
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