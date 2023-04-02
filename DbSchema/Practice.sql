--select
select * from Category;
select * from ToDoItem;
select Name, Priority from Category;
select * from Category where id = 3;
select * from Category where Name = 'Pet';
select * from Category where Name = 'Pet' or Name = 'Friends';
select * from Category where Name = 'Pet' and Name = 'Friends';
select * from Category order by Name;
select * from Category order by Name desc;
select count(*) from Category;
select count(*) from ToDoItem;

--update
update Category set Name = 'Sport' where Name = 'Pet';
update Category set Name = 'Pet' where Name = 'Sport';

--delete
delete from Category where id = 5;
delete from ToDoItem where CategoryId = 5;

insert into Category values ('Personal', 1);
insert into ToDoItem values (6, 'Whatch the video about asp.net', 'Don''t forget to whatch the video about asp.net', '2023-04-01 12:30', 3);
insert into ToDoItem values (6, 'Create database for to do list', 'Don''t forget to create database for to do list', '2023-04-01 13:30', 4);
insert into ToDoItem values (6, 'Study SQL', 'Don''t forget to study SQL', '2023-04-01 17:30', 2);

--inner join
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from Category inner join ToDoItem on Category.Id = ToDoItem.CategoryId;
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from ToDoItem inner join Category on ToDoItem.CategoryId = Category.Id;

--left join
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from Category left join ToDoItem on Category.Id = ToDoItem.CategoryId;
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from ToDoItem left join Category on ToDoItem.CategoryId = Category.Id;

--right join
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from Category right join ToDoItem on Category.Id = ToDoItem.CategoryId;
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from ToDoItem right join Category on ToDoItem.CategoryId = Category.Id;

--full outer join
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from Category full outer join ToDoItem on Category.Id = ToDoItem.CategoryId;
select Category.Id, Name, ToDoItem.Priority, Title, Text, FinishDate from ToDoItem full outer join Category on ToDoItem.CategoryId = Category.Id;