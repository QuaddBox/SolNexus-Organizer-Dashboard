/** @format */

import z from "zod";

export const createEventVal = z.object({
	eventTitle: z.string({ required_error: "Title is required" }),
	organizer: z.string({ required_error: "Organizer is required" }),
	category: z.string({ required_error: "Category is required" }),
	description: z.string({ required_error: "Description is required" }),
	eventStarts: z.coerce.date(),
	eventEnds: z.coerce.date(),
});
