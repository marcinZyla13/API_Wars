from flask import Flask, render_template,session, request, redirect, url_for, jsonify

app = Flask(__name__)


@app.route('/')
def main_page():
    return render_template("Main_Page.html")


@app.route('/register')
def register():
    print("register")
    return ""


@app.route('/login')
def login():
    print("Login")
    return ""


if __name__ == "__main__":
    app.run(debug=True, port=5000)
