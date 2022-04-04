import React from "react";
import { Link } from "react-router-dom";
function Post(props) {
  const { author, createdAt, title, description, favoritesCount, slug } = props;

  return (
    <>
      <article className="mb-10">
        <div className="flex my-4 justify-between items-center">
          <div className="flex">
            <div className="mr-2">
              <img className="img-post" src={author.image} />
            </div>
            <div>
              <h5 className="primColor text-sm">{author.username}</h5>
              <h6 className="light-gray text-sm">{createdAt}</h6>
            </div>
          </div>
          <div className="like-btn text-lg">
            <span>
              <i class="fa fa-heart mr-1"></i>
            </span>
            <span>{favoritesCount}</span>
          </div>
        </div>
        <Link to={`/article/${slug}`}>
          <div>
            <h3 className="font-bold text-2xl my-2"> {title}</h3>

            <p>{description}</p>
          </div>
        </Link>
        <div className="flex justify-between mt-4">
          <Link to={`/article/${slug}`}>
            <div>
              <button className="text-sm primColor">Read more</button>
            </div>
          </Link>

          <h6 className="light-gray border border-gray-300 text-xs rounded-lg px-2 py-1">
            database
          </h6>
        </div>
        <hr className="my-5"></hr>
      </article>
    </>
  );
}
export default Post;
