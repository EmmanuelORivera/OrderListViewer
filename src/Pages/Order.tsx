import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ id: string }> {}

const Order: FC<Props> = ({ match, history }) => {
  return <>Order NUMBER ### Page</>;
};

export default Order;
