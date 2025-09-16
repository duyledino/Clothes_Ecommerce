import {file, z} from 'zod'

export const tryAuth = z.object({
    file: z.file({message:'File is missing'}),
    image:z.string({message: 'Image Product is missing'})
})