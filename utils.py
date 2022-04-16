import bcrypt

import data_manager


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def compare_passwords(password1, password2):
    return password1 == password2


def register_user_if_possible(input_form):
    if check_if_user_already_exist(input_form['email']):
        return False
    if compare_passwords(input_form['password'], input_form['passwordConfirmation']):
        data_manager.add_user(input_form['email'], hash_password(input_form['password']))
        return True


def compare_input_with_user_in_database(input_form):
    user = data_manager.get_user(input_form['email'])
    if user:
        if verify_password(input_form['password'], user['password']):
            return True
        return False
    else:
        return False


def check_if_user_already_exist(email):
    return data_manager.get_user(email)
