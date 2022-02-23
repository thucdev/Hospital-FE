import React from "react"
import PropTypes from "prop-types"
import { Pagination } from "react-bootstrap"

const PaginationDoctor = (props) => {
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
      <div className='pagin-doctor'>
         <Pagination>
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page < 1} />
            {pageNumber?.map((item, index) => {
               return (
                  <Pagination.Item
                     key={item}
                     onClick={() => handlePageChange(item)}
                     className={page === index ? "active" : ""}
                  >
                     {item + 1}
                  </Pagination.Item>
               )
            })}

            <Pagination.Next
               onClick={() => handlePageChange(page + 1)}
               disabled={page >= totalPages - 1}
            />
         </Pagination>
      </div>
   )
}

PaginationDoctor.propTypes = {
   pagination: PropTypes.object.isRequired,
   onPageChange: PropTypes.func,
}

PaginationDoctor.defaultProps = {
   onPageChange: null,
}

export default PaginationDoctor
