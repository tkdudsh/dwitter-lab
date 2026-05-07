import React from 'react';

export default function Article({ children, style }) {
    return (
        <article className={style}>
            {children}
        </article>
    );
}

