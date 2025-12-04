/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}


async function sendPost(url, payload = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        let data;
        try {
            data = await response.json();
        } catch (error) {
            data = { success: false, message: 'Invalid JSON response from server.' };
        }

        return { ok: response.ok, data };
    } catch (error) {
        return { ok: false, data: { success: false, message: error.message || 'Request failed.' } };
    }
}


// Tables from sql
async function fetchInsert() {
    const tableElement = document.getElementById('tableDisplay');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/insertTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const insertContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    insertContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchUpdate() {
    const tableElement = document.getElementById('tableDisplay');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/updateTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const updateContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    updateContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchDelete() {
    const tableElement = document.getElementById('tableDisplay');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/badgeTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const updateContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    updateContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchJoin() {
    fetchJoinOriginal1();
    fetchJoinOriginal2();
}

async function fetchJoinOriginal1() {
    const tableElement = document.getElementById('originalTable1');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/business_locate', {
        method: 'GET'
    });

    const responseData = await response.json();
    const updateContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    updateContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchJoinOriginal2() {
    const tableElement = document.getElementById('originalTable2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/joinTable2', {
        method: 'GET'
    });

    const responseData = await response.json();
    const updateContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    updateContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchProjection() {
    const tableElement = document.getElementById('tableDisplay');
    if (!tableElement) return;
    
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/projectTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const projectContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (projectContent) {
        projectContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

async function fetchGroupBy() {
    fetchGroupOriginal1();
    fetchGroupOriginal2();
}

async function fetchGroupOriginal1() {
    const businessTable = document.getElementById('businessOriginal');
    if (!businessTable) return;
    
    const tableBody = businessTable.querySelector('tbody');

    const response = await fetch('/business_locate', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

async function fetchGroupOriginal2() {
    const hotelTable = document.getElementById('hotelOriginal');
    if (!hotelTable) return;
    
    const tableBody = hotelTable.querySelector('tbody');

    const response = await fetch('/groupByHotel', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}


async function fetchHaving() {
    const reviewTable = document.getElementById('havingTable');
    if (!reviewTable) return;
    
    const tableBody = reviewTable.querySelector('tbody');

    const response = await fetch('/reviewTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

async function fetchAggregation() {
    fecthAggregationOriginal1();
    fecthAggregationOriginal2();
    fecthAggregationOriginal3();
}

async function fecthAggregationOriginal1() {
    const businessTable = document.getElementById('businessTable');
    if (!businessTable) return;
    
    const tableBody = businessTable.querySelector('tbody');

    const response = await fetch('/business_locate', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

async function fecthAggregationOriginal2() {
    const locationTable = document.getElementById('locationTable');
    if (!locationTable) return;
    
    const tableBody = locationTable.querySelector('tbody');

    const response = await fetch('/aggregateTable2', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

async function fecthAggregationOriginal3() {
    const restaurantTable = document.getElementById('restaurantTable');
    if (!restaurantTable) return;
    
    const tableBody = restaurantTable.querySelector('tbody');

    const response = await fetch('/aggregateTable3', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

async function fetchDivision() {
    const achieveTable = document.getElementById('achieveTable');
    if (!achieveTable) return;
    
    const tableBody = achieveTable.querySelector('tbody');

    const response = await fetch('/achieveTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

async function fetchSelection() {
    const badgeTable = document.getElementById('badgeTable');
    if (!badgeTable) return;
    
    const tableBody = badgeTable.querySelector('tbody');

    const response = await fetch('/badgeTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const groupContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (groupContent) {
        groupContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

function createConditionRow(isFirst = false) {
    const row = document.createElement('div');
    row.className = 'condition-row';
    row.style.marginBottom = '10px';

    const logicWrapper = document.createElement('span');
    logicWrapper.className = 'logic-wrapper';
    const logicSelect = document.createElement('select');
    logicSelect.className = 'condition-logic';
    ['AND', 'OR'].forEach((logic) => {
        const option = document.createElement('option');
        option.value = logic;
        option.textContent = logic;
        logicSelect.appendChild(option);
    });
    logicWrapper.appendChild(logicSelect);
    row.appendChild(logicWrapper);

    const attributeSelect = document.createElement('select');
    attributeSelect.className = 'condition-attribute';
    attributeSelect.name = 'attributes';
    ['badgeID', 'name', 'badge_level', 'description'].forEach((attribute) => {
        const option = document.createElement('option');
        option.value = attribute;
        option.textContent = attribute;
        attributeSelect.appendChild(option);
    });
    row.appendChild(attributeSelect);

    const equalSpan = document.createElement('span');
    equalSpan.textContent = ' = ';
    equalSpan.style.margin = '0 5px';
    row.appendChild(equalSpan);

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className = 'condition-value';
    valueInput.placeholder = 'Enter the value you want to select.';
    valueInput.maxLength = 50;
    valueInput.required = true;
    row.appendChild(valueInput);

    if (isFirst) {
        logicWrapper.style.visibility = 'hidden';
    }

    return row;
}

function refreshConditionRows(container) {
    const rows = container ? container.querySelectorAll('.condition-row') : [];
    rows.forEach((row, index) => {
        const logicWrapper = row.querySelector('.logic-wrapper');
        if (logicWrapper) {
            logicWrapper.style.visibility = index === 0 ? 'hidden' : 'visible';
        }
    });
}

function setupSelectionForm() {
    const container = document.getElementById('conditionsContainer');
    const addBtn = document.getElementById('addConditionBtn');
    if (!container || !addBtn) {
        return;
    }

    if (container.children.length === 0) {
        container.appendChild(createConditionRow(true));
    }
    refreshConditionRows(container);

    addBtn.addEventListener('click', () => {
        container.appendChild(createConditionRow(container.children.length === 0));
        refreshConditionRows(container);
    });
}

// Tables for results
async function fetchProjectionResults(responseData) {
    const tableElement = document.getElementById('resultTableDisplay');
    if (!tableElement) return;
    
    const tableBody = tableElement.querySelector('tbody');
    const tableHead = tableElement.querySelector('thead tr');

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (tableHead && responseData && Array.isArray(responseData.attributes)) {
        tableHead.innerHTML = '';
        responseData.attributes.forEach(attr => {
            const th = document.createElement('th');
            th.textContent = attr;
            tableHead.appendChild(th);
        });
    }

    if (responseData && Array.isArray(responseData.data) && responseData.data.length > 0) {
        responseData.data.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        const columnCount = tableHead ? tableHead.children.length || 1 : 1;
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = columnCount;
        cell.textContent = responseData?.message || 'No results to display.';
    }
}

async function fetchResults(responseData) {
    const tableElement = document.getElementById('resultTableDisplay');
    if (!tableElement) return;
    
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    const columnCount = tableElement.querySelectorAll('thead th').length || 1;
    const hasData = responseData && Array.isArray(responseData.data) && responseData.data.length > 0;

    if (hasData) {
        responseData.data.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = columnCount;
        cell.textContent = responseData?.message || 'No results to display.';
    }
}


async function resetAllTables() {
    const { ok, data } = await sendPost("/initiate-tables", {});
    const messageElement = document.getElementById('resetResultMsg');

    if (ok && data.success) {
        messageElement.textContent = data.message || "Dataset initiated successfully!";
    } else {
        messageElement.textContent = data?.message || "Error initiating table!";
    }
}

async function insertDish(event) {
    event.preventDefault();

    const name_value = document.getElementById('insertName').value;
    const price_value = document.getElementById('insertPrice').value;
    const dietary_value = document.getElementById('insertDietaryTag').value;
    const license_value = document.getElementById('insertLicenseNumber').value;
    const description_value = document.getElementById('insertDescription').value;

    const response = await fetch('/insert-dish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name_value,
            price: price_value,
            dietary_tag: dietary_value,
            license_number: license_value,
            description: description_value
        })
    });

    // const data = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error("JSON parse error:", error);
        console.error("Response status:", response.status);
        console.error("Response text:", await response.text());
        messageElement.textContent = `Server error: ${response.status} - Unable to parse response`;
        return;
    }

    if (data.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData("insert");
    } else {
        messageElement.textContent = data.message || "Error inserting data!";
    }
}

async function updateEmail(event) {
    event.preventDefault();

    const targetValue = document.getElementById('updateEmailTargetUserId').value;
    const newEmailValue = document.getElementById('updateNewEmail').value;

    const response = await fetch('/update-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetID: targetValue,
            newEmail: newEmailValue
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('updateResultMsg3');

    if (data.success) {
        messageElement.textContent = data.message || "Email updated successfully!";
        fetchTableData("update");
    } else {
        messageElement.textContent = data.message || "Error updating email!";
    }
}

async function updatePhone(event) {
    event.preventDefault();

    const targetValue = document.getElementById('updatePhoneTargetUserId').value;
    const newPhoneValue = document.getElementById('updateNewPhoneNumber').value;

    const response = await fetch('/update-phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetID: targetValue,
            newPhone: newPhoneValue
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('updateResultMsg1');

    if (data.success) {
        messageElement.textContent = data.message || "Phone updated successfully!";
        fetchTableData("update");
    } else {
        messageElement.textContent = data.message || "Error updating phone!";
    }
}

async function updateNickname(event) {
    event.preventDefault();

    const targetValue = document.getElementById('updateNicknameTargetUserId').value;
    const newNicknameValue = document.getElementById('updateNewNickname').value;

    const response = await fetch('/update-nickname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetID: targetValue,
            newNickname: newNicknameValue
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('updateResultMsg2');

    if (data.success) {
        messageElement.textContent = data.message || "Name updated successfully!";
        fetchTableData("update");
    } else {
        messageElement.textContent = data.message || "Error updating nickname!";
    }
}

async function deleteBadge(event) {
    event.preventDefault();

    const badgeID = document.getElementById('deleteBadgeID').value;

    const response = await fetch('/delete-badge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            badgeID: badgeID,
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('deleteBadgeMsg');

    if (data.success) {
        messageElement.textContent = data.message || "Badge Deleted successfully!";
        fetchTableData("delete");
    } else {
        messageElement.textContent = data.message || "Error deleting badge!";
    }
}

async function projectCoupon(event) {
    event.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="attribute"]:checked');
    const attributes = [];

    for (let i = 0; i < checkboxes.length; i++) {
        attributes.push(checkboxes[i].value);
    }

    const messageElement = document.getElementById('projectCouponMsg');

    if (attributes.length === 0) {
        messageElement.textContent = "Select at least one attribute.";
        return;
    }

    const response = await fetch('/project-coupon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attributes: attributes,
        })
    });

    const data = await response.json();

    if (data.success) {
        messageElement.textContent = data.message || "Coupon projection completed successfully!";
        fetchProjectionResults(data);
    } else {
        messageElement.textContent = data.message || "Error projecting coupon!";
    }
}

async function joinReviewforBusiness(event) {
    event.preventDefault();

    const license_number = document.getElementById('joinLicenseNumber').value;

    const response = await fetch('/join_reviewForBusiness', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            license_number: license_number,
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('joinMsg');

    if (data.success) {
        messageElement.textContent = data.message || "Review and Business join completed successfully with target license number!";
        fetchResults(data);
    } else {
        messageElement.textContent = data.message || "Error joining the table!";
    }
}


async function groupByAggregation(event) {
    event.preventDefault();

    const response = await fetch('/groupBy_aggregation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('groupByMsg');

    if (data.success) {
        messageElement.textContent = data.message || "Aggregation completed:Hotel average rating group by star!";
        fetchResults(data);
    } else {
        messageElement.textContent = data.message || "Error finding hotel average rating!";
    }
}

async function havingAggregation(event) {
    event.preventDefault();

    const response = await fetch('/having_aggregation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('havingMsg');

    if (data.success) {
        messageElement.textContent = data.message || "Aggregation completed: Users who have written at least 2 reviews!";
        fetchResults(data);
    } else {
        messageElement.textContent = data.message || "Error finding the target user!";
    }
}


async function aggregation(event) {
    event.preventDefault();

    const response = await fetch('/nested_aggregation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('aggregationMsg');

    if (data.success) {
        messageElement.textContent = data.message || "Aggregation completed: Found cuisines in Vancouver with higher than average ratings!";
        fetchResults(data);
    } else {
        messageElement.textContent = data.message || "Error finding the target cuisine!";
    }
}

async function division(event) {
    event.preventDefault();

    const response = await fetch('/division', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
    });

    const data = await response.json();
    const messageElement = document.getElementById('divisionMsg');

    if (data.success) {
        messageElement.textContent = data.message || "Division completed!";
        fetchResults(data);
    } else {
        messageElement.textContent = data.message || "Error doing the division!";
    }
}

async function selection(event) {
    event.preventDefault();

    const messageElement = document.getElementById('selectResultMsg');
    const container = document.getElementById('conditionsContainer');
    if (!container) {
        messageElement.textContent = "Selection form is not ready.";
        return;
    }

    const rows = container.querySelectorAll('.condition-row');
    const conditions = [];

    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        const attribute = row.querySelector('.condition-attribute')?.value;
        const logical = i === 0 ? null : row.querySelector('.condition-logic')?.value;
        const valueInput = row.querySelector('.condition-value');
        const value = valueInput ? valueInput.value.trim() : '';

        if (!value) {
            messageElement.textContent = "Please enter a value for each condition.";
            return;
        }

        conditions.push({
            attribute,
            operator: '=',
            value,
            logical
        });
    }

    const { ok, data } = await sendPost('/selection', { conditions });

    if (ok && data.success) {
        messageElement.textContent = data.message || "Selection completed!";
    } else {
        messageElement.textContent = data?.message || "Error doing the selection!";
    }

    fetchResults(data);
}





// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();

    const resetButton = document.getElementById("resetAllTables");
    if (resetButton) {
        resetButton.addEventListener("click", resetAllTables);
    }

    const page = document.body.id;

    switch (page) {
        case "insertPage":
            fetchInsert();
            break;
        case "updatePage":
            fetchUpdate();
            break;
        case "deletePage":
            fetchDelete();
            break;
        case "projectPage":
            fetchProjection();
            break;
        case "joinPage":
            fetchJoin();
            break;
        case "groupByPage":
            fetchGroupBy();
            break;
        case "havingPage":
            fetchHaving();
            break;
        case "aggregationPage":
            fetchAggregation();
            break;
        case "divisionPage":
            fetchDivision();
            break;
        case "selectionPage":
            fetchSelection();
            setupSelectionForm();
            break;
    }

    const insertTable = document.getElementById("insertTable");
    if (insertTable) insertTable.addEventListener("submit", insertDish);
    
    const updatePhoneForm = document.getElementById("updatePhoneForm");
    if (updatePhoneForm) updatePhoneForm.addEventListener("submit", updatePhone);
    
    const updateNicknameForm = document.getElementById("updateNicknameForm");
    if (updateNicknameForm) updateNicknameForm.addEventListener("submit", updateNickname);
    
    const updateEmailForm = document.getElementById("updateEmailForm");
    if (updateEmailForm) updateEmailForm.addEventListener("submit", updateEmail);
    
    const deleteReviewForm = document.getElementById("deleteReviewForm");
    if (deleteReviewForm) deleteReviewForm.addEventListener("submit", deleteBadge);
    
    const projectForm = document.getElementById("projectForm");
    if (projectForm) projectForm.addEventListener("submit", projectCoupon);
    
    const joinTable = document.getElementById("joinTable");
    if (joinTable) joinTable.addEventListener("submit", joinReviewforBusiness);
    
    const groupByAggregationForm = document.getElementById("groupByAggregationForm");
    if (groupByAggregationForm) groupByAggregationForm.addEventListener("submit", groupByAggregation);
    
    const havingAggregationForm = document.getElementById("havingAggregationForm");
    if (havingAggregationForm) havingAggregationForm.addEventListener("submit", havingAggregation);
    
    const aggregationForm = document.getElementById("aggregationForm");
    if (aggregationForm) aggregationForm.addEventListener("submit", aggregation);
    
    const divisionForm = document.getElementById("divisionForm");
    if (divisionForm) divisionForm.addEventListener("submit", division);
    
    const selectionForm = document.getElementById("selectTable");
    if (selectionForm) selectionForm.addEventListener("submit", selection);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData(type) {
    switch (type) {
        case "insert":
            fetchInsert();
            break;
        case "update":
            fetchUpdate();
            break;
        case "delete":
            fetchDelete();
            break;
        default:
            break;
    }
}
