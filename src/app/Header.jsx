import { useEffect, useState } from "react"

export const Header = () => {
    
    const [version, setVersion] = useState()

    useEffect(() => {
        fetch('./version.txt').then((response) => response.text()).then(setVersion);
    }, [])

    return(version && version.length <= 7 &&
        <p>v{version}</p>
    )
}