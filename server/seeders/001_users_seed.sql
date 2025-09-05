INSERT INTO
    users (firstName, lastName, email, password, role)
VALUES
    (
        'john',
        'doe',
        'superadmin@example.com',
        'password123',
        'super-admin'
    ) ON CONFLICT (email) DO NOTHING;