from flask import Flask, render_template, session, request, redirect, jsonify
import utils

app = Flask(__name__)
app.secret_key = "NotVeryComplicatedTestKey"


@app.route('/')
def main_page():
    return render_template("Main_Page.html")


@app.route('/register', methods=['POST'])
def register():
    try:
        if utils.register_user_if_possible(request.json):
            return jsonify({"status": 200})
        else:
            return jsonify({"status": 409})
    except:
        return jsonify({"status": 400})


@app.route('/login', methods=['POST'])
def login():
    try:
        user = utils.compare_input_with_user_in_database(request.json)
        if user:
            session['user'] = user
            return jsonify({"status": 200})
        return jsonify({"status": 401})
    except:
        return jsonify({"status": 400})


@app.route('/vote', methods=['POST'])
def vote():
    print(request.json)
    return jsonify({"status": 200})


@app.route("/logout", methods=['GET'])
def logout():
    session.pop("user", None)
    return redirect('/')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
