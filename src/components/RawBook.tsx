export default function RawBook({ content }: any) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
