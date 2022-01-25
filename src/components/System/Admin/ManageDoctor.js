import Markdown from 'markdown-to-jsx'
import React from 'react'
import { render } from 'react-dom'

function ManageDoctor() {
    const str = '# Heck Yes\n\nThis is great!'
    return (
        <div>
            render doctor
            <Markdown options={{ wrapper: 'article' }}>{str}</Markdown>
        </div>
    )
}

export default ManageDoctor
