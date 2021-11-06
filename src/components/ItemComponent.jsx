import React from 'react'

function ItemComponent({ item }) {
    return (
        <div style={{
            background: item.color,
            opacity: item.opacity,
            width: '100%',
            height: '100%'
        }} />
    )
}

export default ItemComponent
