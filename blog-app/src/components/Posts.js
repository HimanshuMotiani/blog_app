import React from 'react'
import Post from './Post';
import Loader from './Loader';
export default function Posts(props){
  const {articles ,error} = props;
  if(error){
    return <p>{error}</p>
  }
  if(!articles){
    return <Loader/>
  }
  if(articles.length < 1){
    return <h1>No Articles found!</h1>
  }
    return (
        articles.map((article)=>(
                <Post key={article.slug} {...article} key={article.slug} user={props.user}/>
               ) 
        )
    )
}
