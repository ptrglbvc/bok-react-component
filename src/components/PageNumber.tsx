interface PageNumberProps {
    pages: number;
    currentPage: number;
}

export default function PageNumber({ currentPage, pages }: PageNumberProps) {
    return (
        <div className="page-number">
            {/* we want it to start at page one, hence the +1. Its much easier to just write it here instead of
        fidding with + 1 and -1 logic in the rest of the app */}
            {currentPage + 1}/{pages}
        </div>
    );
}
