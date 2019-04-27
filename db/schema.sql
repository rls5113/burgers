drop database if exists burgers_db;
create database burgers_db;
use burgers_db;

create table burgers (
	id integer auto_increment primary key,
    burger_name varchar(100) not null,
    devoured boolean default false
);
