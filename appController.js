const express = require('express');
const appService = require('./appService');

const router = express.Router();

function sendServiceError(res, result, defaultMessage) {
    const status = result?.statusCode || 500;
    res.status(status).json({ success: false, message: result?.message || defaultMessage });
}

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.post("/initiate-tables", async (req, res) => {
    const initiateResult = await appService.runSQLFile();
    if (initiateResult && initiateResult.success) {
        res.json({ success: true, message: initiateResult.message });
    } else {
        sendServiceError(res, initiateResult, 'Failed to initiate tables.');
    }
});

router.get('/insertTable', async (req, res) => {
    const tableContent = await appService.fetchTable('Dish_Cook');
    res.json({data: tableContent});
});

router.get('/updateTable', async (req, res) => {
    const tableContent = await appService.fetchTable('App_User');
    res.json({data: tableContent});
});

router.get('/badgeTable', async (req, res) => {
    const tableContent = await appService.fetchTable('Badge');
    res.json({data: tableContent});
});

router.get('/projectTable', async (req, res) => {
    const tableContent = await appService.fetchTable('Coupon_Use');
    res.json({data: tableContent});
});

router.get('/business_locate', async (req, res) => {
    const tableContent = await appService.fetchTable('Business_LocatedIn');
    res.json({data: tableContent});
});

router.get('/joinTable2', async (req, res) => {
    const tableContent = await appService.fetchTable('Review_BelongTo_Write');
    res.json({data: tableContent});
});

router.get('/aggregateTable2', async (req, res) => {
    const tableContent = await appService.fetchTable('Location1');
    res.json({data: tableContent});
});

router.get('/aggregateTable3', async (req, res) => {
    const tableContent = await appService.fetchTable('Restaurant');
    res.json({data: tableContent});
});

router.get('/groupByHotel', async (req, res) => {
    const tableContent = await appService.fetchTable('Hotel');
    res.json({data: tableContent});
});

router.get('/reviewTable', async (req, res) => {
    const tableContent = await appService.fetchTable('Review_BelongTo_Write');
    res.json({data: tableContent});
});

router.get('/achieveTable', async (req, res) => {
    const tableContent = await appService.fetchTable('Achieve');
    res.json({data: tableContent});
});


router.post("/insert-dish", async (req, res) => {
    const { name, price, dietary_tag, license_number, description } = req.body;
    // console.log("11111111111");

    const insertResult = await appService.insertDish(name, price, dietary_tag, license_number, description);
    // console.log("3333333333333333333333");

    if (insertResult && insertResult.success) {
        res.json({ success: true, message: insertResult.message || 'Data inserted successfully!' });
    } else {
        sendServiceError(res, insertResult, 'Error inserting data.');
    }
});

router.post("/update-email", async (req, res) => {
    const { targetID, newEmail } = req.body;
    const updateResult = await appService.updateEmail(targetID, newEmail);
    if (updateResult && updateResult.success) {
        res.json({ success: true, message: updateResult.message || 'Email updated successfully!' });
    } else {
        sendServiceError(res, updateResult, 'Error updating email.');
    }
});

router.post("/update-phone", async (req, res) => {
    const { targetID, newPhone } = req.body;
    const updateResult = await appService.updatePhone(targetID, newPhone);
    if (updateResult && updateResult.success) {
        res.json({ success: true, message: updateResult.message || 'Phone updated successfully!' });
    } else {
        sendServiceError(res, updateResult, 'Error updating phone.');
    }
});

router.post("/update-nickname", async (req, res) => {
    const { targetID, newNickname } = req.body;
    const updateResult = await appService.updateNickname(targetID, newNickname);
    if (updateResult && updateResult.success) {
        res.json({ success: true, message: updateResult.message || 'Name updated successfully!' });
    } else {
        sendServiceError(res, updateResult, 'Error updating nickname.');
    }
});

router.post("/delete-badge", async (req, res) => {
    const { badgeID } = req.body;
    const deleteResult = await appService.deleteBadge(badgeID);
    if (deleteResult && deleteResult.success) {
        res.json({ success: true, message: deleteResult.message || 'Badge deleted successfully!' });
    } else {
        sendServiceError(res, deleteResult, 'Error deleting badge.');
    }
});

router.post("/project-coupon", async (req, res) => {
    const { attributes } = req.body;
    const projectResult = await appService.projectCoupon(attributes);
    if (projectResult && projectResult.success === false) {
        sendServiceError(res, projectResult, 'Error projecting coupon.');
    } else if (projectResult) {
        res.json({ success: true, data: projectResult, attributes });
    } else {
        sendServiceError(res, null, 'Error projecting coupon.');
    }
});

router.post("/join_reviewForBusiness", async (req, res) => {
    const { license_number } = req.body;
    const joinResult = await appService.joinReviewforBusiness(license_number);
    if (joinResult && joinResult.success === false) {
        sendServiceError(res, joinResult, 'Error joining the table.');
    } else if (joinResult) {
        res.json({ success: true, data: joinResult });
    } else {
        sendServiceError(res, null, 'Error joining the table.');
    }
});

router.post("/groupBy_aggregation", async (req, res) => {
    const aggregateResult = await appService.hotelGroupByStar();
    if (aggregateResult && aggregateResult.success === false) {
        sendServiceError(res, aggregateResult, 'Error finding hotel average rating.');
    } else if (aggregateResult) {
        res.json({ success: true, data: aggregateResult });
    } else {
        sendServiceError(res, null, 'Error finding hotel average rating.');
    }
});

router.post("/having_aggregation", async (req, res) => {
    const aggregateResult = await appService.userHavingManyReviews();
    if (aggregateResult && aggregateResult.success === false) {
        sendServiceError(res, aggregateResult, 'Error finding the target user.');
    } else if (aggregateResult) {
        res.json({ success: true, data: aggregateResult });
    } else {
        sendServiceError(res, null, 'Error finding the target user.');
    }
});

router.post("/nested_aggregation", async (req, res) => {
    const aggregateResult = await appService.cuisineHighAvgRating();
    if (aggregateResult && aggregateResult.success === false) {
        sendServiceError(res, aggregateResult, 'Error finding the target cuisine.');
    } else if (aggregateResult) {
        res.json({ success: true, data: aggregateResult });
    } else {
        sendServiceError(res, null, 'Error finding the target cuisine.');
    }
});

router.post("/division", async (req, res) => {
    const divisionResult = await appService.division();
    if (divisionResult && divisionResult.success === false) {
        sendServiceError(res, divisionResult, 'Error doing the division.');
    } else if (divisionResult) {
        res.json({ success: true, data: divisionResult });
    } else {
        sendServiceError(res, null, 'Error doing the division.');
    }
});

router.post("/selection", async (req, res) => {
    const { conditions } = req.body;
    const selectResult = await appService.selection(conditions);
    if (selectResult && selectResult.success) {
        res.json(selectResult);
    } else {
        sendServiceError(res, selectResult, 'Error doing the selection.');
    }
});





module.exports = router;