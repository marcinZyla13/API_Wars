from flask import Flask, render_template, session, request, redirect, jsonify
import utils

app = Flask(__name__)
app.secret_key = "NotVeryComplicatedTestKey"


@app.route('/', methods=['POST', 'GET'])
def main_page():
    return render_template("main_page.html")


@app.route('/register', methods=['POST'])
def register():
    try:
        if utils.register_user_if_possible(request.json):
            return jsonify({"status": 200, "register": "register"})
        else:
            return jsonify({"status": 409, "register": "register"})
    except:
        return jsonify({"status": 400, "register": "register"})


@app.route('/login', methods=['POST'])
def login():
    try:
        user = utils.compare_input_with_user_in_database(request.json)
        if user:
            session['user'] = user
            return jsonify({"status": 200, "data": "login"})
        return jsonify({"status": 401, "data": "login"})
    except:
        return jsonify({"status": 400, "data": "login"})


@app.route('/logout', methods=['POST', 'GET'])
def logout():
    session.pop("user", None)
    return jsonify({"status": 200, "data": "logout"})



@app.route('/vote', methods=['POST'])
def vote():
    try:
        response = utils.vote_if_possible(request.json['email'], request.json['planet_name'])
        return jsonify({"status": response, "data": "vote"})
    except:
        return jsonify({"status": 400, "data": "vote"})



if __name__ == "__main__":
    app.run(debug=True, port=5000)
