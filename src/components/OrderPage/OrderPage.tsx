import { useParams } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import HeaderOrder from './HeaderOrder/HeaderOrder';
import Menu from './Menu/Menu';

export default function OrderPage() {
  const { inputName } = useParams<{ inputName: string }>();

  return (
    <Layout>
      <HeaderOrder inputName={inputName || 'Guest'} />
      <Menu />
    </Layout>
  );
}
