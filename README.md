# Business Discovery Rating Platform

A CPSC 304 (Database Systems) project at UBC for discovering and rating restaurants and hotels. Members write reviews and posts, follow each other, earn badges and use coupons. The app is a Node.js/Express server backed by an Oracle SQL database, with a plain HTML front end that demonstrates the SQL operations covered in the course.

**Live demo:** https://scintillating-gaufre-45efe5.netlify.app

## What it does

Each page in `public/` is built around one database operation. The starter page links to all of them.

| Page | Operation | What you can do |
| --- | --- | --- |
| Insert | `INSERT` | Add a dish to `Dish_Cook` for a business |
| Update | `UPDATE` | Change a user's phone number, nickname or email in `App_User` |
| Delete | `DELETE` | Remove a badge from `Badge` (earned badges in `Achieve` are removed by cascade) |
| Select | `SELECT ... WHERE` | Search badges by one or more conditions joined with `AND` / `OR` |
| Project | Projection | Pick which columns of `Coupon_Use` to display |
| Join | `JOIN` | Show a business together with its reviews, by license number |
| Group By | `GROUP BY` | Average business rating for each hotel star class |
| Having | `GROUP BY ... HAVING` | Users who have written at least two reviews |
| Aggregate | Nested aggregation | Vancouver cuisines rated above the Vancouver restaurant average |
| Division | Relational division | Users who have earned every badge |

The database also enforces its rules, and the pages show the resulting errors:
- A dish must belong to an existing business (foreign key on `license_number`).
- A dish name can only appear once per business (primary key on `name, license_number`).
- User emails must be unique, contain `@` and end in `.com` (check constraint).

## Tech stack

- **Server:** Node.js, Express 4
- **Database:** Oracle, through the `oracledb` driver with a small connection pool
- **Front end:** static HTML, CSS and vanilla JavaScript, served from `public/`

## Project structure

```
.
├── server.js            Express app: serves public/ and mounts the routes
├── appController.js     HTTP routes (GET table views, POST operations)
├── appService.js        Oracle connection pool and all SQL queries
├── init.sql             Drops, creates and seeds every table
├── public/              Front end
│   ├── starter.html     Landing page with connection status and Reset
│   ├── insert.html, update.html, delete.html, select.html, projection.html,
│   │   join.html, groupBy.html, having.html, aggregate.html, division.html
│   ├── scripts.js       Fetch calls and DOM updates for every page
│   └── styles.css
├── utils/envUtil.js     Reads the .env file
├── scripts/             Helpers for running locally (mac/ and win/)
├── remote-start.sh      Starts the app on the UBC undergrad server
└── .env                 Database credentials and port
```

## Database

`init.sql` recreates 13 tables and fills them with sample data:

- **Places:** `Location1` (postal code, city, province, country), `Location2` (street address and unit)
- **Businesses:** `Business_LocatedIn`, specialised into `Restaurant` (cuisine) and `Hotel` (star rating), plus `Dish_Cook` (menu items)
- **People:** `App_User`, `Follow`, `Post_Send`
- **Engagement:** `Review_BelongTo_Write`, `Coupon_Use`, `Badge`, `Achieve`

Deleting a business removes its dishes, reviews and hotel or restaurant record. Deleting a user removes their posts, reviews and badges.

## API

All routes are in `appController.js`.

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/check-db-connection` | Reports whether the database is reachable |
| `POST` | `/initiate-tables` | Runs `init.sql` to reset the database |
| `GET` | `/insertTable`, `/updateTable`, `/badgeTable`, `/projectTable`, `/business_locate`, `/joinTable2`, `/reviewTable`, `/achieveTable`, `/aggregateTable2`, `/aggregateTable3`, `/groupByHotel` | Return the rows of a table for display |
| `POST` | `/insert-dish` | Insert a dish |
| `POST` | `/update-email`, `/update-phone`, `/update-nickname` | Update a user |
| `POST` | `/delete-badge` | Delete a badge |
| `POST` | `/selection` | Select badges by conditions |
| `POST` | `/project-coupon` | Project chosen coupon columns |
| `POST` | `/join_reviewForBusiness` | Join a business with its reviews |
| `POST` | `/groupBy_aggregation`, `/having_aggregation`, `/nested_aggregation`, `/division` | Run the aggregate and division queries |

## Course

Built for CPSC 304, Introduction to Relational Databases, at the University of British Columbia. The starting template is the course's Node.js sample project.
