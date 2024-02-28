interface PageNumberProps {
    pages: number;
    currentPage: number;
}

export default function PageNumber({ currentPage, pages }: PageNumberProps) {
    return (
        <div className="page-number">
            {currentPage}/{pages}
        </div>
    );
}
