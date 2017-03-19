import React from 'react';


class Post extends React.Component{

    render(){
        return (

            <div>
                <a style={{color:'white'}} href={this.props.post.content} target="_blank">
                    <h3>{this.props.post.caption}</h3>
                </a>
                <p style={{fontSize:"20px"}}>Posted on {this.props.post.upload_date.substring(0,10)}</p>

                <br></br>
            </div>

        );
    }


} export default Post;