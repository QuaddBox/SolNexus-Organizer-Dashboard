import z from 'zod'

export const addEventVal = z.object({
    name: z.string({required_error: "Organizer name is required"}).min(1, {message: "Organizer name is required"}),
    website: z.string().optional(),
    bio: z.string({required_error: "Organizer bio is required"}).min(20, {message: "Organizer bio should atleast be 20 characters long"}),
})