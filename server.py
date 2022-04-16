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
    if utils.compare_input_with_user_in_database(request.json):
        session['id'] = "coś z bazy"
        session['email'] = "coś z bazy"
        print('yes')
        return jsonify({"status": 200})
    print('not')
    return jsonify({"status": 400})


@app.route("/logout")
def logout():
    session.pop("id", None)
    session.pop("email", None)
    return redirect('/')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
