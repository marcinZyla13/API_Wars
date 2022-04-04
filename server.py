from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)


@app.route('/')
def main_page():
    return render_template("Main_Page.html")


def register():
    return ""


def login():
    return ""



if __name__ == "__main__":
    app.run(debug=True, port=5000)
