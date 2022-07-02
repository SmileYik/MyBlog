import CustomHeader from "../CustomHeader/CustomHeader";
import NavigationTop from "../navigation-top/navigation-top";

export default function MyHeader(props) {
  return (
    <header id="masthead" className="site-header" role="banner">
      <CustomHeader site={props.site} />
      <NavigationTop items={props.menus} />
    </header>
  );
}
