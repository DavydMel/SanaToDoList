create database ToDoList;

use ToDoList;

create table Category (
	Id int identity(1, 1) primary key,
	Name varchar(255),
	Priority int
);

create table ToDoItem (
	Id int identity(1, 1) primary key,
	CategoryId int foreign key references Category(Id),
	Title varchar(255),
	Text text,
	FinishDate datetime,
	Priority int
);

insert into Category values ('Job', 3);
insert into Category values ('Family', 5);
insert into Category values ('Friends', 3);
insert into Category values ('Pet', 4);
insert into Category values ('Personal', 1);

insert into ToDoItem values (1, 'Check email', 'Don''t forget to check email', '2023-03-31', 2);
insert into ToDoItem values (1, 'Write the report', 'Don''t forget to write the report', '2023-03-31 16:30', 2);
insert into ToDoItem values (1, 'Clear the workplace', 'Don''t forget to clear the workplace', '2023-03-31 17:30', 2);
insert into ToDoItem values (2, 'Visit parents', 'Don''t forget to visit parents', '2023-04-3 12:00', 5);
insert into ToDoItem values (2, 'Bring wife home', 'Don''t forget to bring wife home', '2023-03-31 19:00', 5);
insert into ToDoItem values (2, 'Go to the park with family', 'Don''t forget to go to the park with family', '2023-04-01 11:30', 4);
insert into ToDoItem values (3, 'Play videogames', 'Don''t forget to play videogames', '2023-03-31 12:30', 1);
insert into ToDoItem values (3, 'Help with building a shelf', 'Don''t forget to help with building a shelf', '2023-04-07 18:30', 3);
insert into ToDoItem values (3, 'Go to pub', 'Don''t forget to go to pub', '2023-04-08 18:30', 3);
insert into ToDoItem values (4, 'Clear the cage', 'Don''t forget to clear the cage', '2023-03-31 22:00', 4);
insert into ToDoItem values (4, 'Feed the pet', 'Don''t forget to feed the pet', '2023-03-31 22:10', 4);
insert into ToDoItem values (4, 'Buy food for pet', 'Don''t forget to buy food for pet', '2023-04-01 09:30', 1);
insert into ToDoItem values (5, 'Whatch the video about asp.net', 'Don''t forget to whatch the video about asp.net', '2023-04-01 12:30', 3);
insert into ToDoItem values (5, 'Create database for to do list', 'Don''t forget to create database for to do list', '2023-04-01 13:30', 4);
insert into ToDoItem values (5, 'Study SQL', 'Don''t forget to study SQL', '2023-04-01 17:30', 2);