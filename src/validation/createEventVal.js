/** @format */

import z from "zod";

export const createEventVal = z.object({
    eventTitle: z.string({required_error: "Title is required"}).trim().min(3),
    organizer: z.string({required_error: "Organizer is required"}).trim().min(3),
    description: z.string({required_error: "Organizer is required"}).trim().min(20,{message:"Your description should atlest be 20 characters long"}),
    category: z.string({required_error: "Category is required"}).trim().min(3),
    venue: z.string({required_error: "please add event venue"}).trim().min(3),
    tickets: z.number({
        required_error: "tickets is required",
        invalid_type_error: "number of tickets must be a number",
    }).gte(1,{message:"your event should have atleast one ticket"}),
    pricePerTicket: z.number({
        required_error: "tickets is required",
        invalid_type_error: "price of tickets must be a number",
    }).gte(0.1,{message:"ticket price should be greater than 0 SOL"}),
    eventStarts: z.coerce.date(),
    eventEnds: z.coerce.date()
    
})