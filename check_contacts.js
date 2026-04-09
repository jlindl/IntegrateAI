const API_KEY = "pit-290fec06-2375-4a86-8263-c29b92fefaec";
const LOCATION_ID = "4ELb9drEeOiuUsNSEF6N";
const FIELD_ID = "RopC36hE7tR8LC3JSFHZ";

async function getContacts() {
    try {
        console.log("Fetching contacts...");
        const response = await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${LOCATION_ID}&limit=50`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Version': '2021-07-28',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log("Response Status:", response.status);
        if (data.contacts) {
            const booked = data.contacts
                .filter(c => c.customFields && c.customFields.find(f => f.id === FIELD_ID))
                .map(c => ({
                    name: `${c.firstName} ${c.lastName}`,
                    meeting_time: c.customFields.find(f => f.id === FIELD_ID).value
                }));
            console.log("Booked Contacts:", JSON.stringify(booked, null, 2));
        } else {
            console.log("No contacts found:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

getContacts();
