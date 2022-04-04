import React from "react";
import {tagsURL} from '../utils/constants';
import Loader from './Loader';
export default class Tags extends React.Component {
  state = {
    tags: null,
    error: "",
  };
  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({tags}) => {
        this.setState({ tags,error:'' });
      })
      .catch((err) => {
        this.setState({
          error: "Not able to fetch tags",
        });
      });
  }

  render() {
      const {tags,error} =this.state
      if(!tags){
          return <Loader/>
      }
      if(error){
        return <p>{error}</p>
      }
    return (
        <aside className="sidebar">
            <h3 className="font-bold text-xl my-4">Popular Tags</h3>
            <div className="flex flex-wrap">
                {tags.map(tag=>(
                    <span key={tag} onClick={()=>this.props.addTab(tag)} className="tags cursor-pointer hover:bg-gray-300">{tag}</span>
                ))}
            </div>
            

        </aside>
    );
  }
}
