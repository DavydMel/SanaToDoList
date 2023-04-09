create database ToDoList;

use ToDoList;

create table Category (
	id int identity(1, 1) primary key,
	name varchar(255) not null
);

create table ToDoItem (
	id int identity(1, 1) primary key,
	category_id int foreign key references Category(id) not null,
	name varchar(255) not null,
	deadline datetime,
	is_completed bit not null
);

insert into Category values ('Job');
insert into Category values ('Family');
insert into Category values ('Personal');

insert into ToDoItem values (1, 'Check email', '2023-04-12 09:00', 1);
insert into ToDoItem values (2, 'Visit parents', '2023-04-13 12:00', 0);
insert into ToDoItem values (3, 'Study SQL', '2023-04-04 14:30', 0);