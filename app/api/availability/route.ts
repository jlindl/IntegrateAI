import { NextResponse } from "next/server";

const MEETING_TIME_FIELD_ID = "RopC36hE7tR8LC3JSFHZ";
const LOCATION_ID = "4ELb9drEeOiuUsNSEF6N";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const startDateTimestamp = searchParams.get("startDate");
        if (!startDateTimestamp) {
            return NextResponse.json({ error: "Missing startDate" }, { status: 400 });
        }

        // Use the middle of the day (noon) to ensure date calculations remain stable regardless of timezone shifts
        const date = new Date(parseInt(startDateTimestamp) + 12 * 60 * 60 * 1000);
        const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD

        const API_KEY = process.env.GHL_API_KEY;
        if (!API_KEY) {
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        // 1. Generate Standard Slots (8 AM - 7 PM, 30 min intervals)
        const standardSlots: string[] = [];
        const currentSlot = new Date(date);
        currentSlot.setHours(8, 0, 0, 0);
        
        const endSlot = new Date(date);
        endSlot.setHours(19, 0, 0, 0);

        while (currentSlot <= endSlot) {
            standardSlots.push(currentSlot.toISOString());
            currentSlot.setMinutes(currentSlot.getMinutes() + 30);
        }

        // 2. Fetch Contacts with existing bookings
        // We fetch the most recent contacts to find busy slots
        const ghlResponse = await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${LOCATION_ID}&limit=100`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Version": "2021-07-28",
                "Accept": "application/json"
            }
        });

        const ghlData = await ghlResponse.json();
        
        if (!ghlResponse.ok) {
            console.error("GHL Contact Fetch Error:", JSON.stringify(ghlData, null, 2));
            return NextResponse.json({ error: "GHL Sync Error" }, { status: 500 });
        }

        // 3. Extract occupied timestamps from contacts
        const occupiedTimestamps = new Set<number>();
        if (ghlData.contacts) {
            ghlData.contacts.forEach((contact: any) => {
                const meetingField = contact.customFields?.find((f: any) => f.id === MEETING_TIME_FIELD_ID);
                if (meetingField && meetingField.value) {
                    try {
                        const occupiedDate = new Date(meetingField.value);
                        // Normalize to minute to avoid millisecond mismatches
                        occupiedDate.setSeconds(0, 0);
                        occupiedTimestamps.add(occupiedDate.getTime());
                    } catch (e) {
                        // Ignore invalid dates
                    }
                }
            });
        }

        // 4. Filter slots
        const availableSlots = standardSlots.filter(slot => {
            const slotDate = new Date(slot);
            slotDate.setSeconds(0, 0);
            return !occupiedTimestamps.has(slotDate.getTime());
        });

        // 5. Return in the same format the UI expects: { "YYYY-MM-DD": { slots: [...] } }
        return NextResponse.json({
            [dateString]: {
                slots: availableSlots
            }
        });

    } catch (error) {
        console.error("Availability Logic Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
