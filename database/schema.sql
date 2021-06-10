set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "users" (
  "userId"         serial,
  "name"           text           not null,
  "phoneNumber"    numeric        not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId")
);

create table "contacts" (
  "contactId"    serial,
  "userId"      integer        not null,
  "name"        text           not null,
  "phoneNumber" numeric        not null,
  "createdAt"   timestamptz(6) not null default now(),
  primary key ("contactId"),
  foreign key ("userId")
    references "users" ("userId")
);

create table "dates" (
  "dateId"     serial,
  "location"   text           not null,
  "day"        text           not null,
  "time"       text           not null,
  "activity"   text           not null,
  "userId"     integer        not null,
  "invites"    text           not null,
  "notes"      text,
  "createdAt"  timestamptz(6) not null default now(),
  primary key ("dateId"),
  foreign key ("userId")
    references "users" ("userId")
);
