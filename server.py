from flask import Flask, render_template, session, request, redirect, jsonify
import utils
import data_manager

app = Flask(__name__)
app.secret_key = "NotVeryComplicatedTestKey"


@app.route('/')
def main_page():
    return render_template("Main_Page.html")


@app.route('/register', methods=['POST'])
def register():
    try:
        user = request.json
        if utils.compare_passwords(user['password'], user['passwordConfirmation']):
            jsonify({"status": 409})
        if utils.check_if_user_in_database(user['email']):
            jsonify({"status": 409})
    except :
        jsonify({"status": 400})


@app.route('/login', methods=['POST'])
def login():
    try:
        session['id'] = "coś z bazy"
        session['email'] = "coś z bazy"
        jsonify({"status": 200})
    except :
        jsonify({"status": 400})



@app.route("/logout")
def logout():
    session.pop("id", None)
    session.pop("email", None)
    return redirect('/')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
