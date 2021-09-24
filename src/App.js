import './App.css';
import OrderForm from "./OrderForm";
import {Divider} from "antd";
import axios from "axios";
import {useState} from "react";

function App() {
    const [link, setLink] = useState(null)
    
    const sendRequest = (data) => {
        axios.post('http://localhost:5000/taxi', data)
            .then(res => {
                console.log('Server Response',res.data)
                setLink(res.data)})
            .catch((err) => console.log(err))
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Taxi booking page</h1>
            </header>
            <div className="container">
                <Divider/>
                <OrderForm sendRequest={sendRequest}/>
                {
                    link && <h2>Your order was submitted,<br/>
                        <a href="https://unbiased.co.uk" target="_blank">check here</a></h2>
                }
            </div>
        </div>
    );
}

export default App;
