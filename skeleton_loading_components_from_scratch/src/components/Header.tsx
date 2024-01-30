import Nav from "./Nav";

type IHeaderProps = {
	currentUserId: number;
	setCurrentUserId: React.Dispatch<React.SetStateAction<number>>
};

const Header = (props:IHeaderProps) =>{
    const { currentUserId, setCurrentUserId } = props;

    return(
        <header>
            <h1>Acme Blog</h1>
            <Nav currentUserId={currentUserId} setCurrentUserId={setCurrentUserId}/>
        </header>
    )
}

export default Header