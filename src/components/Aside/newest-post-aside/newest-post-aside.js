import {blogs} from "../../../utils/siteInfo";
import jQuery from "jquery";
import "./newest-post-aside.css"

function getTag(rawTags) {
  let tags = [];
  for (let index in rawTags) {
    if (rawTags[index] !== "") {
      tags.push(rawTags[index]);
    }
  }
  return tags;
}

export default function NewestPostAside(props) {
  const blog = blogs[props.bid];
  const respond = jQuery.ajax({
    url: blog.getNewestPost(),
    async: false,
  });
  const posts = JSON.parse(respond.responseText);

  return (
    <aside id="secondary"
           className="widget-area"
           role="complementary"
           aria-label="博客边栏">
      <section id="recent-posts-4" className="widget widget_recent_entries">
        <h2 className="widget-title">
          最新文章
        </h2>
        <div id="recent-posts-4">
          <ul>
          {
            posts.map((post) => {
              return (
                <li key={post.id}>
                  <a href={props.bid + "/album/" + post.album + "/" + post.id}>
                    {post.title}
                  </a>
                  <span className="post-date">
                    {new Date(parseInt(post.modifyTime ? post.modifyTime : post.postTime)).toLocaleString()}
                  </span>
                  <span className="itemTags">{getTag(post.tag.split(",")).map((tag) => {
                    return (
                      <span className={"itemTag"} key={tag}>{tag}</span>
                    );
                  })}</span>
                </li>
              );
            })
          }
          </ul>
        </div>
      </section>
    </aside>
  );
}