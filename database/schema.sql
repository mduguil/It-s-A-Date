set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "user" (
  "userId"   serial,
  "name"      text           not null,
  "phoneNumber"    numeric   not null,
  "friendId"     serial      not null,
  "createdAt" timestamptz(6) not null default now(),
  primary key ("userId")
);


create table "contacts" (
  "friendId"   serial,
  "name"      text           not null,
  "phoneNumber"    numeric   not null,
  "createdAt" timestamptz(6) not null default now(),
  primary key ("friendId")
);
