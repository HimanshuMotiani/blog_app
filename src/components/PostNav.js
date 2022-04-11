import React from 'react'
import {Link} from 'react-router-dom'
export default class PostNav extends React.Component{
    constructor(props){
        super()
    }
    render(){
        return (
            <>
            <nav>
                <ul className="posts-nav">
                    <li className="active-nav">
                        <Link onClick={this.props.emptyTab} className={this.props.activeTab === '' && "active-Tab"} to="/">
                        Global Feed
                        </Link>
                    </li>
                    {this.props.activeTab && (<li className="active-nav">
                        <Link className={this.props.activeTab && "active-Tab"} to="/">
                        #{this.props.activeTab}
                        </Link>
                    </li>)}
                    
                </ul>
            </nav>
            </>
        )
    }
}