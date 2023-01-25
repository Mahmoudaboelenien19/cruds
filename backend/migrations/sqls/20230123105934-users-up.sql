CREATE extension IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    email  VARCHAR(20) NOT NULL,
    password VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    product_id INT REFERENCES products(id),
    UNIQUE (product_id,email)
);