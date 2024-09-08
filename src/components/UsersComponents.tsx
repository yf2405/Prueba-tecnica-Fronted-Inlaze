'use client'
//import { useUserStore } from '@/app/api/UsersApi';
//import React, { useEffect } from 'react';

/**    
const UsersComponent = () => {
	const { getUsers, users, isLoading, error } = useUserStore();

	useEffect(() => {
		getUsers(); // Llama a la función cuando el componente se monta
	}, []);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h2>Users List:</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};

export default UsersComponent;
*/