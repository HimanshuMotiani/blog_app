import React from "react";
export default function Pagination(props) {
  let { articlesCount, articlesPerPage,activePageIndex,updateCurrentPageIndex } = props;
  let numOfPages = Math.ceil(articlesCount / articlesPerPage);
  let pagesArr = [];
  for (let i = 1; i <= numOfPages; i++) {
    pagesArr.push(i);
  }
  return (
    <>
      <div className="flex justify-center items-center flex-wrap flex-col">
        <div className="text-xl mb-1">
          <p onClick={()=>updateCurrentPageIndex(activePageIndex - 1 < 1 ? 1: activePageIndex - 1)}>Prev</p>
        </div>
        <div className="pagination-count">
            {pagesArr.map(page=>(
                <span onClick={()=>updateCurrentPageIndex(page)} className={ activePageIndex === page ? "activePage pages":"pages"}>{page}</span>
            ))}
        </div>
        <div className="text-xl mt-1">
          <p onClick={()=>updateCurrentPageIndex(activePageIndex + 1 > numOfPages ? numOfPages :activePageIndex + 1)}>Next</p>
        </div>
      </div>
    </>
  );
}
