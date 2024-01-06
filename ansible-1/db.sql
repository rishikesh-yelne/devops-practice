CREATE TABLE IF NOT EXISTS sample_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL
);

DELETE FROM sample_table;

INSERT INTO sample_table (name, age) VALUES ('John', 42), ('Jane', 37), ('Doe', 18);
