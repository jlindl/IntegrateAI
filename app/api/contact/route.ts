import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            firstName, lastName, email, phone, businessName, industry, role, websiteUrl, 
            service, bottleneck, aiExperience, successVision, timeframe, budget 
        } = body;

        const API_KEY = process.env.GHL_API_KEY;
        const LOCATION_ID = process.env.GHL_LOCATION_ID;

        if (!API_KEY || !LOCATION_ID) {
            console.error("GHL configuration missing: GHL_API_KEY or GHL_LOCATION_ID.");
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        // Prepare GHL Payload (V2 API requires locationId)
        const ghlPayload = {
            firstName,
            lastName,
            email,
            phone,
            locationId: LOCATION_ID,
            companyName: businessName,
            website: websiteUrl,
            source: "Integrate Website Form",
            tags: ["Integrate Lead", `Service: ${service}`],
            customFields: [
                { id: "industry", value: industry },
                { id: "current_bottleneck", value: bottleneck },
                { id: "ai_xp_level", value: aiExperience },
                { id: "90dayvision", value: successVision },
                { id: "timeline", value: timeframe },
                { id: "budget", value: budget },
            ]
        };

        // Create a detailed note with the full context
        const noteContent = `
--- INTEGRATE INTAKE SPECS ---
Industry: ${industry}
Role: ${role}
Bottleneck: ${bottleneck}
AI Experience: ${aiExperience}
90-Day Vision: ${successVision}
Timeframe: ${timeframe}
Monthly Budget: ${budget || "Not Specified"}
        `.trim();

        // Use the LeadConnector endpoint (more modern white-labeled GHL API)
        const GHL_ENDPOINT = "https://services.leadconnectorhq.com/contacts/";
        
        // 1. Create/Update Contact
        const contactResponse = await fetch(GHL_ENDPOINT, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "Version": "2021-07-28" // GHL API Versioning header
            },
            body: JSON.stringify(ghlPayload),
        });

        const contactData = await contactResponse.json();

        if (!contactResponse.ok) {
            console.error("GHL Contact Creation Error:", JSON.stringify(contactData, null, 2));
            return NextResponse.json({ 
                error: "Failed to create contact in GHL", 
                details: contactData 
            }, { status: contactResponse.status });
        }

        const contactId = contactData.contact?.id;

        // 2. Add the detailed Note to the contact
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
        console.error("Contact Integration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
