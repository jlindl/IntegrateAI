import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { contactId, meetingTime, friendlyTime } = body;

        if (!contactId || !meetingTime) {
            return NextResponse.json({ error: "Missing contactId or meetingTime" }, { status: 400 });
        }

        const API_KEY = process.env.GHL_API_KEY;
        const LOCATION_ID = process.env.GHL_LOCATION_ID;
        const CALENDAR_ID = process.env.GHL_CALENDAR_ID;

        if (!API_KEY || !LOCATION_ID || !CALENDAR_ID) {
            console.error("GHL configuration missing.");
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        const GHL_BASE_URL = "https://services.leadconnectorhq.com/";
        const MEETING_TIME_FIELD_ID = "RopC36hE7tR8LC3JSFHZ";
        
        // Use ISO string for the custom field
        const start = new Date(meetingTime);
        const isoString = start.toISOString();
        
        // 1. Update Contact 'Meeting time' Custom Field & Add Tags
        const contactResponse = await fetch(`${GHL_BASE_URL}contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "Version": "2021-07-28"
            },
            body: JSON.stringify({
                customFields: [{ id: MEETING_TIME_FIELD_ID, value: isoString }],
                tags: ["meeting booked"]
            }),
        });

        const contactData = await contactResponse.json();

        // 2. Add Note for redundancy
        const noteContent = `📅 MEETING BOOKED\nTime: ${friendlyTime || start.toLocaleString()}\nISO: ${isoString}`;
        
        await fetch(`${GHL_BASE_URL}contacts/${contactId}/notes`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "Version": "2021-07-28"
            },
            body: JSON.stringify({ body: noteContent }),
        });

        if (!contactResponse.ok) {
            console.error("GHL Contact Update Error (Status " + contactResponse.status + "):", JSON.stringify(contactData, null, 2));
            return NextResponse.json({ 
                error: "Failed to update contact meeting time.", 
                details: contactData,
                status: contactResponse.status
            }, { status: contactResponse.status });
        }

        return NextResponse.json({ success: true, data: contactData });

    } catch (error) {
        console.error("Booking Integration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
