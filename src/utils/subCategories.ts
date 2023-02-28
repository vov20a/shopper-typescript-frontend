import { Category } from "../types/data";

export const subCategories = (categories: Category[]) => {
    const result: Category[] = []
    for (let category of categories) {
        if ('categoryParent' in category) {
            result.push(category)
        }
    }
    return result
}
