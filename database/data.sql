insert into "users" ("name", "phoneNumber")
values ('User1', '1234567890');

insert into "contacts" ("name", "phoneNumber", "userId")
values ('Friend1', '1234456789', 1),
       ('Friend2', '2234567890', 1);

insert into "dates" ("location", "day", "time", "activity", "notes")
values ('5258 Riverside Dr, Chino, CA 91710, United States', '12 6 2021', '15:30', 'Hiking', 'Bring lots of water!');

insert into "dates" ("location", "day", "time", "activity")
values ('5258 Riverside Dr, Chino, CA 91710, United States', '12 6 2021', '15:30', 'Eating');
