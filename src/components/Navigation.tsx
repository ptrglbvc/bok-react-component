import { FunctionComponent } from "react";

interface NavigationProps {
    changePage: (amount: number) => void;
    toggleFullscreen: () => void;
}

const Navigation: FunctionComponent<NavigationProps> = ({
    changePage,
    toggleFullscreen,
}: NavigationProps) => {
    return (
        <div className="navv">
            <div id="nav-menu" onClick={toggleFullscreen}></div>
            <div
                id="page-turn-right"
                onClick={() => {
                    changePage(1);
                }}
            ></div>
            <div
                id="page-turn-left"
                onClick={() => {
                    changePage(-1);
                }}
            ></div>
        </div>
    );
};

export default Navigation;
