import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { isCompositeComponent } from "react-dom/test-utils";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setOnSearch] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce")
  // const [formData, setFormData] = useState({
  //   name: "",
  //   category: "Produce",
  // });
  const [submittedData, setSubmittedData] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  };

  function onSearchChange(event) {
    setOnSearch(event.target.value)
  };

  function changeNameForm(event) {
    setName(event.target.value)
    console.log(event)
    
    // setFormData({
    //   ...formData,
    //   [event.target.name]: event.target.value
    // })  
  }

  function changeCategoryForm(event) {
    setCategory(event.target.value)
  }

  function onItemFormSubmit(event) {
    event.preventDefault();

    const newFormData = {
      key: event.target.name.value,
      name: event.target.name.value,
      category: event.target.category.value,
    };

    const newDataArray = [...submittedData, newFormData]
    setSubmittedData(newDataArray)

    setName("");
    setCategory("Produce")

    // setFormData({
    //   name: "",
    //   category: "Produce",
    // })
  }

  const itemsToDisplay = submittedData.filter((item) => {
    if ((selectedCategory === "All" && search === "") || (selectedCategory === "All" && item.name.toLowerCase().includes(search.toLowerCase()))) {
      return true
    } else if ((selectedCategory === item.category && search === "") || (selectedCategory === item.category && item.name.toLowerCase().includes(search.toLowerCase()))) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className="ShoppingList">
      <ItemForm name={name} category={category} onItemFormSubmit={onItemFormSubmit} changeNameForm={changeNameForm} changeCategoryForm={changeCategoryForm} />
      <Filter onCategoryChange={handleCategoryChange} search={search} onSearchChange={onSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
