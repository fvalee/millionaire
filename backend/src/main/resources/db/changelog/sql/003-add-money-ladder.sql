--liquibase formatted sql
--changeset fvale:003-drop-create
drop table if exists money_ladder;

--changeset fvale:003-create-table
create table money_ladder (
    id integer primary key,
    value varchar(20) not null
);

--changeset fvale:003-populate-money-ladder
insert into money_ladder(id, value) values (1, '€100');
insert into money_ladder(id, value) values (2, '€200');
insert into money_ladder(id, value) values (3, '€300');
insert into money_ladder(id, value) values (4, '€500');
insert into money_ladder(id, value) values (5, '€1,000');
insert into money_ladder(id, value) values (6, '€2,000');
insert into money_ladder(id, value) values (7, '€4,000');
insert into money_ladder(id, value) values (8, '€8,000');
insert into money_ladder(id, value) values (9, '€16,000');
insert into money_ladder(id, value) values (10, '€32,000');
insert into money_ladder(id, value) values (11, '€64,000');
insert into money_ladder(id, value) values (12, '€125,000');
insert into money_ladder(id, value) values (13, '€250,000');
insert into money_ladder(id, value) values (14, '€500,000');
insert into money_ladder(id, value) values (15, '€1,000,000');
