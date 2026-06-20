#!/usr/bin/env python3
"""Serve the dist directory and take multiple screenshots with playwright."""
import subprocess
import time
import os
from playwright.sync_api import sync_playwright

DIST_DIR = "/home/z/my-project/homeodesk-pro/dist"
OUTPUT_DIR = "/home/z/my-project/download"

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Start server
    server = subprocess.Popen(
        ["python3", "-m", "http.server", "3003"],
        cwd=DIST_DIR,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(2)
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            
            # Screenshot 1: Home page
            page.goto("http://localhost:3003", timeout=20000)
            page.wait_for_load_state("networkidle", timeout=15000)
            time.sleep(2)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "homeodesk-home.png"))
            print("1. Home page saved")
            
            # Screenshot 2: Try to click different tabs
            tabs = ["Repertory", "Materia Medica", "Patient", "Analysis", "AI"]
            for i, tab_name in enumerate(tabs):
                try:
                    tab = page.locator(f"text={tab_name}").first
                    if tab.is_visible(timeout=3000):
                        tab.click()
                        time.sleep(1.5)
                        page.wait_for_load_state("networkidle", timeout=8000)
                        safe_name = tab_name.lower().replace(" ", "-")
                        page.screenshot(path=os.path.join(OUTPUT_DIR, f"homeodesk-{safe_name}.png"))
                        print(f"2.{i+1}. {tab_name} tab saved")
                except Exception as e:
                    print(f"  Skip {tab_name}: {e}")
            
            browser.close()
    finally:
        server.terminate()
        server.wait(timeout=5)
    
    print("All screenshots done!")

if __name__ == "__main__":
    main()
