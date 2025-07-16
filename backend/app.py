from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import os
import sys

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "✅ Backend is running!"


@app.route("/start-keyboard", methods=["GET"])
def start_keyboard():
    try:
        # path to keyboard.py
        script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "keyboard.py")
        subprocess.Popen([sys.executable, script_path])
        print("🎹 keyboard.py started.")
        return jsonify({"status": "success", "message": "keyboard.py started"}), 200
    except Exception as e:
        print(f"❌ Error starting keyboard: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    print("🚀 Starting Flask server at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)
