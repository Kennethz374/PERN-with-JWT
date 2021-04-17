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
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activity_owner_id uuid REFERENCES babies(baby_id) ON DELETE CASCADE
);

INSERT INTO babies (baby_name, baby_gender, baby_birthday, baby_owner_id)VALUES('Ivan','Male','2020/11/12','85502736-9379-4d0c-aafb-00c2c6d80f5b');

INSERT INTO activities (description, amount,time, activity_owner_id) VALUES('Drink Milk',200, CURRENT_TIMESTAMP, '62c5de89-436e-4caf-9e8f-3f0b509a8ab5');
INSERT INTO activities (description, amount,time, activity_owner_id) VALUES('Poo',null, CURRENT_TIMESTAMP, '233d9c5d-523c-43d3-97f4-4eae97bff9ac');



SELECT baby_name, baby_gender, baby_birthday, user_id, user_name, baby_id, activity_id, description, amount, time 
FROM babies 
INNER JOIN users ON user_id = baby_owner_id
INNER JOIN activities ON baby_id = activity_owner_id 
WHERE user_id = '85502736-9379-4d0c-aafb-00c2c6d80f5b';

SELECT baby_name, baby_gender, baby_birthday, user_name, baby_id FROM babies INNER JOIN users ON user_id = baby_owner_id WHERE user_id = $1

DELETE FROM babies WHERE baby_id = '4634e88b-d2d9-4c0c-aa3f-9af84eec265f';
DELETE FROM babies WHERE baby_id = '18ca1b1b-3abe-4b5f-b445-e9b66ee55ae3';
DELETE FROM babies WHERE baby_id = '99d6a3c2-6e9c-41ba-b2ee-945673e5b317';
DELETE FROM babies WHERE baby_id = '0ca93be2-5a49-4bdf-a826-01d993b199cf';
DELETE FROM babies WHERE baby_id = 'bff8df09-39ad-44bc-900b-fe7ca02b13f1';
DELETE FROM babies WHERE baby_id = 'f207e5e7-75fd-4132-bb91-d171ef52914b';
DELETE FROM babies WHERE baby_id = '735386fc-aad0-4044-bacc-81acee84103c';
DELETE FROM babies WHERE baby_id = 'a8af4bde-82df-4ba8-81fe-97481cadfe20';