
export default function PdfPage({ src, title }) {
  return (
    <iframe
      src={src}
      title={title}
      className="portfolio-pdf"
    />
  );
}

