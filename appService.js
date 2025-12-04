const fs = require('fs');
const path = require('path');
const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}



// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch((err) => {
        return { success: false, message: err.message, statusCode: 500 };
    });
}

async function runSQLFile() {
    try {
        const filePath = path.join(__dirname, 'init.sql');
        const sql = fs.readFileSync(filePath, 'utf8');
        const commands = sql.split(";").map(c => c.trim()).filter(c => c.length > 0);

        let hasErrors = false;
        let lastError = null;
        let errorMessages = [];

        await withOracleDB(async (connection) => {
            for (const command of commands) {
                if (!command || command.length === 0) {
                    continue;
                }
                
                try {
                    await connection.execute(command);
                } catch (err) {
                    console.error("runSQLFile() failed:", err);
                }
            }
            await connection.commit();
        });

        if (hasErrors && lastError) {
            const errorMsg = errorMessages.join('\n');
            throw new Error(`SQL execution failed:\n${errorMsg}`);
        }

        console.log("init.sql executed successfully");
        return { success: true, message: "Database reset successfully." };
    } catch (err) {
        console.error("runSQLFile() failed:", err);
        return { success: false, message: err.message || 'Failed to execute SQL file' };
    }
}

async function fetchTable(table) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM ${table}`
        );
        return result.rows;
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function insertDish(name, price, dietary_tag, license_number, description) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Dish_Cook (name, price, dietary_tag, license_number, description) 
            VALUES (:name, :price, :dietary_tag, :license_number, :description)`,
            [name, price, dietary_tag, license_number, description],
            { autoCommit: true }
        );

        if (result.rowsAffected && result.rowsAffected > 0) {
            return { success: true, message: 'Data inserted successfully!' };
        }
        return { success: false, message: 'Insert failed - no rows affected.' };
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function updateEmail(userID, newEmail) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE App_User SET email=:newEmail WHERE userID=:userID`,
            [newEmail, userID],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return { success: false, message: 'User not found.' };
        } else {
            return { success: true };
        }
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function updatePhone(userID, newPhone) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE App_User SET phone_number=:newPhone WHERE userID=:userID`,
            [newPhone, userID],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return { success: false, message: 'User not found.' };
        } else {
            return { success: true };
        }
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function updateNickname(userID, newNickname) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE App_User SET nickname=:newNickname WHERE userID=:userID`,
            [newNickname, userID],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return { success: false, message: 'User not found.' };
        } else {
            return { success: true };
        }
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

// CASCADE-on-delete from Achieve
async function deleteBadge(badgeID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Badge WHERE badgeID=:badgeID`,
            [badgeID],
            { autoCommit: true }
        );

        if (result.rowsAffected > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Badge not found.' };
        }
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function selection(conditions) {
    return await withOracleDB(async (connection) => {
        let sql = "SELECT * FROM Badge";
        let binds = {};
        let whereClauses = [];
        
        conditions.forEach((cond, index) => {
            const bindName = `val${index}`;
            if (index === 0) {
                whereClauses.push(`${cond.attribute} = :${bindName}`);
            } else {
                const logic = cond.logical || 'AND'; 
                whereClauses.push(`${logic} ${cond.attribute} = :${bindName}`);
            }
            binds[bindName] = cond.value;
        });

        if (whereClauses.length > 0) {
            sql += " WHERE " + whereClauses.join(" ");
        }
        const result = await connection.execute(sql, binds);

        if (result.rows.length > 0) {
            return { success: true, data: result.rows, message: `Returned ${result.rows.length} matching badge record(s).` };
        } else {
            return { success: false, message: 'No matching badges found.', statusCode: 404 };
        }
    }).catch((err) => {
        return { success: false, message: err.message, statusCode: 500 };
    });
}

async function projectCoupon(attributes) {
    return await withOracleDB(async (connection) => {
        const attrList = attributes.join(", "); // attributes is ["couponID", "userID", "license_number"];
        const result = await connection.execute(`SELECT ${attrList} FROM Coupon_Use`);
        return result.rows;
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function joinReviewforBusiness(license_number) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT b.license_number, name, review_date, r.rating, text
            FROM Business_LocatedIn b, Review_BelongTo_Write r
            WHERE b.license_number = r.license_number AND b.license_number = :license_number`,
            [license_number]
        );
        
        if (result.rows.length > 0) {
            return result.rows;
        } else {
            return { success: false, message: 'Invalid license number for review, please try again' };
        }
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function hotelGroupByStar() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT star, AVG(rating)
            FROM Business_LocatedIn NATURAL JOIN Hotel
            GROUP BY star`
        );
        return result.rows;
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function userHavingManyReviews() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT userID, COUNT(*)
            FROM Review_BelongTo_Write
            GROUP BY userID
            HAVING COUNT(*) > 1
            ORDER BY COUNT(*) DESC`
        );
        return result.rows;
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function cuisineHighAvgRating() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT cuisine, AVG(rating)
            FROM Business_LocatedIn NATURAL JOIN Restaurant NATURAL JOIN Location1
            WHERE city = 'Vancouver' AND province = 'BC'
            GROUP BY cuisine
            HAVING AVG(rating) > (SELECT AVG(rating) 
                                  FROM Business_LocatedIn NATURAL JOIN Restaurant NATURAL JOIN Location1
                                  WHERE city = 'Vancouver' AND province = 'BC')`
        );
        return result.rows;
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

async function division() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT DISTINCT userID
            FROM Achieve a1
            WHERE NOT EXISTS (
                   (SELECT badgeID FROM Badge)
                   MINUS
                   (SELECT badgeID
                   FROM Achieve a2
                   WHERE a1.userID = a2.userID))`
        );
        return result.rows;
    }).catch((err) => {
        return { success: false, message: err.message };
    });
}

module.exports = {
    initializeConnectionPool,
    closePoolAndExit,
    withOracleDB,
    testOracleConnection,
    runSQLFile,
    fetchTable,
    insertDish, 
    updateEmail,
    updatePhone,
    updateNickname,
    deleteBadge,
    selection,
    projectCoupon,
    joinReviewforBusiness,
    hotelGroupByStar,
    userHavingManyReviews,
    cuisineHighAvgRating,
    division
};