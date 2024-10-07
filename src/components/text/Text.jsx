import React from 'react'

// eslint-disable-next-line react/prop-types
function Text({ title, size = 'md', weight = 'semibold', color, style = {} }) {
    return (
        <div className={`text-${size} flex justify-center font-${weight} ${color}`} style={style}>
            <p className='flex items-center gap-2'>{title}</p>
        </div>
    )
}

export default Text