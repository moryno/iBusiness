const Statusbar = () => {
  const year = new Date().getFullYear();
  return (
    <main className="sticky top-auto  w-full flex items-center bg-bgLight">
      <section className="flex w-full justify-between px-5">
        <article>
          <p className=" text-sm font-medium text-menu">Booking List</p>
        </article>
        <article className="flex gap-1">
          <p className=" text-sm font-medium text-menu">ARBS Customer Portal</p>
          <p className=" text-sm font-medium text-menu">©{year}</p>
        </article>
      </section>
    </main>
  );
};

export default Statusbar;
