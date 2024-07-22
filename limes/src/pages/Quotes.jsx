import React, {useEffect, useState} from 'react';

const Quotes = () => {

    const [page, setPage] = useState("list");
    const [name, setName] = useState("");
    const [quotes, setQuotes] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const quote = e.target[0].value

        console.log(process.env.REACT_APP_BACKEND)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                quote: quote,
                name: name
            })
        };

        fetch(process.env.REACT_APP_BACKEND + "/api/quote", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === "ok") {
                    setName("")   
                }
            });
    }

    useEffect(()=>{
        if (page === "list") {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };

            fetch(process.env.REACT_APP_BACKEND + "/api/quote", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setQuotes(data.quotes)
                });
        }

    }, [page, updatePage])

    const handleDelete = (quote) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                quote: quote,
            })
        };

        fetch(process.env.REACT_APP_BACKEND + "/api/quote", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUpdatePage(!updatePage)
            });
    }

    return (
        <div className="quotes">
            <div className='topButtons'>
                <button onClick={()=>setPage("list")}>List</button>
                <button onClick={()=>setPage("add")}>Add</button>
            </div>
            {
                page === "list"?
                (quotes.length === 0) ? 
                    <h1>Loading quotes...</h1>
                :
                <div className="quoteList">
                {
                quotes.map((quote, index) => {
                    return (
                        <div key={index} className="quote">
                            <div>
                                <p className='quote'>{quote[1]}</p>
                                <p className='name'>{quote[0]}</p>
                            </div>
                            <button onClick={()=>handleDelete(quote[1])}>Delete</button>
                        </div>
                    )
                })
                }
                </div>
                :
                name === ""? 
                <div className="box namesBox">
                    <button onClick={()=>setName("nils")}>Nils</button>
                    <button onClick={()=>setName("emilie")}>Emilie</button>
                </div>
                :
                <form className='box' onSubmit={handleSubmit}>
                    <label>Quote</label>
                    <input type="text" placeholder="Enter a quote" />
                    <div>
                        <button className='backButton' onClick={()=>setName("")}>back</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            }
        </div>
    );
};

export default Quotes;