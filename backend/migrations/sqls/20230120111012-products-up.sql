CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_name VARCHAR(20) NOT NULL,
    price NUMERIC NOT NULL,
    tax NUMERIC,
    ads NUMERIC,
    discount NUMERIC,
    count INT NOT NULL,
    catagery VARCHAR(20) NOT NULL
);

