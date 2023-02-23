const Statusbar = ({ heading, company }) => {
  const year = new Date().getFullYear();
  return (
    <main className="absolute inset-x-0 bottom-0 w-full flex items-center bg-light">
      <section className="flex w-full justify-between px:2 md:px-5">
        <article>
          <p className=" text-base font-medium text-menuText">{heading}</p>
        </article>
        <article className="flex gap-1">
          <p className=" text-sm font-medium text-menuText">{company}</p>
          <p className=" text-sm font-medium text-menuText">©{year}</p>
        </article>
      </section>
    </main>
  );
};

export default Statusbar;
