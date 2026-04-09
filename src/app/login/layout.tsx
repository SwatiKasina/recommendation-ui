export default function SwatiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <h1>Swati Layout</h1>
      <div
        style={{
          //padding: "1px",
          padding: "20px",
          border: "solid 2px black",
          margin: "50px, solid black",
          backgroundColor: "pink",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
