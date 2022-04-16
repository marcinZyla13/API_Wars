import connection


@connection.connection_handler
def add_user(cursor, email, password):
    query = """
    INSERT INTO userinformation(email,password)
    VALUES (%(email)s,%(password)s)      
    """
    arguments = {'email': email, 'password': password}
    cursor.execute(query, arguments)


@connection.connection_handler
def get_user(cursor, email):
    query = """
    SELECT user_id,email,password FROM userinformation
    WHERE email = %(email)s

    """
    arguments = {'email': email}
    cursor.execute(query, arguments)
    return cursor.fetchone()
