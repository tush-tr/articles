import React, { useState } from 'react'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { toast } from 'react-toastify';

const Tags = () => {

    const [tags, setTags] = useState([]);

    const handleChange = (tags) => {
        if (tags.length > 3) {
            toast("Only three tags are allowed");
            return;
        }
        setTags(tags)
    }

    return (
        <div className="tags-container">
            <TagsInput className="tag" value={tags} onChange={handleChange} />
            {/* <div className="tag">Tag</div> */}
        </div>
    )
}

export default Tags
