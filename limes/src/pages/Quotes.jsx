import React, {useEffect, useState} from 'react';

const Quotes = () => {

    const [page, setPage] = useState("list");
    const [name, setName] = useState("");
    const [quotes, setQuotes] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    let BACKEND_URL = "https://limesback.servers.u1.se"
    if (process.env.REACT_APP_BACKEND){
        BACKEND_URL = process.env.REACT_APP_BACKEND
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const quote = e.target[0].value

        console.log(BACKEND_URL)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                quote: quote,
                name: name
            })
        };

        fetch(BACKEND_URL + "/api/quote", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === "ok") {
                    setName("")   
                    setPage("list")
                }
            });
    }

    useEffect(()=>{
        if (page === "list") {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };

            fetch(BACKEND_URL + "/api/quote", requestOptions)
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

        fetch(BACKEND_URL + "/api/quote", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUpdatePage(!updatePage)
            });
    }

    return (
        <div className="quotes backgroundLimes">
            <div className='topButtons'>
                <button onClick={()=>setPage("list")}>Quotes</button>
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
                        <>
                        <div key={index}>
                            <div>
                                <p className='quote'>"{quote[1]}"</p>
                                <p className='name'>-{quote[0].charAt(0).toUpperCase() + quote[0].slice(1)}</p>
                            </div>
                            <button onClick={()=>setDeleteConfirmation(quote[1])}>X</button>
                        </div>
                        {deleteConfirmation?
                            <div className="deleteConfirmation">
                                <div>
                                    <p>Are you sure you want to delete this quote?</p>
                                    <span>"{deleteConfirmation}"</span>
                                    <div>
                                        <button onClick={()=>{
                                            handleDelete(deleteConfirmation)
                                            setDeleteConfirmation(false)
                                        }} className='btnYes'>Yes</button>
                                        <button onClick={()=>setDeleteConfirmation(false)} className='btnNo'>No</button>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                        </>
         
                    )
                })
                }
                </div>
                :
                name === ""? 
                <div className="box namesBox">
                    <h2>Choose person</h2>
                    <div className='btnContainer'>
                        <button onClick={()=>setName("nils")}>Nils</button>
                        <button onClick={()=>setName("emilie")}>Emilie</button>
                    </div>
                </div>
                :
                <form className='box' onSubmit={handleSubmit}>
                    <label>Quote</label>
                    <input type="text" placeholder="Enter a quote" />
                    <div>
                        <button className='backButton' onClick={()=>setName("")}>Back</button>
                        <button className="submitBtn" type="submit">Submit</button>
                    </div>
                </form>
            }
        </div>
    );
};

export default Quotes;