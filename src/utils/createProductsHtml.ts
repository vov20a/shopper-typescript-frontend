
import { CartProduct } from "../types/data";

export const createProductsHtmlUl = (items: CartProduct[]) => {
  const parts = [];
  for (const item of items) {
    parts.push(`<li>${item.title}, price:${item.price}P ,count:${item.count}ps</li>`);
  }
  const innerValue = parts.join(' ');
  return `<ul>${innerValue}</ul>`;
};

export const createProductsHtmlTable = (items: CartProduct[], totalPrice: number) => {
  const parts = [];
  let totalCount = 0;
  for (const item of items) {
    if (item?.count) totalCount += item?.count;
    parts.push(`<tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.title}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.color}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.size}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.count}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.price}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.price * (item?.count ? item.count : 1)}</td>
    </tr>`);
  }
  const innerValue = parts.join(' ');
  return `
    <table style="border: 1px solid #ddd; border-collapse: collapse; width: 100%;"}>
      <thead>
        <tr style="background: #f9f9f9;">
          <th style="padding: 8px; border: 1px solid #ddd;">Наименование</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Цвет</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Размер,см</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Кол-во,шт</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Цена,Р</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Сумма,Р</th>
        </tr>
      </thead>
      <tbody>
      ${innerValue}
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Итого:</td>
          <td></td>
          <td></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${totalCount}</td>
          <td></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${totalPrice}</td>
        </tr>
      </tbody>
    </table>`;
};
