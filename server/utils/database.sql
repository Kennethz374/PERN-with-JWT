CREATE DATABASE BabyActivityTracker;


--set extention
create extension if not exists "uuid-oosp";
----

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE babies(
    baby_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    baby_name VARCHAR(255) NOT NULL,
    baby_gender VARCHAR(6),
    baby_birthday DATE,
    baby_owner_id uuid REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE activities(
    activity_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(255) NOT NULL,
    amount SMALLINT,
    time TIMESTAMP NOT NULL,
    activity_owner_id uuid REFERENCES babies(baby_id) ON DELETE CASCADE
);

INSERT INTO babies VALUES('233d9c5d-523c-43d3-97f4-4eae97bff9ac','Alvis','Male','2020/11/12','85502736-9379-4d0c-aafb-00c2c6d80f5b');