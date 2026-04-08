const API_KEY = "pit-290fec06-2375-4a86-8263-c29b92fefaec";

const FIELDS = [
    { name: "Industry", dataType: "TEXT" },
    { name: "Current Bottleneck", dataType: "LARGE_TEXT" },
    { name: "AI Experience Level", dataType: "TEXT" },
    { name: "90-Day Success Vision", dataType: "LARGE_TEXT" },
    { name: "Implementation Timeline", dataType: "TEXT" },
    { name: "Estimated Monthly Budget", dataType: "TEXT" }
];

async function setupV1() {
    console.log("--- GHL V1 Setup Started ---");
    const results = [];

    for (const field of FIELDS) {
        try {
            console.log(`Creating ${field.name}...`);
            const response = await fetch("https://rest.gohighlevel.com/v1/custom-fields/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(field)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`✅ ${field.name}: ${data.id}`);
                results.push({ name: field.name, id: data.id, key: data.fieldKey });
            } else {
                console.error(`❌ Failed: ${data.message || JSON.stringify(data)}`);
            }
        } catch (err) {
            console.error(`💥 Error: ${err.message}`);
        }
    }

    console.log("\n--- SETUP COMPLETE ---");
    console.log(JSON.stringify(results, null, 2));
}

setupV1();
