import { Header } from "../Header";
import linparLogo from "../../assets/images/linpar.png";

const story = {
  components: [Header],
  title: "components/Header",
};

const Default = (args) => <Header {...args} />;
Default.args = {
  username: "Leonardo Garzón",
  businessName: "Fondoccidente",
  appLogo: linparLogo,
  appLogoAlt: "Linpar",
};

export default story;

export { Default };
