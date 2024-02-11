import WidgetContainer from "@/components/ui/dashboard/widgets/Container";
import { getClient } from "@/lib/apollo/rsc";
import { QUERY_GET_ALL_POSTS } from "@/queries";

const UsersWidget = async () => {
  getClient().query({ query: QUERY_GET_ALL_POSTS });

  return <WidgetContainer>users wdgt</WidgetContainer>;
};

export default UsersWidget;
