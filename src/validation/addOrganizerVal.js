import z from 'zod'

export const addEventVal = z.object({
    organizerName: z.string({required_error: "Organizer name is required"}).min(1, {message: "Organizer name is required"}),
    organizerBio: z.string({required_error: "Organizer bio is required"}).min(1, {message: "Organizer bio is required"}),

})