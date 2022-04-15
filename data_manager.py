import connection


@connection.connection_handler
def add_user(cursor,email,password):
    query = """
    INSERT INTO userinformation(user_id,password)
      
    """

    cursor.execute(query)
    return cursor.fetchall()