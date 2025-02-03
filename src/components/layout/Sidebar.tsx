import { Menu , Layout} from "antd";
import { sidebarItemsGenerator } from "../../lib/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";

const { Sider } = Layout;


const Sidebar = () => {
    return (
        <>
 <Sider
          breakpoint="lg"
          collapsedWidth="0"
     
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sidebarItemsGenerator(adminPaths , "admin")}
          />
        </Sider>
</>
    );
};

export default Sidebar;