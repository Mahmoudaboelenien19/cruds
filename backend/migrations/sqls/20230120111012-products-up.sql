CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_name VARCHAR(20) NOT NULL,
    price NUMERIC NOT NULL,
    tax NUMERIC,
    ads NUMERIC,
    discount NUMERIC,
    count INT NOT NULL,
    catagery VARCHAR(20) NOT NULL,
    userId uuid REFERENCES  users(id)
    ,username varchar(500) REFERENCES users (name) ON UPDATE CASCADE);

