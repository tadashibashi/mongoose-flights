/**
 * Deletes any field that is an empty string, allows for defaults to trigger in Schemas
 * Trims all strings
 * @param body req.body
 */
export function cleanseBody(body: any) {
    const keys = Object.getOwnPropertyNames(body);

    keys.forEach(key => {
        const val = body[key] as unknown;
        if (typeof val !== "string") return;

        if (val === "")
            delete body[key];

        body[key] = val.trim();
    });
}
