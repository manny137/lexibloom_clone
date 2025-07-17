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
        # path to keyboard.py (absolute)
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        script_path = os.path.join(backend_dir, "keyboard.py")

        # Use the virtualenv python if available
        venv_python = os.path.join(
            backend_dir, "..", "..", ".venv", "Scripts", "python.exe"
        )
        if os.path.exists(venv_python):
            python_exe = venv_python
        else:
            python_exe = sys.executable

        subprocess.Popen([python_exe, script_path])
        print("🎹 keyboard.py started.")
        return jsonify({"status": "success", "message": "keyboard.py started"}), 200
    except Exception as e:
        print(f"❌ Error starting keyboard: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    print("🚀 Starting Flask server at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)