/*create schema if not exists shoes ;
use shoes;

drop table if exists shoe;
create table if not exists shoe(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    size varchar(2) NOT NULL,
    color varchar(10) NOT NULL,
	price int NOT NULL,
    CONSTRAINT service_staff_pk PRIMARY KEY (id)
);

-------- Default shoes --------

INSERT INTO shoe(name, size, color, price) values
    ('Puma', '40', 'black', 120),
    ('Nike', '42', 'white', 100);*/