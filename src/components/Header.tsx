import React from 'react'

interface HeaderProps {
    title: string;
}

const Header = (props: HeaderProps) => <header>
    <h1>{props.title}</h1>
</header>;

export default Header;