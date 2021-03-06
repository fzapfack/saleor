import { parse as parseQs } from "qs";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import i18n from "../i18n";
import { saleDetailsPageTab } from "./components/SaleDetailsPage";
import { voucherDetailsPageTab } from "./components/VoucherDetailsPage";
import {
  saleAddPath,
  saleListPath,
  salePath,
  voucherAddPath,
  voucherListPath,
  voucherPath
} from "./urls";
import SaleCreateView from "./views/SaleCreate";
import SaleDetailsViewComponent, {
  SaleDetailsQueryParams
} from "./views/SaleDetails";
import SaleListViewComponent, { SaleListQueryParams } from "./views/SaleList";
import VoucherCreateView from "./views/VoucherCreate";
import VoucherDetailsViewComponent, {
  VoucherDetailsQueryParams
} from "./views/VoucherDetails";
import VoucherListViewComponent, {
  VoucherListQueryParams
} from "./views/VoucherList";

const SaleListView: React.StatelessComponent<RouteComponentProps<{}>> = ({
  location
}) => {
  const { after, before } = parseQs(location.search.substr(1));
  const params: SaleListQueryParams = {
    after,
    before
  };
  return <SaleListViewComponent params={params} />;
};

const SaleDetailsView: React.StatelessComponent<
  RouteComponentProps<{ id: string }>
> = ({ match, location }) => {
  const { after, before, tab } = parseQs(location.search.substr(1));
  const params: SaleDetailsQueryParams = {
    after,
    before,
    tab: saleDetailsPageTab(tab)
  };
  return (
    <SaleDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const VoucherListView: React.StatelessComponent<RouteComponentProps<{}>> = ({
  location
}) => {
  const { after, before } = parseQs(location.search.substr(1));
  const params: VoucherListQueryParams = {
    after,
    before
  };
  return <VoucherListViewComponent params={params} />;
};

const VoucherDetailsView: React.StatelessComponent<
  RouteComponentProps<{ id: string }>
> = ({ match, location }) => {
  const { after, before, tab } = parseQs(location.search.substr(1));
  const params: VoucherDetailsQueryParams = {
    after,
    before,
    tab: voucherDetailsPageTab(tab)
  };
  return (
    <VoucherDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const DiscountSection: React.StatelessComponent<{}> = () => (
  <>
    <WindowTitle title={i18n.t("Discounts")} />
    <Switch>
      <Route exact path={saleListPath} component={SaleListView} />
      <Route exact path={saleAddPath} component={SaleCreateView} />
      <Route exact path={voucherAddPath} component={VoucherCreateView} />
      <Route path={salePath(":id")} component={SaleDetailsView} />
      <Route exact path={voucherListPath} component={VoucherListView} />
      <Route path={voucherPath(":id")} component={VoucherDetailsView} />
    </Switch>
  </>
);
export default DiscountSection;
