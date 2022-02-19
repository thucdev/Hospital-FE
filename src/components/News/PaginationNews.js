import React from "react"
import PropTypes from "prop-types"
import { Pagination } from "react-bootstrap"

const PaginationNews = (props) => {
   const { pagination, onPageChange } = props
   const { page, limit, total } = pagination
   const totalPages = Math.ceil(total / limit)
   console.log("totalPages", totalPages)

   const pageNumber = []
   for (let i = 0; i < totalPages; i++) {
      pageNumber.push(i)
   }
   console.log("page", page)
   const handlePageChange = (newPage) => {
      if (onPageChange) {
         onPageChange(newPage)
      }
   }
   return (
      <div>
         <Pagination>
            {/* <Pagination.First /> */}
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page < 1} />
            {pageNumber?.map((item) => {
               return (
                  <Pagination.Item key={item} onClick={() => handlePageChange(item)}>
                     {item + 1}
                  </Pagination.Item>
               )
            })}
            {/* <Pagination.Ellipsis /> */}
            {/*
            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item> */}
            <Pagination.Next
               onClick={() => handlePageChange(page + 1)}
               disabled={page >= totalPages - 1}
            />
            {/* <Pagination.Last /> */}
         </Pagination>

         {/* <div aria-label='...'>
            <ul class='pagination pagination-lg'>
               {pageNumber?.map((item) => {
                  return (
                     <li class='page-item '>
                        <a
                           class='page-link'
                           href='#'
                           tabindex='-1'
                           onClick={() => handlePageChange(item)}
                        >
                           {item}
                        </a>
                     </li>
                  )
               })}
            </ul> */}
         {/* </div> */}
      </div>
   )
}

PaginationNews.propTypes = {
   pagination: PropTypes.object.isRequired,
   onPageChange: PropTypes.func,
}

PaginationNews.defaultProps = {
   onPageChange: null,
}

export default PaginationNews
