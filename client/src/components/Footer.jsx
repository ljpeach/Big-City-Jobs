import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const collaborators = [
	{ name: 'Haiden', link: 'https://github.com/ArsonistChoir' },
	{ name: 'Kevin', link: 'https://github.com/kevinpatto' },
	{ name: 'Liam', link: 'https://github.com/ljpeach' },
	{ name: 'Omar', link: 'https://github.com/omes773' },
];

const Footer = () => {
	return (
		<footer className="d-flex justify-content-center py-1 mt-auto text-body-secondary smaller-text">
			<span className="px-2">
				Visit our GitHubs:
			</span>
			<div className="d-flex justify-content-center">
				{collaborators.map((collaborator, i) => (
					<a href={collaborator.link} key={i} className="link-secondary px-1">{collaborator.name}</a>
				))}
			</div>
		</footer>
	);
}

export default Footer;