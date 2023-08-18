import React from 'react';

export const DbContext = React.createContext(null);

export const DbContextProvider = ({ value, children }) => {

	return (
		<DbContext.Provider value={value} displayName={"CalendarContext"}>
			{children}
		</DbContext.Provider>
	);
};