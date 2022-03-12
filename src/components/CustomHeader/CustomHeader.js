function CustomHeaderMedia(props) {
  return (
    <div className="custom-header-media">
      <div id="wp-custom-header" className="wp-custom-header">
        <img src={props.background.background}
             width="1920"
             alt={props.background.alt} />
      </div>
    </div>
  );
}

function CustomLogoLink(props) {
  const site = props.site;
  const srcSet = site.icons.normal + " 250w, " + site.icons.icon150 + " 150w, " + site.icons.icon100 + " 100w";
  return (
    <a href={site.url}
       className="custom-logo-link"
       rel="home"
       aria-current="page">
      <img width="250"
           height="250"
           src={site.icons.normal}
           className="custom-logo"
           alt={site.icons.alt}
           srcSet={srcSet}
           sizes="100vw"/>
    </a>
  );
}

function SiteBrandingText(props) {
  const site = props.site;
  return (
    <div className="site-branding-text">
      <h1 className="site-title">
        <a href={site.url}
           rel="home">
          {site.title}
        </a>
      </h1>
      <p className="site-description">
        {site.description}
      </p>
    </div>
  );
}

function SiteBranding(props) {
  return (
    <div className="site-branding">
      <div className="wrap">
        <CustomLogoLink site={props.site} />
        <SiteBrandingText site={props.site} />
      </div>
    </div>
  );
}

export default function CustomHeader(props) {
  return (
    <div className="custom-header">
      <CustomHeaderMedia background={props.site.background}/>
      <SiteBranding site={props.site} marginBottom={props.marginBottom}/>
    </div>
  );
}