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

INSERT INTO activities (description, amount,time, activity_owner_id) VALUES('Drink Milk',200, CURRENT_TIMESTAMP, '62c5de89-436e-4caf-9e8f-3f0b509a8ab5');
INSERT INTO activities (description, amount,time, activity_owner_id) VALUES('Poo',null, CURRENT_TIMESTAMP, '233d9c5d-523c-43d3-97f4-4eae97bff9ac');



SELECT baby_name, baby_gender, baby_birthday, user_id, user_name, baby_id, activity_id, description, amount, time 
FROM babies 
INNER JOIN users ON user_id = baby_owner_id
INNER JOIN activities ON baby_id = activity_owner_id 
WHERE user_id = '85502736-9379-4d0c-aafb-00c2c6d80f5b';

SELECT baby_name, baby_gender, baby_birthday, user_name, baby_id FROM babies INNER JOIN users ON user_id = baby_owner_id WHERE user_id = $1
