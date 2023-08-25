import React from 'react';

export const DbContext = React.createContext(null);

export const DbContextProvider = ({ value, status, children }) => {

	return (
		<DbContext.Provider value={[value, status]} displayName={"CalendarContext"}>
			{children}
		</DbContext.Provider>
	);
};