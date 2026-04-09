const API_KEY = "pit-290fec06-2375-4a86-8263-c29b92fefaec";
const LOCATION_ID = "4ELb9drEeOiuUsNSEF6N";

async function getCustomFields() {
    try {
        console.log("Fetching custom fields for location:", LOCATION_ID);
        const response = await fetch(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Version': '2021-07-28',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log("Response Status:", response.status);
        if (data.customFields) {
            const meetingTimeField = data.customFields.find(f => f.name.toLowerCase().includes("meeting"));
            console.log("Found Field:", JSON.stringify(meetingTimeField, null, 2));
            console.log("All Fields:", JSON.stringify(data.customFields.map(f => ({ id: f.id, name: f.name })), null, 2));
        } else {
            console.log("No custom fields found or error:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

getCustomFields();
