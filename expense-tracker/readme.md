## Expense Tracker

Keep track of income and expenses. Add and remove items and save to local storage

## Project Specifications

- Create UI for project
- Display transaction items in DOM
- Show balance, expense and income totals
- Add new transation and reflect in total
- Delete items from DOM
- Persist to local storage

---

## Project HTML

- As a naming convention, add a Class and ID attribute to the HTML tag with same name. Use the Class for CSS styling and ID for Javascript.

---

## Project CSS

- `min-height: 100vh;` allows the body to take the full height of viewport so body stays vertically centered because of flex properties.
- `flex: 1;` Equivalent to flex: 1 0px.
  - It makes the flex item flexible and sets the flex basis to zero, resulting in an item that receives the specified proportion of the remaining space.
  - If all items in the flex container use this pattern,
    their sizes will be proportional to the specified flex factor.
- ` display: inline-block;` allows to set margin and width properties on inline elements without addin a line break
- `.btn:focus;` The `:focus` pseudo class in CSS is used for styling an element
  that is currently targeted by the keyboard, or activated by the mouse.
- An `outline` is a line that is drawn around elements,
  outside the borders, to make the element "stand out". Remove the default outline on buttons in focus using `outline: 0;`
- Position a parent element as `relative` if you want to `absolute` position a child element.

---
