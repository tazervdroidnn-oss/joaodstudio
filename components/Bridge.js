// Ponte de texto entre duas seções: conecta a ideia anterior com a próxima.
// Use <em> nas palavras que devem ganhar destaque colorido e marca-texto.
export default function Bridge({ n, label, acc = "c", children }) {
  return (
    <section className={`bridge acc-${acc}`} aria-label={label}>
      <div className="wrap">
        <span className="bridge-tag">{n} · {label}</span>
        <p className="bridge-txt" data-bridge>{children}</p>
      </div>
      <i className="thread" data-thread aria-hidden="true" />
    </section>
  );
}
