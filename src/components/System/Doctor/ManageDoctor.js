import Markdown from "markdown-to-jsx"
import React from "react"
import { render } from "react-dom"
import { Link, useNavigate, Outlet } from "react-router-dom"

function ManageDoctor() {
    const str = "# Heck Yes\n\nThis is great!"
    return (
        <div>
            <Link
                to='/system/create-doctor'
                // state={{ specialtyId: item.value }}
                className='btn btn-link'
            >
                Sửa
            </Link>
            {/* render doctor
            <Markdown options={{ wrapper: "article" }}>{str}</Markdown> */}
            <Outlet />
        </div>
    )
}

export default ManageDoctor
