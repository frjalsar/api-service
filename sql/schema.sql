CREATE TABLE motaskra (
  id serial primary key,
  clubid int default 0,
  status int default 0,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);
