import {Fragment} from "react";
import {MarkdownUtil} from "../../utils/MarkdownUtil";

function ArticleHeaderMedia(props) {
  if (props.background) {
    return (
      <div className="custom-header-media">
        <img src={props.background} alt="background"/>
      </div>
    );
  }
  return <Fragment/>
}

export function ArticleHeaderMetaTime(props) {
  return (
    <span className="posted-on">
      <span>{props.head}</span>
      <a href="#" rel="bookmark">
        <time className={"entry-date" + props.published ? " published" : ""}>
          {new Date(parseInt(props.time)).toLocaleString()}
        </time>
      </a>
    </span>
  );
}

export function ArticleHeaderMetaSwitchTime(props) {
  if (props.meta.modifyTime && props.meta.modifyTime !== '') {
    return (
      <ArticleHeaderMetaTime head={"更新于"} time={props.meta.modifyTime}/>
    );
  } else if (props.meta.postTime && props.meta.postTime !== '') {
    return (
      <ArticleHeaderMetaTime head={"发布于"} time={props.meta.postTime} published={true}/>
    );
  } else {
    return (
      <Fragment/>
    );
  }
}

function ArticleHeaderMeta(props) {
  if (!props.meta) {
    return <Fragment/>;
  }
  return (
    <div className="entry-meta">
      <ArticleHeaderMetaSwitchTime meta={props.meta} />
      <br/>
      <span className="byline">
          由
          <span className="author vcard">
            <a className="url fn n" href="#" id="postAuthor">
              {props.meta.author}
            </a>
          </span>
          编辑
        </span>
    </div>
  );
}

function ArticleHeader(props) {
  return (
    <header className="entry-header">
      <ArticleHeaderMeta meta={props.header.meta}/>
      <h1 className="entry-title">
        {props.header.title}
      </h1>
    </header>
  );
}

function ArticleContent(props) {
  MarkdownUtil.init();
  return MarkdownUtil.render(props.content);
}

export default function Article(props) {
  let hasBackground;
  if (props.background && props.background !== '') {
    hasBackground = "twentyseventeen-panel has-header-image page type-page status-publish hentry";
  } else {
    hasBackground = "twentyseventeen-panel page type-page status-publish hentry";
  }

  return (
    <article className={hasBackground}>
      <ArticleHeaderMedia background={props.background}/>
      <div className="panel-content">
        <div className="wrap">
          <ArticleHeader header={props.header}/>
          <ArticleContent content={props.content}/>
        </div>
      </div>
    </article>
  );
}

export function PostArticle(props) {
  return (
    <article className="post type-post status-publish format-standard hentry category-uncategorized">
      <ArticleHeader header={props.header}/>
      <ArticleContent content={props.content}/>
    </article>
  );
}