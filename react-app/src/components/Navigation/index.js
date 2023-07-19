import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<li>
				<NavLink exact to="/">
					<img src='https://cdn.discordapp.com/attachments/1117948168353628201/1118958833050587306/facequote-low-resolution-logo-color-on-transparent-background.png' alt='FaceQuote'/>
				</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
