from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify

app = Flask(__name__)


@app.route('/')
def main_page():
    return "dupa"




if __name__ == "__main__":
    app.run(debug=True, port=5000)
