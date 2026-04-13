import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            firstName, lastName, email, phone, companyName, referralGoals 
        } = body;

        const API_KEY = process.env.GHL_API_KEY;
        const LOCATION_ID = process.env.GHL_LOCATION_ID;

        if (!API_KEY || !LOCATION_ID) {
            console.error("GHL configuration missing: GHL_API_KEY or GHL_LOCATION_ID.");
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        // Prepare GHL Payload
        // Using 'partner' tag to trigger the Smart List segmentation
        const ghlPayload = {
            firstName,
            lastName,
            email,
            phone,
            locationId: LOCATION_ID,
            companyName: companyName,
            source: "Integrate Partner Portal",
            tags: ["Integrate Partner", "Integrate Network"],
            customFields: [
                { id: "referral_goals", value: referralGoals },
            ]
        };

        const noteContent = `
--- INTEGRATE PARTNER APPLICATION ---
Company: ${companyName}
Goal Breakdown: ${referralGoals}
        `.trim();

        const GHL_ENDPOINT = "https://services.leadconnectorhq.com/contacts/";
        
        // 1. Create/Update Contact
        const contactResponse = await fetch(GHL_ENDPOINT, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "Version": "2021-07-28"
            },
            body: JSON.stringify(ghlPayload),
        });

        const contactData = await contactResponse.json();

        if (!contactResponse.ok) {
            console.error("GHL Partner Creation Error:", JSON.stringify(contactData, null, 2));
            return NextResponse.json({ 
                error: "Failed to create partner contact in GHL", 
                details: contactData 
            }, { status: contactResponse.status });
        }

        const contactId = contactData.contact?.id;

        // 2. Add detailed Note
        if (contactId) {
            await fetch(`${GHL_ENDPOINT}${contactId}/notes`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "Version": "2021-07-28"
                },
                body: JSON.stringify({ body: noteContent }),
            });
        }

        return NextResponse.json({ success: true, contactId });

    } catch (error) {
        console.error("Partner Integration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
