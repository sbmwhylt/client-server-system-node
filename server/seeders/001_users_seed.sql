INSERT INTO
    users (firstName, lastName, email, password, role)
VALUES
    (
        'Shemrei',
        'Marabillo',
        'shemrei@whyeleavetown.com',
        'password123',
        'super-admin'
    ) ON CONFLICT (email) DO NOTHING;