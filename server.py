from flask import Flask, render_template, session, request, redirect, jsonify

import data_manager
import utils

app = Flask(__name__)
app.secret_key = "NotVeryComplicatedTestKey"


@app.route('/', methods=['GET', 'POST'])
def main_page():
    return render_template("main_page.html")


@app.route('/register', methods=['GET', 'POST'])
def register():
    try:
        if utils.register_user_if_possible(request.json):
            return jsonify({"status": 200, "register": "register"})
        else:
            return jsonify({"status": 409, "register": "register"})
    except:
        return jsonify({"status": 400, "register": "register"})


@app.route('/login', methods=['GET', 'POST'])
def login():
    try:
        user = utils.compare_input_with_user_in_database(request.json)
        if user:
            session['user'] = user
            return jsonify({"status": 200, "data": "login"})
        return jsonify({"status": 401, "data": "login"})
    except:
        return jsonify({"status": 400, "data": "login"})


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    if request.method == 'POST':
        session.pop("user", None)
        return jsonify({"status": 200, "data": "logout"})
    else:
        return jsonify({"status": 300, "data": "logout"})


@app.route('/vote', methods=['GET', 'POST'])
def vote():
    try:
        response = utils.vote_if_possible(request.json['email'], request.json['planet_name'])
        return jsonify({"status": response, "data": "vote"})
    except:
        return jsonify({"status": 400, "data": "vote"})


@app.route('/statistics', methods=['GET', 'POST'])
def show_statistics():
    try:
        votes = data_manager.get_all_votes()
        return jsonify({"status": 200, "data": "statistics"}, votes)
    except:
        return jsonify({"status": 400, "data": "statistics"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
