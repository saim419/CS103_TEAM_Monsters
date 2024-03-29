import React,{useState,useEffect} from "react";
import "./styles.css";



function getItemsFromLocalStorage() {
  // getting stored value
  const saved = localStorage.getItem("transactions");
  const initialValue = JSON.parse(saved)||[];
  // relabel the keys from 0 to length-1
  for(let i=0;i<initialValue.length;i++){
    initialValue[i]['key']=i
  }
  return initialValue || [];
}

function testing(){
    console.log("This is a test!")
}


export default function ToDo() {

  let [items, setItems] = useState(getItemsFromLocalStorage);
  let [numKeys,setNumKeys] = useState(() => items.length)
  let [msg,setMsg] = useState('none');

  function add_item() {
    // add an item to the todolist
    const item = document.getElementById("item").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    let newItem = {
      key: numKeys,
      desc: item,
      amount: amount,
      category: category,
      date: date,
      description: description
    };
    document.getElementById("item").value = ""
    setNumKeys(numKeys+1)
    setItems([newItem,...items]); // using the spread operator ...
  }

  function deleteItem(key){
    console.log(key)
    const newItems = items.filter((x)=> x['key']!== key)
    setItems(newItems)
    setNumKeys(numKeys-1)
  }

  function summarizeItems(){
    const newItems = (items.sort((a, b) => a - b))
    setItems(newItems)
  }

  



  useEffect(() => {
    // storing items if items changes value
    localStorage.setItem("transactions", JSON.stringify(items));
  }, [items]);

  // // demo of how to get data from an Express server
  // useEffect(() => {
  //   const getMsg = async () => {
  //     const response = await fetch('http://localhost:3000/test');
  //     const result = await response.json();
  //     setMsg(result);
  //     console.log('msg =',result);
  //   }
  //   getMsg()
  // },[msg])

  // this is used to allow text data to be submitted
  // when the user hits the 'Enter' key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      add_item();
    }
  };

  function toggleCompleted(item){
    item.completed = !item.completed;
    setItems([...items]);  // force redraw of screen
  }


  return (
  <div className="App container">
      <h1 className="bg-warning text-center p-2">Transactions Table</h1>
      {msg}
      <table>
        <tbody>
          <td><button onClick={()=>summarizeItems()}>Sort by Amount</button></td>
          <td><button onClick={()=>summarizeItems()}>Sort by Category</button></td>
          <td><button onClick={()=>summarizeItems()}>Sort by Date</button></td>
          <td><button onClick={()=>summarizeItems()}>Sort by Description</button></td>
        </tbody>
        <tbody>
            {items.map((item) => (
            <tr>       
              <td><button onClick={()=>deleteItem(item["key"])}>X</button></td>
              <td><button onClick={()=>toggleCompleted(item)}>
                {item['completed']?'C':'+'}
                </button></td>
              <td>transactionName: {item["desc"]}, ${item["amount"]}, category: {item["category"]}, 
              date: {item["date"]}, description: {item["description"]}</td>
            </tr>
            ))}
        </tbody>
      </table>


      <h2> add new transaction </h2>
      <input type="text"  
             onKeyDown={handleKeyDown}
             id="item" placeholder="transactionName" />

      <input type="integer"  
             onKeyDown={handleKeyDown}
             id="amount" placeholder="amount" />

      <input type="text"  
             onKeyDown={handleKeyDown}
             id="category" placeholder="category" />

      <input type="text"  
             onKeyDown={handleKeyDown}
             id="date" placeholder="date" />

      <input type="text"  
             onKeyDown={handleKeyDown}
             id="description" placeholder="description" />

      <button onClick={() => add_item()}>add transaction</button>
      
      <h2> DEBUGGING: list of items in JSON </h2>
      <pre>
       {JSON.stringify(items, null, 5)}
      </pre>
    </div>

  );
}
