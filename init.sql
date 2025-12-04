-- Drop old tables
DROP TABLE Coupon_Use CASCADE CONSTRAINTS;
DROP TABLE Dish_Cook CASCADE CONSTRAINTS;
DROP TABLE Hotel CASCADE CONSTRAINTS;
DROP TABLE Restaurant CASCADE CONSTRAINTS;
DROP TABLE Post_Send CASCADE CONSTRAINTS;
DROP TABLE Review_BelongTo_Write CASCADE CONSTRAINTS;
DROP TABLE Business_LocatedIn CASCADE CONSTRAINTS;
DROP TABLE Achieve CASCADE CONSTRAINTS;
DROP TABLE Follow CASCADE CONSTRAINTS;
DROP TABLE App_User CASCADE CONSTRAINTS;
DROP TABLE Location2 CASCADE CONSTRAINTS;
DROP TABLE Location1 CASCADE CONSTRAINTS;
DROP TABLE Badge CASCADE CONSTRAINTS;


-- Create empty tables
CREATE TABLE Location1 (
    postal_code VARCHAR2(20),
    city VARCHAR2(100) NOT NULL,
    province VARCHAR2(100) NOT NULL,
    country VARCHAR2(100) NOT NULL,
    PRIMARY KEY (postal_code)
);

CREATE TABLE Location2 (
    unit_number INTEGER,
    street_address VARCHAR2(255),
    postal_code VARCHAR2(20),
    PRIMARY KEY (postal_code, street_address, unit_number),
    FOREIGN KEY (postal_code)
    REFERENCES Location1 (postal_code)
    -- ON DETELE NO ACTION
);

CREATE TABLE Business_LocatedIn (
    license_number INTEGER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    rating NUMBER,
    phone_number INTEGER,
    postal_code VARCHAR2(20) NOT NULL,
    street_address VARCHAR2(255) NOT NULL,
    unit_number INTEGER NOT NULL,
    UNIQUE (postal_code, street_address, unit_number),
    FOREIGN KEY (unit_number, street_address, postal_code)
    REFERENCES Location2 (unit_number, street_address, postal_code)
    -- ON UPDATE CASCADE
    -- ON DETELE NO ACTION
);

CREATE TABLE App_User (
    phone_number INTEGER,
    nickname VARCHAR2(100) NOT NULL,
    following_number INTEGER NOT NULL,
    follower_number INTEGER NOT NULL,
    email VARCHAR2(100) NOT NULL,
    userID INTEGER PRIMARY KEY,
    UNIQUE (email),
    CHECK (email LIKE '%@%' AND email LIKE '%_.com')
);

CREATE TABLE Badge (
    badgeID INTEGER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    badge_level INTEGER NOT NULL,
    description VARCHAR2(255),
    UNIQUE (name, badge_level)
);

CREATE TABLE Dish_Cook (
    name VARCHAR2(100),
    price NUMBER,
    dietary_tag VARCHAR2(50),
    license_number INTEGER,
    description VARCHAR2(255),
    PRIMARY KEY (name, license_number),
    FOREIGN KEY (license_number) REFERENCES Business_LocatedIn(license_number)
        ON DELETE CASCADE
        -- ON UPDATE CASCADE
);

CREATE TABLE Hotel (
    star INTEGER,
    license_number INTEGER PRIMARY KEY,
    FOREIGN KEY (license_number) REFERENCES Business_LocatedIn(license_number)
        ON DELETE CASCADE
        -- ON UPDATE CASCADE
);

CREATE TABLE Restaurant (
    cuisine VARCHAR2(100),
    license_number INTEGER PRIMARY KEY,
    FOREIGN KEY (license_number) REFERENCES Business_LocatedIn(license_number)
        ON DELETE CASCADE
        -- ON UPDATE CASCADE
);

CREATE TABLE Post_Send (
    post_date DATE NOT NULL,
    postID INTEGER PRIMARY KEY,
    title VARCHAR2(255),
    text VARCHAR2(4000),
    photo BLOB,
    userID INTEGER NOT NULL,
    FOREIGN KEY (userID) REFERENCES App_User(userID)
        ON DELETE CASCADE
        -- ON UPDATE CASCADE
);

CREATE TABLE Review_BelongTo_Write (
    reviewID INTEGER PRIMARY KEY,
    review_date DATE NOT NULL,
    rating NUMBER NOT NULL,
    text VARCHAR2(4000),
    license_number INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    FOREIGN KEY (license_number) REFERENCES Business_LocatedIn(license_number)
        ON DELETE CASCADE,
        -- ON UPDATE CASCADE
    FOREIGN KEY (userID) REFERENCES App_User(userID)
        ON DELETE CASCADE
        -- ON UPDATE CASCADE
);

CREATE TABLE Coupon_Use (
    couponID INTEGER PRIMARY KEY,
    discount_amount INTEGER NOT NULL,
    expiry_date DATE,
    userID INTEGER,
    license_number INTEGER,
    FOREIGN KEY (userID) REFERENCES App_User(userID)
        ON DELETE SET NULL,
        -- ON UPDATE CASCADE
    FOREIGN KEY (license_number) REFERENCES Business_LocatedIn(license_number)
        ON DELETE SET NULL
        -- ON UPDATE CASCADE
);

CREATE TABLE Achieve (
    badgeID INTEGER,
    userID INTEGER,
    achieve_date DATE,
    PRIMARY KEY (badgeID, userID),
    FOREIGN KEY (badgeID) REFERENCES Badge(badgeID)
        ON DELETE CASCADE,
        -- ON UPDATE CASCADE
    FOREIGN KEY (userID) REFERENCES App_User(userID)
        ON DELETE CASCADE
        -- ON UPDATE CASCADE
);

CREATE TABLE Follow (
    userID1 INTEGER,
    userID2 INTEGER,
    PRIMARY KEY (userID1, userID2),
    FOREIGN KEY (userID1) REFERENCES App_User(userID)
        ON DELETE CASCADE,
        -- ON UPDATE CASCADE
    FOREIGN KEY (userID2) REFERENCES App_User(userID)
        ON DELETE CASCADE
        -- ON UPDATE CASCADE
);



-- Insert default entries
-- Insert Location1
INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('V6T1Z1', 'Vancouver', 'BC', 'Canada');

INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('V6T1Z2', 'Vancouver', 'BC', 'Canada');

INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('V6T1K2', 'Vancouver', 'BC', 'Canada');

INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('V6X1K8', 'Richmond', 'BC', 'Canada');

INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('M5G1Z4', 'Toronto', 'ON', 'Canada');

INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('L5N5V4', 'Mississauga', 'ON', 'Canada');

INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('R3B0Y3', 'Winnipeg', 'MB', 'Canada');

INSERT INTO Location1(postal_code, city, province, country) 
VALUES ('10001', 'New York City', 'NY', 'USA');

-- Insert Location2
INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (1302, '6133 University Boulevard', 'V6T1Z1');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (1000, '5965 Student Union Boulevard', 'V6T1K2');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (1310, '6133 University Boulevard', 'V6T1Z1');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (1010, '2424 Main Mall', 'V6T1Z2');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (1200, '5961 Student Union Boulevard', 'V6T1K2');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (1010, '9351 Bridgeport Road', 'V6X1K8');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (100, '260 West 35th Street', '10001');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (200, '33 Gerrard Street West', 'M5G1Z4');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (300, '2565 Argentia Road', 'L5N5V4');

INSERT INTO Location2(unit_number, street_address, postal_code)
VALUES (400, '2 Lombard Place', 'R3B0Y3');


-- Insert Business_LocatedIn
INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (1, 'Blue Chip Cafe', 4.2, 6048226999, 'V6T1Z1', '6133 University Boulevard', 1302);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (2, 'Tim Hortons', 2.5, 6048220682, 'V6T1K2', '5965 Student Union Boulevard', 1000);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (3, 'Honour Roll Sushi', 3.3, 6048275589, 'V6T1Z1', '6133 University Boulevard', 1310);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (4, 'Tim Hortons', 3.0, 6048221953, 'V6T1Z2', '2424 Main Mall', 1010);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (5, 'West Coast Suites at UBC', 4.3, 6048221000, 'V6T1K2', '5961 Student Union Boulevard', 1200);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (6, 'Chelsea Hotel Toronto', 3.8, 4165951975, 'M5G1Z4', '33 Gerrard Street West', 200);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (7, 'Holiday Inn & Suites Mississauga West', 4.5, 9055422121, 'L5N5V4', '2565 Argentia Road', 300);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (8, 'Fairmont Winnipeg', 4.2, 2049571350, 'R3B0Y3', '2 Lombard Place', 400);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (9, 'Holiday Inn Express Vancouver Airport-Richmond', 4.6, 6048211818, 'V6X1K8', '9351 Bridgeport Road', 1010);

INSERT INTO Business_LocatedIn(license_number, name, rating, phone_number, postal_code, street_address, unit_number)
VALUES (10, 'Liberty Bagels', 4.6, 2122791124, '10001', '260 West 35th Street', 100);

-- Insert Hotel
INSERT INTO Hotel(star, license_number) VALUES (NULL, 5);
INSERT INTO Hotel(star, license_number) VALUES (4, 6);
INSERT INTO Hotel(star, license_number) VALUES (3, 7);
INSERT INTO Hotel(star, license_number) VALUES (5, 8);
INSERT INTO Hotel(star, license_number) VALUES (NULL, 9);

-- Insert Restaurant
INSERT INTO Restaurant(cuisine, license_number) VALUES ('Cafe', 1);
INSERT INTO Restaurant(cuisine, license_number) VALUES ('Cafe', 2);
INSERT INTO Restaurant(cuisine, license_number) VALUES ('Japanese', 3);
INSERT INTO Restaurant(cuisine, license_number) VALUES ('Cafe', 4);
INSERT INTO Restaurant(cuisine, license_number) VALUES ('Western', 10);

-- Insert Dish_Cook
INSERT INTO Dish_Cook(name, price, dietary_tag, license_number, description)
VALUES ('Spaghetti Bolognese', 13.50, 'Meat, Dairy', 10, 'Classic Italian pasta with meat sauce.');

INSERT INTO Dish_Cook(name, price, dietary_tag, license_number, description)
VALUES ('Margherita Pizza', 16.30, 'Vegetarian, Dairy', 10, 'Pizza with tomato, mozzarella, and basil.');

INSERT INTO Dish_Cook(name, price, dietary_tag, license_number, description)
VALUES ('Caesar Salad', 8.50, 'Vegetarian', 1, 'Romaine lettuce with Caesar dressing and croutons.');

INSERT INTO Dish_Cook(name, price, dietary_tag, license_number, description)
VALUES ('California Roll', 8.00, 'Seafood', 3, 'Sushi roll with crab, avocado, and cucumber.');

INSERT INTO Dish_Cook(name, price, dietary_tag, license_number, description)
VALUES ('Farmers Breakfast Wrap', 5.49, 'Meat, Dairy', 2, 'Grilled breakfast wrap filled with choice of sausage, egg, cheese, 
and a hash brown, finished with chipotle sauce');

INSERT INTO Dish_Cook(name, price, dietary_tag, license_number, description)
VALUES ('Cilantro Lime Crispy Chicken Loaded Bowl', 9.99, 'Meat, Dairy', 4, 'Rice bowl with seasoned chicken, brown rice, quinoa,
fresh veggies, and cheese');

-- Insert App_User
INSERT INTO App_User(phone_number, nickname, following_number, follower_number, email, userID)
VALUES (1234567890, 'Amy', 10, 2500, 'a@example.com', 1);

INSERT INTO App_User(phone_number, nickname, following_number, follower_number, email, userID)
VALUES (1234567891, 'Brown', 10, 600, 'b@example.com', 2);

INSERT INTO App_User(phone_number, nickname, following_number, follower_number, email, userID)
VALUES (1234567892, 'Clare', 220, 150, 'c@example.com', 3);

INSERT INTO App_User(phone_number, nickname, following_number, follower_number, email, userID)
VALUES (1234567893, 'Daisy', 50, 120, 'd@example.com', 4);

INSERT INTO App_User(phone_number, nickname, following_number, follower_number, email, userID)
VALUES (1234567894, 'Eva', 120, 18, 'e@example.com', 5);

-- Insert Post_Send (BLOB?)
INSERT INTO Post_Send(post_date, postID, title, text, photo, userID)
VALUES (DATE '2025-10-15', 201, 'Top 10 Must Visit Spots in Vancouver!', 'From Stanley Park to Capilano Suspension Bridge and 
Granville Island, every spot is absolutely stunning!', NULL, 1);

INSERT INTO Post_Send(post_date, postID, title, text, photo, userID)
VALUES (DATE '2025-10-16', 202, '3 Hidden Cafes Near UBC', 'These three cafes are perfect for study sessions and people-watching: 
Hero, Blue chip and JJ Bean!', NULL, 1);

INSERT INTO Post_Send(post_date, postID, title, text, photo, userID)
VALUES (DATE '2025-10-17', 203, 'Best Fall Walks in Vancouver', 'Queen Elizabeth Park and Stanley Park are breathtaking this season 
with colorful leaves. Dont forget to grab some ice cream nearby!', NULL, 2);

INSERT INTO Post_Send(post_date, postID, title, text, photo, userID)
VALUES (DATE '2025-10-18', 204, '3 Hidden Sushi Spots You Have to Try', 'Found these amazing sushi places in Vancouver: Honor roll, 
Sushi bar, Bob sushi!', NULL, 3);

INSERT INTO Post_Send(post_date, postID, title, text, photo, userID)
VALUES (DATE '2025-10-20', 205, 'Top 3 Night Views in Vancouver', '1. Canada Place waterfront. 2. Burrard Bridge. 3. Cypress Mountain 
viewpoint, the city lights are magical!', NULL, 3);

-- Insert Coupon_Use
INSERT INTO Coupon_Use(couponID, discount_amount, expiry_date, userID, license_number)
VALUES (1, 10, DATE '2025-12-31', 2, 5);

INSERT INTO Coupon_Use(couponID, discount_amount, expiry_date, userID, license_number)
VALUES (2, 1, NULL, 3, 1);

INSERT INTO Coupon_Use(couponID, discount_amount, expiry_date, userID, license_number)
VALUES (3, 3, DATE '2025-08-31', 4, 1);

INSERT INTO Coupon_Use(couponID, discount_amount, expiry_date, userID, license_number)
VALUES (4, 3, NULL, 4, 3);

INSERT INTO Coupon_Use(couponID, discount_amount, expiry_date, userID, license_number)
VALUES (5, 1, DATE '2025-10-31', 1, 4);

-- Insert Review_BelongTo_Write
INSERT INTO Review_BelongTo_Write(reviewID, review_date, rating, text, license_number, userID)
VALUES (1, DATE '2025-06-27', 5, 'I had one of the best cookies of my life: the chocolate chip one, it was chewy crunchy and soft 
(still warm from the oven) generous amount of chocolate and absolutely delicious. The only downside was that I didnt have a second 
one. I highly recommend it.', 1, 4);

INSERT INTO Review_BelongTo_Write(reviewID, review_date, rating, text, license_number, userID)
VALUES (2, DATE '2025-07-06', 4, 'The room needs an upgrade (e.g., smart TV, better furniture, and carpet). Service is good, housekeeping 
in particular. The location is excellent if your business is at UBC.', 5, 2);

INSERT INTO Review_BelongTo_Write(reviewID, review_date, rating, text, license_number, userID)
VALUES (3, DATE '2025-07-12', 1, 'The vegetable tempura had RAW flour inside it. I ordered tempura donburi. I had indig afterwards and 
threw up.', 3, 4);

INSERT INTO Review_BelongTo_Write(reviewID, review_date, rating, text, license_number, userID)
VALUES (4, DATE '2025-09-20', 3, '1030am, def not busy. 20 mins for 5 items and coffee.', 2, 1);

INSERT INTO Review_BelongTo_Write(reviewID, review_date, rating, text, license_number, userID)
VALUES (5, DATE '2025-10-03', 4, 'Tried their cinnamon bun and it was surprisingly delicious in taste and texture. Reheated it at home and 
it was extra tasty. Lots of cinnamon flavour but also not too dense and heavy. Also the cookies are great!', 1, 5);

-- Insert Badge
INSERT INTO Badge(badgeID, name, badge_level, description)
VALUES (100, 'Influencer', 1, 'Followed by 100 users. Welcome to the community!');

INSERT INTO Badge(badgeID, name, badge_level, description)
VALUES (200, 'Influencer', 2, 'Followed by 500 users. Your posts and reviews are popular!');

INSERT INTO Badge(badgeID, name, badge_level, description)
VALUES (300, 'Contributor', 1, 'Making 10 posts. The world is hearing your voice!');

INSERT INTO Badge(badgeID, name, badge_level, description)
VALUES (400, 'Contributor', 2, 'Making 100 posts. You are speaking louder!');

INSERT INTO Badge(badgeID, name, badge_level, description)
VALUES (500, 'Connector', 1, 'Following 100 users. Start build your network here!');

INSERT INTO Badge(badgeID, name, badge_level, description)
VALUES (600, 'Connector', 2, 'Following 500 users. Great at connecting with others.');

-- Insert Achieve
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (100, 1, DATE '2025-01-10');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (200, 2, DATE '2025-02-15');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (300, 1, DATE '2025-03-20');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (100, 4, DATE '2025-04-05');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (400, 5, DATE '2025-05-12');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (300, 1, DATE '2025-03-20');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (400, 1, DATE '2025-03-20');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (500, 1, DATE '2025-03-20');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (200, 1, DATE '2025-02-01');
INSERT INTO Achieve(badgeID, userID, achieve_date) VALUES (600, 1, DATE '2025-03-20');


-- Insert Follow
INSERT INTO Follow(userID1, userID2) VALUES (1, 2);
INSERT INTO Follow(userID1, userID2) VALUES (2, 1);
INSERT INTO Follow(userID1, userID2) VALUES (1, 3);
INSERT INTO Follow(userID1, userID2) VALUES (1, 4);
INSERT INTO Follow(userID1, userID2) VALUES (2, 4);