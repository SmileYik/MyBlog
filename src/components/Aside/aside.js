const asideInfo = (
  <p>现在正在施工中!</p>
);

export default function Aside(props) {
  return (
    <aside id="secondary" className="widget-area" role="complementary" aria-label="博客边栏">
      <AsideSection title={"INFO"}
                    id={"recent-posts-4"}
                    contents={asideInfo}/>
    </aside>
  );
}

function AsideSection(props) {
  return (
    <section className="widget widget_recent_entries">
      <h2 className="widget-title">
        {props.title}
      </h2>
      <div id={props.id}>
        {props.contents}
      </div>
    </section>
  );
}