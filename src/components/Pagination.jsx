import { useRef, useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

function PaginatedItems({ itemsPerPage, items, handleNewsToDisplay }) {
    const [isCategoryChanged, setCategory] = useState(false)
    const itemOffset = useRef(0);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        itemOffset.current = (event.selected * itemsPerPage) % items.length;
        const newOffset = itemOffset.current;
        handleNewsToDisplay(items.slice(newOffset, newOffset + itemsPerPage));
    };

    useEffect(() => {
        handlePageClick({selected: itemOffset.current});
        if(!isCategoryChanged && itemOffset.current === 0) {
            setCategory(true);
        }
    }, [items])

    return (
        <>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems;