
import { Category, FoundMenu, FirstMenu, SecondMenu } from "../types/data";




export const createItems = (menu: Category[]) => {
    let categories: Category[] = [];
    //клонированиe массивов и объектов является преобразование данных в строку, а за тем обратное преобразование в объект с помощью JSON
    categories = JSON.parse(JSON.stringify(menu))

    const items: FoundMenu = {
        nodes: [],
    };
    const temps: SecondMenu[] = []

    categories.map((category: Category) => {
        if (!('categoryParent' in category)) {
            items.nodes.push(category);
        } else {
            temps.push(category);
        }
        return items;
    });

    temps.map((temp: Category) => {
        if (temp.categoryParent && temp.categoryParent.length > 0) {
            items.nodes.map((item: FirstMenu) => {
                if (item._id === temp.categoryParent) {
                    if (item.nodes) item.nodes.push(temp);
                }
                return item;
            })
        }
        return items;
    });
    return items;
}

