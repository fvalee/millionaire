--liquibase formatted sql
--changeset fvale:001-drop-create
drop table if exists game;
drop table if exists question;

--changeset fvale:001-create-tables
create table question (
    id serial primary key,
    level char,
    text varchar(255) not null,
    option_a varchar(50) not null,
    option_b varchar(50) not null,
    option_c varchar(50) not null,
    option_d varchar(50) not null,
    answer char not null
);

create table game (
    id varchar(36) primary key,
    questions bigint[],
    answered smallint default 0,
    finished boolean default false
);
