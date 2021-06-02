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
  "notes"      text,
  "createdAt"  timestamptz(6) not null default now(),
  primary key ("dateId")
);

create table "dateList" (
  "userId" smallint not null,
  "contactId" smallint not null,
  "dateId" smallint not null,
  "updatedAt" timestamp with time zone DEFAULT now() not null
)
