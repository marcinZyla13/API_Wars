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


@connection.connection_handler
def vote(cursor, user_id, planet_name):
    query = """
    INSERT INTO votes(user_id, planet_name)
    VALUES (%(user_id)s,%(planet_name)s)      
    """
    arguments = {'user_id': user_id, 'planet_name': planet_name}
    cursor.execute(query, arguments)


@connection.connection_handler
def check_if_user_voted(cursor, user_id, planet_name):
    query = """
    SELECT user_id,planet_name FROM votes
    WHERE user_id = %(user_id)s AND planet_name = %(planet_name)s
    """
    arguments = {'user_id': user_id, 'planet_name': planet_name}
    cursor.execute(query, arguments)
    return cursor.fetchone()


@connection.connection_handler
def get_all_votes(cursor):
    query = """
            SELECT planet_name,count(planet_name) FROM votes
            GROUP BY planet_name
    """
    cursor.execute(query)
    return cursor.fetchall()
