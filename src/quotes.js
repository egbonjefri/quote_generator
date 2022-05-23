import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './materialize.css'
import './index.css'
import ReactLoading from 'react-loading'
import { Icon } from '@iconify/react';


const Loading = ({ type, color }) => (
    <ReactLoading type={'spin'} color={'black'} />
);


export default function Quotes() {

const [loading, setLoading] = useState(false);
const [posts, setPosts] = useState([]);
const [count, setCount] = useState(0);
let href = `https://twitter.com/intent/tweet?text=`

useEffect(() => {
    const quoteBody = document.getElementsByClassName('quotes')[0];
    const myBtn = document.getElementsByClassName('myBtn')[0];

    const docBody = document.getElementsByTagName('html')[0];

    quoteBody.classList.add('animate');
    setTimeout(() => {
        quoteBody.classList.remove('animate');

    const loadPost = async () => {

        let color = '#'
        let array1 = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
        for (let i =0; i<6;i++) {
            color+=array1[Math.floor(Math.random(i)*16)]
        }

        docBody.style.backgroundColor = color;
        myBtn.style.backgroundColor = color;



        quoteBody.style.color = color;
        // Till the data is fetch using API 
        // the Loading page will show.
        setLoading(true);

        // Await make wait until that 
        // promise settles and return its result
        const response = await axios.get(
          'https://stoic-server.herokuapp.com/random');

        // After fetching data stored it in posts state.
        setPosts(response.data);

        // Closed the loading page
        setLoading(false);
    }
loadPost();
      }, 1000);
    // Call the function
  
}, [count]);
// eslint-disable-next-line
posts.map((item) => {
    href+= encodeURIComponent('"' + item.body + '"- ' + item.author)
})
return (
  <>
      <div className="quotes">
          {loading ? (
              <div className='loading'>
              <Loading />
              </div>) :
              (posts.map((item) =>
              <div className='quote-text'>
                  <h4 key={item.id}><i className="quote-start material-icons">format_quote</i>{item.body}</h4>
                   <p><i className="author-icon material-icons">remove</i>{item.author}</p>
                  <p><b>{item.quotesource}</b></p>
                  </div>)
              )
          }
          <a 
  href={href}><Icon className='twit' icon="akar-icons:twitter-fill" /></a>
          <a href='https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F'><Icon className='fb' icon="akar-icons:facebook-fill" /></a>


          <button className='btn myBtn' onClick={() => setCount(count + 1)}>New quote</button>
      </div>
  </>
)
        }